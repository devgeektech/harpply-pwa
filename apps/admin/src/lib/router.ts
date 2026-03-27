import { useCallback, useEffect, useMemo, useState } from "react";

export type AdminRoute =
  | "/login"
  | "/forgot-password"
  | "/change-password"
  | "/dashboard"
  | "/users";

const DEFAULT_ROUTE: AdminRoute = "/login";

function normalize(path: string): AdminRoute {
  const raw = (path || "").split("?")[0]?.split("#")[0] ?? "";
  const p = raw.length > 1 ? raw.replace(/\/+$/, "") : raw;
  const allowed: AdminRoute[] = [
    "/login",
    "/forgot-password",
    "/change-password",
    "/dashboard",
    "/users",
  ];
  return (allowed.includes(p as AdminRoute) ? (p as AdminRoute) : DEFAULT_ROUTE);
}

export function useAdminRouter() {
  const [path, setPath] = useState<AdminRoute>(() => {
    if (typeof window === "undefined") return DEFAULT_ROUTE;
    return normalize(window.location.pathname);
  });

  useEffect(() => {
    const onPop = () => setPath(normalize(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const push = useCallback((to: AdminRoute) => {
    if (typeof window === "undefined") return;
    const next = normalize(to);
    window.history.pushState(null, "", next);
    setPath(next);
  }, []);

  const replace = useCallback((to: AdminRoute) => {
    if (typeof window === "undefined") return;
    const next = normalize(to);
    window.history.replaceState(null, "", next);
    setPath(next);
  }, []);

  return useMemo(
    () => ({
      path,
      push,
      replace,
    }),
    [path, push, replace]
  );
}

