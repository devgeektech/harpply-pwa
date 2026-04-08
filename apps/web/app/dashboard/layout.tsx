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
        <Header />

        <div className="flex flex-1">
          <Sidebar />

          <div className="flex flex-col flex-1 bg-[url('/images/bg_blue.jpg')] bg-cover p-3">
            <main className="flex-1 flex justify-center items-center">
              {children}
            </main>

            <FooterResponsive />
          </div>
        </div>
      </div>
    </>
  );
}
