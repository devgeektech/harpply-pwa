"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/common/header";
import Sidebar from "@/components/common/sidebar";
import FooterResponsive from "@/components/common/footerresponsive";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ✅ auth routes check
  const isAuthRoute = pathname.startsWith("/auth");
  // OR:
  // const hideRoutes = ["/login", "/signup"];
  // const isAuthRoute = hideRoutes.includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthRoute && <Header />}

      <div className="flex flex-1">
        {!isAuthRoute && <Sidebar />}

        <div className="flex flex-col flex-1 bg-[url('/images/bg_blue.jpg')] bg-cover p-3">
          <main className="flex-1 flex justify-center items-center">
            {children}
          </main>

          {!isAuthRoute && <FooterResponsive />}
        </div>
      </div>
    </div>
  );
}
