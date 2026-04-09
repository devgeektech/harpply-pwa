"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleUserRound, LogOut, Search, Settings, Trash } from "lucide-react";
import { Button, Input } from "@repo/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import GlobalModal from "./common-modal";
import { toast } from "sonner";
import { AUTH_STORAGE_KEYS, logout } from "@/lib/api/auth";
import { deleteMyAccount, fetchProfile } from "@/lib/api/profile";
import { clearClientAuthSession } from "@/lib/api/session-expired";
import { SUCCESS_MESSAGES } from "@/lib/messages/success-messages";
import { ERROR_MESSAGES } from "@/lib/messages/error-messages";

const suggestionsData = [
  "Dashboard",
  "Profile",
  "Settings",
  "Users",
  "Analytics",
  "Reports",
];

export default function Header() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"deleteAccount" | "logout">(
    "logout"
  );
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [displayName, setDisplayName] = useState<string>("Account");
  const router = useRouter();
  const filteredSuggestions = suggestionsData.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const initials = useMemo(() => {
    const name = (displayName ?? "").trim();
    if (!name) return "A";
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
  }, [displayName]);

  useEffect(() => {
    let cancelled = false;
    fetchProfile()
      .then((res) => {
        if (cancelled) return;
        const name = (res?.data?.fullName ?? "").trim();
        const email = (res?.data?.email ?? "").trim();
        setDisplayName(name || email || "Account");
      })
      .catch(() => {
        // ignore — header can still render with fallback
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
          : ERROR_MESSAGES.AUTH.FAILED_TO_DELETE_ACCOUNT
      );
    } finally {
      setConfirmLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <>
      <header className="border-b border-white/10 bg-white flex items-center justify-between px-6 py-2">
        <Link href="/" className="me-12">
          <Image
            src="/images/logoblack.png"
            className="min-w-[93px] min-h-[30px] object-contain"
            alt="logo"
            width={93}
            height={30}
          />
        </Link>
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 w-full relative">
          {/* 🔍 Search Icon */}
          <Button className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent border-none px-2">
            <Search className="text-gray-400" size={18} />
          </Button>

          {/* ❌ Clear Button */}
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              <X size={18} />
            </button>
          )}

          {/* 🧠 Input */}
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            placeholder="Search"
            className="h-[40px] text-base shadow-none focus-visible:ring-0 border border-gray-200 rounded-full pl-10 pr-10"
          />

          {/* 📌 Suggestions Dropdown */}
          {showDropdown && query && (
            <div className="absolute top-[110%] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-md z-50">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((item, index) => (
                  <div
                    key={index}
                    onMouseDown={() => {
                      setQuery(item);
                      setShowDropdown(false);
                    }}
                    className="px-4 py-2 cursor-pointer rounded-md hover:bg-gray-100"
                  >
                    {item}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-400">No results found</div>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="items-center gap-3 ms-3 md:me-4 flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className=" border-none relative bg-[#F5F3ED] p-2 rounded-full h-[50px] w-[50px] cursor-pointer"
              >
                <Image
                  src="/images/bell-icon.svg"
                  alt="dropdown"
                  width={30}
                  height={30}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-[12px] border-white/10 bg-[#13072d]">
              <DropdownMenuGroup>
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <div className="">
                      <Image
                        src="/images/notificationicon.png"
                        alt="dropdown"
                        width={45}
                        height={45}
                      />
                    </div>
                    <div className="flex flex-col gap-1 relative">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-[#C39936] max-w-[150px] truncate">
                          New Connection New Connection New Connection New
                          Connection
                        </label>
                        <p className="text-[12px] text-gray-400 absolute right-0 top-0">
                          1 min ago
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 w-[250px]  truncate">
                        A new connection awaits you, start a meaningful
                        conversation.{" "}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <div className="">
                      <Image
                        src="/images/notificationicon.png"
                        alt="dropdown"
                        width={45}
                        height={45}
                      />
                    </div>
                    <div className="flex flex-col gap-1 relative">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-[#C39936] max-w-[150px] truncate">
                          New Connection New Connection New Connection New
                          Connection
                        </label>
                        <p className="text-[12px] text-gray-400 absolute right-0 top-0">
                          1 min ago
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 w-[250px]  truncate">
                        A new connection awaits you, start a meaningful
                        conversation.{" "}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <div className="">
                      <Image
                        src="/images/notificationicon.png"
                        alt="dropdown"
                        width={45}
                        height={45}
                      />
                    </div>
                    <div className="flex flex-col gap-1 relative">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-[#C39936] max-w-[150px] truncate">
                          New Connection New Connection New Connection New
                          Connection
                        </label>
                        <p className="text-[12px] text-gray-400 absolute right-0 top-0">
                          1 min ago
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 w-[250px]  truncate">
                        A new connection awaits you, start a meaningful
                        conversation.{" "}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <div className="">
                      <Image
                        src="/images/notificationicon.png"
                        alt="dropdown"
                        width={45}
                        height={45}
                      />
                    </div>
                    <div className="flex flex-col gap-1 relative">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-[#C39936] max-w-[150px] truncate">
                          New Connection New Connection New Connection New
                          Connection
                        </label>
                        <p className="text-[12px] text-gray-400 absolute right-0 top-0">
                          1 min ago
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 w-[250px]  truncate">
                        A new connection awaits you, start a meaningful
                        conversation.{" "}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-white/10" />

              <Link
                href="/notifications"
                className="flex items-center justify-center cursor-pointer w-full text-base h-[52px] rounded-[12px] md:rounded-[8px] bg-gradient-to-r from-[#c58b00] via-[#f5d76e] to-[#c58b00] text-[#913C01] font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                View All Notifications
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-none md:min-w-[95px] h-auto relative bg-[#F5F3ED] py-[10px] px-[10px] md:rounded-[8px] rounded-full cursor-pointer whitespace-nowrap"
              >
                <span className="hidden md:flex text-sm font-medium text-[#C39936] flex items-center gap-2 whitespace-nowrap">
                  {displayName}{" "}
                  <Image
                    src="/images/circle-down.svg"
                    alt="dropdown"
                    width={24}
                    height={24}
                  />
                </span>
                <span className="block md:hidden text-[18px] font-medium text-[#C39936] flex items-center gap-2 whitespace-nowrap">
                  <Avatar>
                    <AvatarImage alt={displayName} />
                    <AvatarFallback className="text-[18px] font-medium text-[#C39936]">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-[12px] border-white/10 bg-[#13072d]">
              {/* <DropdownMenuLabel className="text-sm font-medium text-[#C39936]">My Account</DropdownMenuLabel> */}
              {/* <DropdownMenuSeparator  className="bg-white/10" /> */}
              <DropdownMenuItem asChild>
                <Link
                  href="/profile/identity"
                  className="cursor-pointer group text-sm font-medium text-[#C39936]"
                >
                  <CircleUserRound className="text-[#C39936] group-hover:text-[#171717]" />{" "}
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="cursor-pointer group text-sm font-medium text-[#C39936]"
                >
                  <Settings className="text-[#C39936] group-hover:text-[#171717]" />{" "}
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setModalType("deleteAccount");
                  setModalOpen(true);
                }}
                className="cursor-pointer group text-sm font-medium text-[#C39936]"
              >
                <Trash className="text-[#C39936] group-hover:text-[#171717]" />{" "}
                Delete Account
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setModalType("logout");
                  setModalOpen(true);
                }}
                className="cursor-pointer group text-sm font-medium text-[#C39936]"
              >
                <LogOut className="text-[#C39936] group-hover:text-[#171717]" />{" "}
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

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
}
