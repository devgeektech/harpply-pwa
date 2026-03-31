import Header from "@/components/common/header"
import Sidebar from "@/components/common/sidebar"
import FooterResponsive from "@/components/common/footerresponsive"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <Header />
    <div className="flex wrapper">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <div className="flex flex-col flex-1 bg-[url('/images/bg_blue.jpg')] bg-no-repeat bg-cover bg-center  px-4 py-[50px] sm:py-4">

        <main className="flex-1 flex justify-center sm:items-center items-start sm:px-4 px-0 md:py-[50px] py-0">
          {children}
        </main>
        <FooterResponsive />
      </div>
    </div>
    </>
  )
}