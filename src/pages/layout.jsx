import { NavLink, Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { DashboardNav } from '../components/DashboardNav';
import { AlertProvider } from '../lib/useAlertContext';
import { AlertModal } from '../components/AlertModal';

function Layout() {
    return (
        <div className='flex h-screen '>
            {/* <div className="flex-1"> */}
            <DashboardNav />
            <AlertProvider>
                <DashLayout>
                    <AlertModal />
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
        <div className=' w-full overflow-scroll bg-gradient-to-br from-blue-100 to-slate-100'>
            <main>
                <Nav />
                <div className='container mb-16 px-4'>{children}</div>
            </main>
            <Footer />
        </div>
    );
}
