import { LayoutDashboard, Users } from "lucide-react";
import type { AdminRoute } from "../lib/router";

const nav = [
  { to: "/dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { to: "/users" as const, label: "Users", icon: Users },
];

export function AdminSidebar({
  active,
  onNavigate,
}: {
  active: AdminRoute;
  onNavigate: (to: AdminRoute) => void;
}) {
  return (
    <aside className="w-full md:w-[260px] shrink-0 border-b md:border-b-0 md:border-r border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_100%)]">
      <div className="hidden md:block p-5 border-b border-white/10">
        <div className="text-white font-serif text-[18px]">Navigation</div>
        <div className="text-white/60 text-xs">Manage your admin tools</div>
      </div>

      <nav className="p-3 flex md:block gap-2 overflow-x-auto">
        {nav.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.to;
          return (
            <button
              key={item.to}
              type="button"
              onClick={() => onNavigate(item.to)}
              className={[
                "cursor-pointer min-w-[160px] md:min-w-0 md:w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition",
                isActive
                  ? "bg-[linear-gradient(90deg,#964400_0%,#F3D35D_25%,#F3D35D_50%,#8C4202_100%)] text-[#913C01] font-semibold"
                  : "text-white/85 hover:bg-white/10",
              ].join(" ")}
            >
              <Icon size={18} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

