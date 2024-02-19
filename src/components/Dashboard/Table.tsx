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
                    className='flex items-center rounded-md bg-base-100 px-2 py-1 text-xl font-bold text-base-content hover:cursor-pointer hover:bg-base-content hover:text-base-300'
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
                <p className=' mx-2 text-base-content'>({children.length})</p>
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
    <div className='my-2 ml-8 grid grid-cols-5 overflow-hidden rounded-full font-bold text-base-content'>
        <div className='col-span-2 border-r border-base-100 p-2 px-4 text-left'>
            Role
        </div>
        <div className='border-r border-base-100 p-2 px-3 text-left'>
            Company
        </div>
        <div className='border-r border-base-100 p-2 px-3 text-left'>
            Response
        </div>
        <div className='p-2 px-3 text-left'>Date Applied</div>
    </div>
);
