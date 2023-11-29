import { ChevronRightIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState } from "react";

export const Table = ({ title, children, closed = false }) => {
    const [hidden, setHidden] = useState(closed);

    if (!children) return <></>

    return (
        <div className="mb-8">
            <div className='flex items-end mb-4'>
                <h2 className='text-xl px-2 py-1 rounded-md font-bold hover:cursor-pointer hover:bg-slate-300' onClick={() => setHidden(!hidden)}>
                    <ChevronRightIcon className={classNames("w-6 h-6 inline mr-2 duration-150", {'rotate-90' : !hidden})}  />
                    {title}
                </h2>
                <p className='ms-auto italic text-slate-400'>{children.length} Total Apps</p>
            </div>

            {!hidden && <>
                <TableHeader />
                {children}
            </> }
        </div>
    );
};

const TableHeader = () => (
    <div className='ml-8 grid grid-cols-5 bg-blue-600 text-white'>
        <div className='col-span-2 text-left px-3 my-2 border-r border-white'>Role</div>
        <div className='text-left  px-3 my-2  border-r border-white'>Company</div>
        <div className='text-left  px-3 my-2  border-r border-white'>Response</div>
        <div className='text-left  px-3 my-2'>Date Applied</div>
    </div>
);