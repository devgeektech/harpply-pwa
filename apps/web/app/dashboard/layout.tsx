import Header from "@/components/common/header";
import Sidebar from "@/components/common/sidebar";
import FooterResponsive from "@/components/common/footerresponsive";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">

          <main className="flex-1 flex justify-center items-center">
            {children}
          </main>

        </div>
      </div>
    </>
  );
}
