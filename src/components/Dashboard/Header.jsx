import { useMemo, useState } from 'react';
import ApplicationCreateForm from './ApplicationCreateForm';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0,
).getDate();
const TimePeriods = {
    '7 Days': 7,
    '2 Weeks': 14,
    '1 Month': daysInMonth,
};

export const ApplicationsHeader = ({
    applications,
    deleteApps,
    deselectApps,
    selectedApps,
    searchInput,
    dateFilter,
}) => {
    const [showForm, setShowForm] = useState(false);
    const companies = useMemo(
        () => [...new Set(applications.map((app) => app.company))],
        [applications],
    );

    const handleSearch = (e) => {
        searchInput(
            applications.filter((app) => app.company === e.target.value),
        );
    };

    const handleFilter = (e) => {
        dateFilter(TimePeriods[e.target.value]);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    return (
        <>
            <div className='mb-8 flex w-full gap-2'>
                <button
                    onClick={() => setShowForm(true)}
                    className='flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-white'
                >
                    Add <PlusCircleIcon className='h-5 w-5' />
                </button>

                <input
                    placeholder='Search Companies...'
                    className='rounded-md border px-2'
                    id='company-search'
                    name='company-search'
                    list='companies'
                    onChange={handleSearch}
                />
                <datalist id='companies'>
                    {companies.map((company) => (
                        <option key={company} value={company}>
                            {company}
                        </option>
                    ))}
                </datalist>
                <select
                    placeholder='Date Applied'
                    className='rounded-md border px-2'
                    id='time-filter'
                    name='time-filter'
                    onChange={handleFilter}
                >
                    <option value=''>All dates</option>
                    {Object.keys(TimePeriods).map((period) => (
                        <option key={period} value={period}>
                            {period}
                        </option>
                    ))}
                </select>

                <p className='my-auto ms-auto italic text-slate-400'>
                    {applications.length} Total Apps
                </p>
            </div>

            {showForm && (
                <ApplicationCreateForm
                    onSuccess={closeForm}
                    onCancel={closeForm}
                    onError={(error) => {
                        console.log('error', error);
                    }}
                />
            )}
        </>
    );
};
