import { Outlet } from 'react-router-dom';

import { AlertModal } from './components/AlertModal';
import { DashboardNav } from './components/DashboardNav';
import Footer from './components/Footer';
import Nav from './components/Nav';
import { AlertProvider } from './lib/alertContext';

function Layout() {
    return (
        <div className='flex h-screen flex-col '>
            <Nav />
            <div className='flex flex-1'>
                <DashboardNav />
                <AlertProvider>
                    <DashLayout>
                        <AlertModal />
                        <Outlet />
                    </DashLayout>
                </AlertProvider>
            </div>
        </div>
    );
}

export default Layout;

export function DashLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className=' w-full overflow-scroll bg-gradient-to-br from-blue-100 to-slate-100'>
            <main>
                <div className='container p-4'>{children}</div>
            </main>
            <Footer />
        </div>
    );
}
