import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAdminRouter } from "./lib/router";
import { AdminHeader } from "./components/admin-header";
import { AdminLogoutModal } from "./components/admin-logout-modal";
import { AdminSidebar } from "./components/admin-sidebar";
import { LoginPage } from "./pages/LoginPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ForgotPasswordVerifyPage } from "./pages/ForgotPasswordVerifyPage";
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
  const [forgotVerifyEmail, setForgotVerifyEmail] = useState("");
  const [shellMessage, setShellMessage] = useState("");
  const [shellError, setShellError] = useState("");
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [logoutConfirmLoading, setLogoutConfirmLoading] = useState(false);

  const isAuthed = Boolean(accessToken);
  const isProtectedRoute =
    path === "/dashboard" || path === "/users" || path === "/change-password";
  const showShell = isAuthed && isProtectedRoute;

  const headerDisplayName = useMemo(() => {
    const e = (email ?? "").trim();
    if (!e) return "Admin";
    const local = e.split("@")[0] ?? e;
    const cleaned = local.replace(/[._-]+/g, " ").trim();
    return cleaned
      .split(/\s+/)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join(" ");
  }, [email]);

  useEffect(() => {
    // Simple guard + default redirect after refresh.
    if (isProtectedRoute && !isAuthed) {
      replace("/login");
      return;
    }
    if (path === "/login" && isAuthed) {
      replace("/dashboard");
    }
  }, [isAuthed, isProtectedRoute, path, replace]);

  useEffect(() => {
    hydrate();
    // hydrate reads localStorage once; run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmLogout = async () => {
    setShellError("");
    setShellMessage("");
    setLogoutConfirmLoading(true);
    try {
      await logout();
      setLogoutModalOpen(false);
      toast.success("Logged out successfully.");
      push("/login");
    } catch (e) {
      setLogoutModalOpen(false);
      setShellError(e instanceof Error ? e.message : "Failed to logout.");
    } finally {
      setLogoutConfirmLoading(false);
    }
  };

  const handlePasswordChanged = async () => {
    try {
      await logout().catch(() => undefined);
    } finally {
      replace("/login");
    }
  };

  return (
    <div
      className="min-h-screen text-white antialiased"
      style={{
        fontFamily: "var(--font-inter), Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background:
          "radial-gradient(ellipse 70% 55% at 50% -5%, #2a1468 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 90% 20%, #1c0a50 0%, transparent 55%), radial-gradient(ellipse 30% 25% at 10% 50%, #140640 0%, transparent 60%), #0c0520",
      }}
    >
      {showShell ? (
        <div className="min-h-screen flex flex-col">
          <AdminHeader
            displayName={headerDisplayName}
            subtitle={email || undefined}
            onNavigate={(to) => push(to)}
            onLogout={() => setLogoutModalOpen(true)}
          />
          <div className="flex flex-1 min-h-0 flex-col md:flex-row">
            <AdminSidebar
              active={path}
              onNavigate={(to) => push(to)}
            />
            <main className="flex-1 p-4 sm:p-6 overflow-auto">
      
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
              ) : path === "/users" ? (
                <UsersPage />
              ) : (
                <ChangePasswordPage
                  accessToken={accessToken}
                  onBackToLogin={() => push("/dashboard")}
                  onPasswordChanged={handlePasswordChanged}
                />
              )}
            </main>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
          {path === "/forgot-password" ? (
            <ForgotPasswordPage
              initialEmail={email}
              onBackToLogin={() => push("/login")}
              onSuccess={(email) => {
                setForgotVerifyEmail(email);
                push("/forgot-password-verify");
              }}
            />
          ) : path === "/forgot-password-verify" ? (
            <ForgotPasswordVerifyPage
              email={forgotVerifyEmail}
              onBackToLogin={() => push("/login")}
            />
          ) : (
            <LoginPage
              onGoForgotPassword={() => push("/forgot-password")}
            />
          )}
        </div>
      )}

      <AdminLogoutModal
        open={logoutModalOpen}
        onClose={() => {
          if (!logoutConfirmLoading) setLogoutModalOpen(false);
        }}
        onConfirm={confirmLogout}
        confirmLoading={logoutConfirmLoading}
      />
    </div>
  );
}

export default App;
