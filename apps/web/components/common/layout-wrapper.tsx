"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/common/sidebar";
import FooterResponsive from "@/components/common/footerresponsive";
import Header from "./header";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ✅ Routes where layout SHOULD be visible
  const showRoutes = ["/dashboard", "/setting", "/connection", "/chat", "/notifications"];

  const isShowLayout = showRoutes.some(route =>
    pathname.startsWith(route)
  );


  return (
    <div className="flex flex-col min-h-screen">
      {isShowLayout && <Header />}

      <div className="flex flex-1">
        {isShowLayout && <Sidebar />}

        <div className="flex flex-col flex-1 bg-[url('/images/bg_blue.jpg')] bg-cover p-3">
          <main className="flex-1 flex justify-center items-center">
            {children}
          </main>

          {isShowLayout && <FooterResponsive />}
        </div>
      </div>
    </div>
  );
}
