import { NavLink, Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { DashboardNav } from "../components/DashboardNav";

function Layout() {
    return (
        <div className='h-screen flex '>
            {/* <div className="flex-1"> */}
            <DashboardNav/>
            <Outlet />
            {/* </div> */}
        </div>
    );
}

export default Layout;

export function DashLayout({ children }) {
    return (
        <div className=' overflow-scroll bg-gradient-to-br from-blue-100 to-slate-100 w-full'>
                <Nav />
            <div className='container p-4 flex-1'>
                {children}

                <Footer />
            </div>
        </div>
    );
}
