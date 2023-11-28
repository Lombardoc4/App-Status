import { ChevronRightIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState } from "react";

export const Table = ({ title, children }) => {
    const [hidden, setHidden] = useState(false);

    if (!children) return <></>
    return (
        <div className="mb-8">
            <div className='flex items-end mb-4'>
                <h2 className='text-xl font-bold'>
                    <ChevronRightIcon className={classNames("w-8 h-8 inline ml-2 duration-150", {'rotate-90' : !hidden})} onClick={() => setHidden(!hidden)} />
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
    <div className='ml-8 grid grid-cols-4 bg-blue-600 text-white'>
        <div className='text-left px-3 my-2 border-r border-white'>Role</div>
        <div className='text-left  px-3 my-2  border-r border-white'>Company</div>
        <div className='text-left  px-3 my-2  border-r border-white'>Response</div>
        <div className='text-left  px-3 my-2'>Date Applied</div>
    </div>
);