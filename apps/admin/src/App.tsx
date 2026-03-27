import { useEffect, useMemo, useState } from "react";
import { adminLogout } from "./lib/api";
import { useAdminRouter } from "./lib/router";
import { AdminHeader } from "./components/admin-header";
import { AdminSidebar } from "./components/admin-sidebar";
import { LoginPage } from "./pages/LoginPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import { DashboardPage } from "./pages/DashboardPage";
import { UsersPage } from "./pages/UsersPage";
import { useAdminAuthStore } from "./store/adminAuthStore";

function App() {
  const { path, push, replace } = useAdminRouter();
  const accessToken = useAdminAuthStore((s) => s.accessToken);
  const email = useAdminAuthStore((s) => s.email);
  const hydrate = useAdminAuthStore((s) => s.hydrate);
  const logout = useAdminAuthStore((s) => s.logout);
  const [changePasswordSeed, setChangePasswordSeed] = useState<{
    email: string;
    resetToken?: string;
  }>({ email });
  const [shellMessage, setShellMessage] = useState("");
  const [shellError, setShellError] = useState("");

  const title = useMemo(() => {
    if (path === "/forgot-password") return "Admin Forgot Password";
    if (path === "/change-password") return "Admin Change Password";
    if (path === "/users") return "Users";
    if (path === "/dashboard") return "Dashboard";
    return "Admin Login";
  }, [path]);

  const isAuthed = Boolean(accessToken);
  const needsAuth = path === "/dashboard" || path === "/users";

  useEffect(() => {
    // Simple guard + default redirect after refresh.
    if (needsAuth && !isAuthed) {
      replace("/login");
      return;
    }
    if (path === "/login" && isAuthed) {
      replace("/dashboard");
    }
  }, [isAuthed, needsAuth, path, replace]);

  useEffect(() => {
    hydrate();
    // hydrate reads localStorage once; run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    setShellError("");
    setShellMessage("");
    try {
      if (accessToken) await adminLogout(accessToken);
      await logout().catch(() => undefined);
      push("/login");
      setShellMessage("Logged out successfully.");
    } catch (e) {
      setShellError(e instanceof Error ? e.message : "Failed to logout.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 text-white antialiased"
      style={{
        fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background:
          "radial-gradient(ellipse 70% 55% at 50% -5%, #2a1468 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 90% 20%, #1c0a50 0%, transparent 55%), radial-gradient(ellipse 30% 25% at 10% 50%, #140640 0%, transparent 60%), #0c0520",
      }}
    >
      {needsAuth ? (
        <div className="w-full max-w-[1280px] h-[760px] md:h-[820px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0px_10px_40px_0px_rgba(0,0,0,0.35)]">
          <AdminHeader adminLabel={email || "admin"} onLogout={handleLogout} />
          <div className="flex h-[calc(100%-64px)]">
            <AdminSidebar
              active={path}
              onNavigate={(to) => push(to)}
            />
            <main className="flex-1 p-6 overflow-auto">
              <div className="mb-6">
                <h2 className="text-[24px] font-serif">{title}</h2>
                <p className="text-white/70 text-sm">
                  {path === "/dashboard"
                    ? "Overview of admin activity."
                    : "Manage application users."}
                </p>
              </div>

              {shellMessage && (
                <div className="mb-4 rounded-lg border border-emerald-300/30 bg-emerald-500/15 px-3 py-2 text-sm text-emerald-100">
                  {shellMessage}
                </div>
              )}
              {shellError && (
                <div className="mb-4 rounded-lg border border-red-300/30 bg-red-500/15 px-3 py-2 text-sm text-red-100">
                  {shellError}
                </div>
              )}

              {path === "/dashboard" ? (
                <DashboardPage onGoUsers={() => push("/users")} />
              ) : (
                <UsersPage />
              )}
            </main>
          </div>
        </div>
      ) : (
        <>
          {path === "/forgot-password" ? (
            <ForgotPasswordPage
              initialEmail={email}
              onBackToLogin={() => push("/login")}
              onGoChangePassword={(email, resetToken) => {
                setChangePasswordSeed({ email, resetToken });
                push("/change-password");
              }}
            />
          ) : path === "/change-password" ? (
            <ChangePasswordPage
              initialEmail={changePasswordSeed.email || email}
              initialResetToken={changePasswordSeed.resetToken}
              onBackToLogin={() => push("/login")}
            />
          ) : (
            <LoginPage
              onGoForgotPassword={() => push("/forgot-password")}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
