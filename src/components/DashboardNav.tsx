import {
    ChartBarSquareIcon,
    ChartPieIcon,
    ClockIcon,
    DocumentTextIcon,
    QuestionMarkCircleIcon,
    RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import Footer from './Footer';

export const DashboardNav = () => {
    return (
        <aside className=' col-span-1 flex flex-col bg-base-100 text-base-content shadow-sm'>
            <nav className='my-4 grid w-full gap-4 p-2'>
                <NavLink
                    to='/dashboard'
                    className={({ isActive }) =>
                        classNames(
                            'flex w-full gap-2 rounded-md px-3 py-2 hover:bg-base-content hover:text-base-100',
                            { 'font-bold': isActive },
                        )
                    }
                >
                    <ChartPieIcon className='size-6' />
                    Dashboard
                </NavLink>

                <NavLink
                    to='/stats'
                    className={({ isActive }) =>
                        classNames(
                            'flex w-full gap-2 rounded-md px-3 py-2 hover:bg-base-content hover:text-base-100',
                            { 'font-bold': isActive },
                        )
                    }
                >
                    <ChartBarSquareIcon className='size-6' />
                    Stats
                </NavLink>

                <NavLink
                    to='/saved'
                    className={({ isActive }) =>
                        classNames(
                            'flex w-full gap-2 rounded-md px-3 py-2 hover:bg-base-content hover:text-base-100',
                            { 'font-bold': isActive },
                        )
                    }
                >
                    <ClockIcon className='size-6' />
                    Saved for later
                </NavLink>

                <NavLink
                    to='/resume-generator'
                    className={({ isActive }) =>
                        classNames(
                            'flex w-full gap-2 rounded-md px-3 py-2 hover:bg-base-content hover:text-base-100 ',
                            { 'font-bold': isActive },
                        )
                    }
                >
                    <DocumentTextIcon className='size-6' />
                    Resume Generator
                </NavLink>

                <NavLink
                    to='/interview-prep'
                    className={({ isActive }) =>
                        classNames(
                            'flex w-full gap-2 rounded-md px-3 py-2 hover:bg-base-content hover:text-base-100 ',
                            { 'font-bold': isActive },
                        )
                    }
                >
                    <RocketLaunchIcon className='size-6' />
                    Interview Prep
                </NavLink>

                <NavLink
                    to='/help'
                    className={({ isActive }) =>
                        classNames(
                            'flex w-full gap-2 rounded-md px-3 py-2 hover:bg-base-content hover:text-base-100 ',
                            { 'font-bold': isActive },
                        )
                    }
                >
                    <QuestionMarkCircleIcon className='size-6' />
                    Help
                </NavLink>
            </nav>
            <div className='mt-auto'>
                <Footer />
            </div>
        </aside>
    );
};
