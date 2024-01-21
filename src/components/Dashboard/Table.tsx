import { ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useState } from 'react';

interface TableProps {
    title: string;
    children: React.ReactNode[];
    closed?: boolean;
}

export const Table = ({ title, children, closed = false }: TableProps) => {
    const [hidden, setHidden] = useState(closed);
    if (!children) return <></>;

    return (
        <div className='mb-8'>
            {/* Heading */}
            <div className='mb-4 flex items-center'>
                <div
                    onClick={() => setHidden(!hidden)}
                    className='flex items-center rounded-md px-2 py-1 text-xl font-bold hover:cursor-pointer hover:bg-slate-300'
                >
                    <ChevronRightIcon
                        className={classNames(
                            'mr-2 inline h-6 w-6 duration-150',
                            {
                                'rotate-90': !hidden,
                            },
                        )}
                    />
                    <h2>{title}</h2>
                </div>
                <p className=' mx-2 text-slate-400'>({children.length})</p>
            </div>

            {!hidden && (
                <>
                    <TableHeader />
                    {children}
                </>
            )}
        </div>
    );
};

const TableHeader = () => (
    <div className='ml-8 grid grid-cols-5 overflow-hidden rounded-full  bg-blue-600 text-white'>
        <div className='col-span-2 my-2 border-r border-white px-3 text-left'>
            Role
        </div>
        <div className='my-2  border-r border-white  px-3 text-left'>
            Company
        </div>
        <div className='my-2  border-r border-white  px-3 text-left'>
            Response
        </div>
        <div className='my-2  px-3 text-left'>Date Applied</div>
    </div>
);
