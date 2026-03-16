import Header from "@/components/common/header"
import Sidebar from "@/components/common/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <Header />
    <div className="flex h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <div className="flex flex-col flex-1">

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

    </div>
    </>
  )
}