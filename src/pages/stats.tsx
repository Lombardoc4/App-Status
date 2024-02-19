import classNames from 'classnames';
import { useMemo } from 'react';

import { Application } from '../API';
import { useApplicationsData } from '../lib/useApplicationsData';

const calcRecentPercentage = (applications: Application[]) => {
    const recentApps = applications.filter(
        (app) =>
            new Date(app.date_applied) > new Date(Date.now() - 7 * 86400000),
    );
    const lessRecentApps = applications.filter(
        (app) =>
            new Date(app.date_applied) > new Date(Date.now() - 14 * 86400000) &&
            app.date_applied < new Date(Date.now() - 7 * 86400000).toString(),
    );

    if (lessRecentApps.length > 0) {
        // console.log('length');
        return (recentApps.length / lessRecentApps.length) * 100;
    } else {
        return recentApps.length * 100;
    }
};

const findRecurringCompanies = (applications: Application[]) => {
    const companyTotals = applications.reduce(
        (acc, obj) => {
            const { company } = obj;
            acc[company] = (acc[company] || 0) + 1;
            return acc;
        },
        {} as { [key: string]: number },
    );

    // Filter out items that occur only once
    const recurringCompanies = Object.fromEntries(
        Object.entries(companyTotals).filter(([_, quantity]) => quantity > 1),
    );

    return recurringCompanies;
};

export const StatsPage = () => {
    const applications = useApplicationsData();
    const companies = useMemo(
        () => [...new Set(applications.map((app) => app.company))],
        [applications],
    );
    const percentChange = calcRecentPercentage(applications);

    const recurringCompanies = findRecurringCompanies(applications);
    // console.log('recurringCompanies', recurringCompanies);

    // console.log('chartData', Object.values(chartData));
    // console.log('chartDays', chartDays);
    // console.log('chartDays', chartDataWZeros);

    return (
        <div className='grid gap-4 gap-y-8 md:grid-cols-1 lg:grid-cols-3'>
            <StatCard>
                <p className='text-center text-lg'>
                    Last 7 days
                    <span className='block text-6xl'>{percentChange}% </span>
                    {percentChange > 100 && 'up'}
                    {percentChange < 100 && 'down'} from 7 days prior
                </p>
            </StatCard>
            <StatCard>
                <p className='text-center text-lg'>
                    <span className='block text-8xl'>
                        {applications.length}
                    </span>
                    Total Applications
                </p>
            </StatCard>
            <StatCard>
                <p className='text-center text-lg'>
                    <span className='block text-8xl'>{companies.length}</span>
                    Different Companies
                </p>
            </StatCard>
            <StatCard>
                <h2 className='text-xl font-bold'>Recurring Companies</h2>
                {Object.entries(recurringCompanies).map(([company, total]) => (
                    <div
                        key={company}
                        className='flex justify-between border-b-2 py-2'
                    >
                        <p>{company}</p>
                        <p className='font-bold'>{total}</p>
                    </div>
                ))}
            </StatCard>
            <StatCard>
                <h2 className='text-xl font-bold'>Calendar</h2>
                <p>Mark each date with # of applications</p>
            </StatCard>
        </div>
    );
};

const StatCard = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={classNames(
                'rounded-md bg-base-content p-4 text-base-100 shadow shadow-base-100',
                className,
            )}
        >
            {children || 'Card'}
        </div>
    );
};
