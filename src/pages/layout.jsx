import { NavLink, Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { DashboardNav } from "../components/DashboardNav";
import { AlertProvider } from "../lib/useAlertContext";
import { AlertModal } from "../components/AlertModal";


function Layout() {
    return (
        <div className='h-screen flex '>
            {/* <div className="flex-1"> */}
            <DashboardNav/>
                <AlertProvider>
            <DashLayout>
                    <AlertModal/>
                    <Outlet />
            </DashLayout>
                </AlertProvider>
            {/* </div> */}
        </div>
    );
}

export default Layout;

export function DashLayout({ children }) {
    return (
        <div className=' overflow-scroll bg-gradient-to-br from-blue-100 to-slate-100 w-full'>
            <main>
                <Nav />
                <div className='container px-4 mb-16'>{children}</div>
            </main>
            <Footer />
        </div>
    );
}
