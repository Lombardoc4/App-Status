import { useState } from 'react';

import { Application } from '../../API';
import { convertDate } from '../../lib/utils';

// type DataKeys = 'role' | 'company' | 'response' | 'date_applied';

interface TableRowProps {
    app: Application;
    toggleSelect: (id: string) => void;
    selected: boolean;
}

export const TableRow = ({ app, toggleSelect, selected }: TableRowProps) => {
    const [hover, setHover] = useState(false);
    // const initialVal: {[key in DataKeys]: string} = {
    //     role: '',
    //     company: '',
    //     response: '',
    //     date_applied: ''
    // };
    // Prevent undesired keys
    // Object.keys(initialVal)
    // dataKeys.map(
    //     (key) =>
    //         (initialVal[key] =
    //             key === 'date_applied' ? convertDate(app[key]) : app[key]),
    // );

    // const handleSubmit = (val) => {
    //     const values = {
    //         // Need app id,
    //         id: app.id,
    //         ...initialVal,
    //         // date_applied is converted in inital vals
    //         date_applied: app.date_applied,
    //         // Replace with updated val
    //         ...val,
    //     };

    //     // Todo trigger alert box, saying success or error
    //     // const data =
    //     updateApp(values);
    // };

    return (
        <div
            className='flex'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className='flex w-8 justify-center align-middle'>
                {(hover || selected) && (
                    <input
                        onClick={() => toggleSelect(app.id)}
                        type='checkbox'
                        name='selectRow'
                    />
                )}
            </div>
            <div className='my-1 grid flex-1 grid-cols-5 overflow-hidden rounded-full bg-base-300'>
                <div className='col-span-2 truncate p-2 px-4'>{app.role}</div>
                <div className='truncate p-2 px-3'>{app.company}</div>
                <div className='truncate p-2 px-3'>{app.response}</div>
                <div className='truncate p-2 px-3'>
                    {convertDate(app.date_applied)}
                </div>
                {/* {Object.entries(initialVal).map(([key, value]) => {
                    return (
                        <TableCell
                            key={app.id + key}
                            val={value}
                            id={app.id}
                            // type={key}
                            // handleSubmit={(val) => handleSubmit({ [key]: val })}
                        />
                    );
                })} */}
            </div>
        </div>
    );
};
