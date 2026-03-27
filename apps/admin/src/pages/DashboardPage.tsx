export function DashboardPage({ onGoUsers }: { onGoUsers: () => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-white/70 text-sm">Status</div>
        <div className="text-white font-semibold mt-1">Online</div>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-white/70 text-sm">Section</div>
        <div className="text-white font-semibold mt-1">Dashboard</div>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-white/70 text-sm">Quick actions</div>
        <button
          type="button"
          onClick={onGoUsers}
          className="mt-2 cursor-pointer w-full h-[40px] rounded-[10px] border border-[#C39936] text-[#F3D35D] hover:bg-white/10"
        >
          Go to Users
        </button>
      </div>
    </div>
  );
}

