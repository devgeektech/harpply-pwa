import { LogOut, Shield } from "lucide-react";
import { Button } from "@repo/ui";

export function AdminHeader({
  adminLabel,
  onLogout,
}: {
  adminLabel: string;
  onLogout: () => void;
}) {
  return (
    <header className="h-[64px] w-full border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-[#F5F3ED] flex items-center justify-center">
            <Shield className="text-[#C39936]" size={20} />
          </div>
          <div className="leading-tight">
            <div className="text-white font-serif text-[18px]">Harpply Admin</div>
            <div className="text-white/70 text-xs truncate max-w-[260px]">
              {adminLabel}
            </div>
          </div>
        </div>

        <Button
          type="button"
          onClick={onLogout}
          className="cursor-pointer h-[40px] px-4 rounded-[10px] border border-[#C39936] bg-transparent text-[#F3D35D] hover:bg-white/10"
        >
          <LogOut size={16} className="me-2" />
          Logout
        </Button>
      </div>
    </header>
  );
}

