import { Outlet } from 'react-router-dom';

import { AlertModal } from './components/AlertModal';
import { DashboardNav } from './components/DashboardNav';
import Nav from './components/Nav';
import { AlertProvider } from './lib/useAlertProvider';

function Layout() {
    return (
        <div className='grid h-screen grid-cols-5 grid-rows-[64px_1fr] overflow-hidden'>
            <Nav />
            <DashboardNav />

            <AlertProvider>
                <DashLayout>
                    <AlertModal />
                    <Outlet />
                </DashLayout>
            </AlertProvider>
        </div>
    );
}

export default Layout;

export function DashLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='col-span-4 flex flex-col overflow-scroll bg-gradient-to-bl from-base-100 from-50% to-base-300 p-4'>
            {children}
        </main>
    );
}
