import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';

import { Application } from '../../API';
import ApplicationCreateForm from '../../ui-components/ApplicationCreateForm';

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

interface AppHeader {
    applications: Application[];
    // deleteApps: () => void,
    // deselectApps: () => void,
    // selectedApps: Application[],
    searchInput: (apps: Application[]) => void;
    dateFilter: (days: number) => void;
}

export const ApplicationsHeader = ({
    applications,
    // deleteApps,
    // deselectApps,
    // selectedApps,
    searchInput,
    dateFilter,
}: AppHeader) => {
    const [showForm, setShowForm] = useState(false);
    const companies = useMemo(
        () => [...new Set(applications.map((app) => app.company))],
        [applications],
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchInput(
            applications.filter(
                (app) => app.company === (e.target as HTMLInputElement).value,
            ),
        );
    };

    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target as HTMLSelectElement;
        dateFilter(TimePeriods[value as keyof typeof TimePeriods]);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    return (
        <>
            <div className='mb-8 flex w-full gap-2'>
                <button
                    onClick={() => setShowForm(true)}
                    className='flex items-center gap-1 rounded-md bg-base-content px-3 py-2 text-base-100'
                >
                    Add <PlusCircleIcon className='size-5' />
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
                <div className='mb-2 max-w-96 rounded bg-base-300'>
                    <ApplicationCreateForm
                        onSuccess={closeForm}
                        onCancel={closeForm}
                        onError={() => {
                            // console.log('error', error);
                        }}
                    />
                </div>
            )}
        </>
    );
};
