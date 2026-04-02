"use client";

import { useEffect, useMemo, useState } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, Button } from "@repo/ui";
import { X } from "lucide-react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = url;
  });
}

export default function ImageCropDialog({
  open,
  file,
  onOpenChange,
  onCropped,
  outputSize = 512,
  minZoom = 1,
  maxZoom = 3,
  step = 0.1,
}: {
  open: boolean;
  file: File | null;
  onOpenChange: (open: boolean) => void;
  onCropped: (cropped: File) => void;
  outputSize?: number;
  minZoom?: number;
  maxZoom?: number;
  step?: number;
}) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(minZoom);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (!open || !file) {
      setImgUrl(null);
      setCroppedAreaPixels(null);
      setZoom(minZoom);
      setCrop({ x: 0, y: 0 });
      return;
    }

    const url = URL.createObjectURL(file);
    setImgUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [open, file, minZoom]);

  const canCrop = Boolean(open && file && imgUrl && croppedAreaPixels);
  const zoomLabel = useMemo(() => zoom.toFixed(1), [zoom]);

  const cropToOutputFile = async () => {
    if (!file || !imgUrl || !croppedAreaPixels) return;

    const img = await createImage(imgUrl);
    const srcW = img.naturalWidth || 0;
    const srcH = img.naturalHeight || 0;

    // Prevent exporting black "outside" regions by clamping the crop rect
    // strictly inside the source image bounds.
    const area = croppedAreaPixels;
    const sx = clamp(area.x, 0, Math.max(0, srcW - 1));
    const sy = clamp(area.y, 0, Math.max(0, srcH - 1));
    const sw = clamp(area.width, 0, Math.max(0, srcW - sx));
    const sh = clamp(area.height, 0, Math.max(0, srcH - sy));
    if (sw <= 0 || sh <= 0) return;
    const overLeft = area.x < 0;
    const overTop = area.y < 0;
    const overRight = area.x + area.width > srcW;
    const overBottom = area.y + area.height > srcH;
    const hasOverflow =
      overLeft || overTop || overRight || overBottom || srcW <= 0 || srcH <= 0;

    const out = document.createElement("canvas");
    out.width = outputSize;
    out.height = outputSize;
    const ctx = out.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      img,
      sx,
      sy,
      sw,
      sh,
      0,
      0,
      out.width,
      out.height
    );

    const blob: Blob | null = await new Promise((resolve) => {
      out.toBlob((b) => resolve(b), "image/jpeg", 0.92);
    });

    if (!blob) return;

    const baseName = file.name.replace(/\.[^.]+$/, "");
    const croppedFile = new File([blob], `${baseName}_cropped.jpg`, {
      type: "image/jpeg",
    });
    onCropped(croppedFile);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[720px] p-0 rounded-2xl border-none bg-[#140034] text-white overflow-hidden">
        <div className="relative px-5 py-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 cursor-pointer text-white/80 hover:text-white"
            aria-label="Close crop dialog"
          >
            <X size={18} />
          </button>

          <div className="pt-1">
            <h3 className="text-[18px] font-semibold">Crop photo</h3>
            <p className="text-sm text-white/70">Drag to move • Zoom in/out</p>
          </div>
        </div>

        <div className="px-5 pb-5">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black">
            {imgUrl ? (
              <Cropper
                image={imgUrl}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                cropShape="rect"
                objectFit="contain"
                minZoom={minZoom}
                maxZoom={maxZoom}
                zoomSpeed={0.5}
                restrictPosition={true}
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={(z) => setZoom(z)}
                onCropComplete={(_, croppedPixels) => {
                  setCroppedAreaPixels({
                    x: croppedPixels.x,
                    y: croppedPixels.y,
                    width: croppedPixels.width,
                    height: croppedPixels.height,
                  });
                }}
                style={{
                  containerStyle: { width: "100%", height: "100%" },
                  mediaStyle: { width: "100%", height: "100%", objectFit: "contain" },
                  cropAreaStyle: {
                    border: "2px solid rgba(195, 153, 54, 0.85)",
                  },
                }}
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-white/70">
                Loading...
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/70 w-14">Zoom</span>
              <input
                type="range"
                min={minZoom}
                max={maxZoom}
                step={step}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
                aria-label="Zoom"
              />
              <span className="text-sm text-white/80 tabular-nums w-10 text-right">
                {zoomLabel}x
              </span>
            </div>

            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="w-full bg-transparent hover:bg-transparent text-white/90 border border-white/20 cursor-pointer hover:border-white/40"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => void cropToOutputFile()}
              disabled={!canCrop}
              className="w-full bg-gradient-to-r from-[#964400] via-[#F3D35D] to-[#8C4202] text-[#913C01] hover:opacity-90 disabled:opacity-60 cursor-pointer"
            >
              Crop
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

