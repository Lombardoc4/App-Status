import {
    ChartBarSquareIcon,
    ChartPieIcon,
    ClockIcon,
    DocumentTextIcon,
    QuestionMarkCircleIcon,
    RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';

export const DashboardNav = () => {
    return (
        <aside className='flex w-1/4 max-w-[260px] flex-col bg-blue-600 p-2 pb-4 text-white shadow-sm'>
            <div className='my-4 flex w-full flex-col gap-4'>
                <NavLink
                    to='/dashboard'
                    className={({ isActive }) =>
                        classNames(
                            'flex w-full gap-2 rounded-md px-3 py-2 hover:bg-blue-700 ',
                            { 'font-bold': isActive },
                        )
                    }
                >
                    <ChartPieIcon className='h-6 w-6' />
                    Dashboard
                </NavLink>

                <NavLink
                    to='/stats'
                    className={({ isActive }) =>
                        classNames(
                            'flex w-full gap-2 rounded-md px-3 py-2 hover:bg-blue-700 ',
                            { 'font-bold': isActive },
                        )
                    }
                >
                    <ChartBarSquareIcon className='h-6 w-6' />
                    Stats
                </NavLink>

                <NavLink
                    to='/saved'
                    className={({ isActive }) =>
                        classNames(
                            'flex w-full gap-2 rounded-md px-3 py-2 hover:bg-blue-700 ',
                            { 'font-bold': isActive },
                        )
                    }
                >
                    <ClockIcon className='h-6 w-6' />
                    Saved for later
                </NavLink>

                <NavLink
                    to='/resume-generator'
                    className={({ isActive }) =>
                        classNames(
                            'flex w-full gap-2 rounded-md px-3 py-2 hover:bg-blue-700 ',
                            { 'font-bold': isActive },
                        )
                    }
                >
                    <DocumentTextIcon className='h-6 w-6' />
                    Resume Generator
                </NavLink>

                <NavLink
                    to='/interview-prep'
                    className={({ isActive }) =>
                        classNames(
                            'flex w-full gap-2 rounded-md px-3 py-2 hover:bg-blue-700 ',
                            { 'font-bold': isActive },
                        )
                    }
                >
                    <RocketLaunchIcon className='h-6 w-6' />
                    Interview Prep
                </NavLink>
            </div>

            {/* Lower Nav */}
            <div className='mt-auto flex flex-col gap-4'>
                <Link
                    to='/help'
                    className='flex gap-2 rounded-xl border bg-blue-600 px-3 py-2 text-white shadow-inner '
                >
                    <QuestionMarkCircleIcon className='h-6 w-6' />
                    Help
                </Link>
            </div>
        </aside>
    );
};
