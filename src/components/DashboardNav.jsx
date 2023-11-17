import { ChartBarSquareIcon, ChartPieIcon, ClockIcon, DocumentTextIcon, HomeIcon, QuestionMarkCircleIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { NavLink, Link } from "react-router-dom";


export const DashboardNav = () => {
    return (
        <div className='bg-blue-600 text-white w-1/4 p-2 pb-4 max-w-[240px] flex flex-col shadow-sm'>
            <div className='flex justify-center gap-2 items-center text-2xl py-4'>
                <DocumentTextIcon className="w-12 h-12"/>
                <h2>APP<br/>TRACKER</h2>

            </div>
            <div className="h-px bg-white my-2 rounded-full"></div>

            <div className='my-4 w-full flex flex-col gap-4'>
                <NavLink
                    to='/dashboard'
                    className={({ isActive }) => "flex gap-2 w-full rounded-md px-3 py-2 hover:bg-blue-700 " + (isActive ? "font-bold" : "")}
                >
                    <ChartPieIcon className="w-6 h-6"/>
                    Dashboard
                </NavLink>

                <NavLink
                    to='/dashboard'
                    className={({ isActive }) => "flex gap-2 w-full rounded-md px-3 py-2 hover:bg-blue-700 " + (isActive ? "font-bold" : "")}
                >
                    <ChartBarSquareIcon className="w-6 h-6"/>
                    Stats
                </NavLink>

                <NavLink
                    to='/account'
                    className={({ isActive }) => "flex gap-2 w-full rounded-md px-3 py-2 hover:bg-blue-700 " + (isActive ? "font-bold" : "")}
                >
                    <ClockIcon className="w-6 h-6"/>
                    Saved for later
                </NavLink>

                <NavLink
                    to='/account'
                    className={({ isActive }) => "flex gap-2 w-full rounded-md px-3 py-2 hover:bg-blue-700 " + (isActive ? "font-bold" : "")}
                >
                    <DocumentTextIcon className="w-6 h-6"/>
                    Resume Generator
                </NavLink>

                <NavLink
                    to='/account'
                    className={({ isActive }) => "flex gap-2 w-full rounded-md px-3 py-2 hover:bg-blue-700 " + (isActive ? "font-bold" : "")}
                >
                    <RocketLaunchIcon className="w-6 h-6"/>
                    Interview Prep
                </NavLink>
            </div>

            {/* Lower Nav */}
            <div className='mt-auto flex flex-col gap-4'>
                <Link to='/help' className='flex gap-2 border py-2 px-3 rounded-xl bg-blue-600 text-white shadow-inner '>
                    <QuestionMarkCircleIcon className="w-6 h-6"/>
                    Help
                </Link>
                <Link className='flex gap-2 border py-2 px-3 rounded-xl bg-blue-600 text-white shadow-inner ' to='/'>
                    <HomeIcon className="w-6 h-6"/>
                    AppTracker.com
                </Link>

            </div>
        </div>
    );
}