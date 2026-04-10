"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@repo/ui";
import Link from "next/link";
import Profile from "@/icons/profile";
import { Bell, ChevronRight, LogOut, Trash } from "lucide-react";
import Password from "@/icons/password";
import Subscription from "@/icons/subscription";
import Privacy from "@/icons/privacy";
import Userlock from "@/icons/userlock";
import Support from "@/icons/support";
import GlobalModal from "@/components/common/common-modal";
import { AUTH_STORAGE_KEYS, logout } from "@/lib/api/auth";
import { toast } from "sonner";
import { SUCCESS_MESSAGES } from "@/lib/messages/success-messages";
import { clearClientAuthSession } from "@/lib/api/session-expired";
import { useRouter } from "next/navigation";
import {
  deleteMyAccount,
  fetchProfile,
  fetchProfilePhotos,
} from "@/lib/api/profile";
import { ERROR_MESSAGES } from "@/lib/messages/error-messages";
import { buildPhotoSrc } from "@/lib/utils/buildPhotoSrc";

const Settings = () => {
  const router = useRouter();
  const [modalType, setModalType] = useState<"deleteAccount" | "logout">(
    "logout",
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [displayName, setDisplayName] = useState<string>("");
  const [displayEmail, setDisplayEmail] = useState<string>("");
  const [firstProfilePhotoSrc, setFirstProfilePhotoSrc] = useState<
    string | null
  >(null);
  const s3PublicUrl = process.env.NEXT_PUBLIC_AWS_S3_URL ?? "";

  useEffect(() => {
    let cancelled = false;
    fetchProfile()
      .then((res) => {
        if (cancelled) return;
        const name = (res?.data?.fullName ?? "").trim();
        const email = (res?.data?.email ?? "").trim();
        setDisplayName(name);
        setDisplayEmail(email);
      })
      .catch(() => {
        // ignore — header can still render with fallback
      });

    fetchProfilePhotos()
      .then((res) => {
        const firstKey = res?.photos?.[0];
        setFirstProfilePhotoSrc(
          firstKey ? buildPhotoSrc(s3PublicUrl, firstKey) : null,
        );
      })
      .catch(() => {
        // Keep placeholder on error.
        setFirstProfilePhotoSrc(null);
      });

    return () => {
      cancelled = true;
    };
  }, [s3PublicUrl]);

  const handleLogout = async () => {
    if (confirmLoading) return;
    setConfirmLoading(true);
    try {
      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
          : null;
      if (token) {
        await logout(token).catch(() => undefined);
        toast.success(SUCCESS_MESSAGES.AUTH.LOGOUT_SUCCESS);
      }
    } finally {
      clearClientAuthSession();
      router.replace("/");
      setModalOpen(false);
      setConfirmLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (confirmLoading) return;
    setConfirmLoading(true);
    try {
      await deleteMyAccount();
      toast.success(SUCCESS_MESSAGES.AUTH.ACCOUNT_DELETED);
      clearClientAuthSession();
      router.replace("/");
    } catch (e) {
      toast.error(
        e instanceof Error
          ? e.message
          : ERROR_MESSAGES.AUTH.FAILED_TO_DELETE_ACCOUNT,
      );
    } finally {
      setConfirmLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-[620px] py-4 bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center px-4">
        <style>
          {`
          @keyframes identity-shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
        </style>

        <Card className="md:d-block md:bg-[url('/images/bg_auth_center.png')] sm:py-0 bg-no-repeat bg-cover bg-center w-full max-w-[620px] md:shadow-[0px_4px_4px_0px_#00000014] bg-transparent md:backdrop-blur-xl border-0 md:border md:border-[#C8A851]/18  rounded-2xl md:shadow-2xl">
          <CardContent className="flex items-center flex-col sm:p-10 px-3 text-left">
            <div className="flex flex-col items-center gap-1">
              <img
                className="w-[100px] h-[100px] rounded-full mb-3"
                src={firstProfilePhotoSrc ?? "/images/accountCircle.png"}
                alt="match-pro-1.png"
              />
              <p className="text-[#C39936] text-base leading-[140%]">
                {displayName}
              </p>
              <p className="text-[#C39936] text-base leading-[140%]">
                {displayEmail}
              </p>
            </div>

            <div className="w-full overflow-hidden rounded-lg bg-[linear-gradient(160deg,rgba(200,168,81,0.10)_0%,rgba(35,22,58,0.85)_45%,rgba(18,10,35,0.92)_100%)] my-6">
              <ul>
                <Link
                  href="/profile/identity"
                  className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
                >
                  <p className="flex items-center gap-2">
                    <Profile /> Profile
                  </p>
                  <ChevronRight />
                </Link>

                <Link
                  href="/dashboard/setting/profile"
                  className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
                >
                  <p className="flex items-center gap-2">
                    <Password /> Change Password
                  </p>
                  <ChevronRight />
                </Link>

                <Link
                  href="/dashboard/setting/profile"
                  className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
                >
                  <p className="flex items-center gap-2">
                    <Subscription /> Billing & Subscription
                  </p>
                  <ChevronRight />
                </Link>

                <Link
                  href="/notifications"
                  className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
                >
                  <p className="flex items-center gap-2">
                    <Bell /> Notifications
                  </p>
                  <ChevronRight />
                </Link>

                <Link
                  href="/setting/blocked-users"
                  className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
                >
                  <p className="flex items-center gap-2">
                    <Userlock /> Blocked Users
                  </p>
                  <ChevronRight />
                </Link>

                <Link
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
                >
                  <p className="flex items-center gap-2">
                    <Privacy /> Privacy Policy
                  </p>
                  <ChevronRight />
                </Link>

                <Link
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
                >
                  <p className="flex items-center gap-2">
                    <Privacy /> Terms & Conditions
                  </p>
                  <ChevronRight />
                </Link>

                <Link
                  href="/setting/contact-support"
                  className="border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
                >
                  <p className="flex items-center gap-2">
                    <Support /> Contact Support
                  </p>
                  <ChevronRight />
                </Link>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setModalType("deleteAccount");
                    setModalOpen(true);
                  }}
                  className="w-full cursor-pointer border-b border-[#C8A851]/18 flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
                >
                  <p className="flex items-center gap-2">
                    <Trash /> Delete Account
                  </p>
                  <ChevronRight />
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setModalType("logout");
                    setModalOpen(true);
                  }}
                  className="w-full cursor-pointer flex justify-between gap-2 text-white/80 py-3 px-4 hover:bg-[#C8A851]/10 transition-colors"
                >
                  <p className="flex items-center gap-2">
                    <LogOut /> Logout
                  </p>
                  <ChevronRight />
                </button>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <GlobalModal
        open={modalOpen}
        onClose={() => {
          if (!confirmLoading) setModalOpen(false);
        }}
        type={modalType}
        title={modalType === "logout" ? "Log Out" : "Delete Account"}
        description={
          modalType === "logout"
            ? "Are you sure want to logout?"
            : "This action is permanent and will delete all of your account data and photos."
        }
        onConfirm={modalType === "logout" ? handleLogout : handleConfirmDelete}
        confirmLoading={confirmLoading}
        confirmLabel={modalType === "logout" ? "Yes" : "Delete"}
        cancelLabel={modalType === "logout" ? "No" : "Cancel"}
      />
    </>
  );
};

export default Settings;
