// dashboard/layout.jsx

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import SideBarAdmin from "../components/layout/SideBarAdmin";

export default withPageAuthRequired(function DashboardLayout({ children }) {
    return (
        <div className="flex bg-background2 h-screen">
            <SideBarAdmin />
            {/* Main Content */}
            <main className="flex-1 overflow-y-scroll">
                {children}
            </main>
        </div>
    );
});