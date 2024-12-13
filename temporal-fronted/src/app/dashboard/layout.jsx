import SideBarAdmin from "../components/layout/SideBarAdmin";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-background2 h-screen">
      <SideBarAdmin />
      <main className="flex-1 overflow-y-scroll">{children}</main>
    </div>
  );
}
