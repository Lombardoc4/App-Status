import { NavLink, Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function Layout() {
    return (
        <div className='min-h-screen flex flex-col'>
            <Nav />
            {/* <div className="flex-1"> */}
            <Outlet />
            {/* </div> */}
        </div>
    );
}

export default Layout;

export function DashLayout({ children }) {
    return (
        <div className='flex h-full flex-1 h-14 bg-gradient-to-br from-white to-slate-100'>
            <div className='bg-blue-600 text-white w-1/4 p-4 max-w-[300px]'>
                <h2>LOGO OR SOMETHING</h2>

                <div className='my-4 w-full flex flex-col gap-4'>
                    <NavLink
                        to='/dashboard'
                        className={({ isActive }) =>
                            "block py-2 px-4 bg-blue-700 w-full rounded-md " + (isActive ? "bg-blue-800" : "")
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to='/account'
                        className={({ isActive }) =>
                            "block py-2 px-4 bg-blue-700 w-full rounded-md " + (isActive ? "bg-blue-800" : "")
                        }
                    >
                        Account
                    </NavLink>
                </div>
            </div>

            <div className='container p-4 flex flex-col flex-1 shadow-inner'>
                {children}

                <Footer />
            </div>
        </div>
    );
}
