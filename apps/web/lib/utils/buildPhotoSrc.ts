
export function buildPhotoSrc(s3PublicUrl: string, key: string): string {
  const safeKey = key?.toString?.().trim() ?? "";
  if (!safeKey) return "/images/accountCircle.png";
  if (/^https?:\/\//i.test(safeKey)) return safeKey;
  const base = (s3PublicUrl ?? "").replace(/\/$/, "");
  if (!base) return "/images/accountCircle.png";
  return `${base}/${safeKey.replace(/^\/+/, "")}`;
}
