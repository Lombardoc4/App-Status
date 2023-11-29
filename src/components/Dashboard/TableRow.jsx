import { useState } from "react";
import { TableCell } from "./TableCells";

import { convertDate } from "../../lib/utils";
import { updateApp } from "../../lib/utils";

const dataKeys = ["role", "company", "response", "date_applied"];

export const TableRow = ({ app, toggleSelect, selected }) => {
    const [hover, setHover] = useState(false);
    const initialVal = {};
    // Prevent undesired keys
    dataKeys.map( key => initialVal[key] = (key === "date_applied") ? convertDate(app[key]) : app[key])

    const handleSubmit = (val) => {
        const values = {
            // Need app id,
            id: app.id,
            ...initialVal,
            // date_applied is converted in inital vals
            date_applied: app.date_applied,
            // Replace with updated val
            ...val,
        };

        const data = updateApp(values);
        // Todo trigger alert box, saying success or error
    };

    return (
        <div
        className='flex'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        >
            <div className="w-8 flex align-middle justify-center">

            {(hover || selected) &&
            <input
            onClick={() => toggleSelect(app.id)}
            type='checkbox'
            name='selectRow'
            />
        }
        </div>
            <div className=' flex-1 grid grid-cols-5 bg-white'>
                {Object.entries(initialVal).map(([key, value]) => {
                    return (
                        <TableCell
                            key={app.id + key}
                            val={value}
                            id={app.id}
                            type={key}
                            handleSubmit={(val) => handleSubmit({ [key]: val })}
                        />
                    );
                })}
            </div>
        </div>
    );
};