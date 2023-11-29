import { useMemo } from "react";
import { useApplicationsData } from "../lib/useApplicationsData";
import classNames from "classnames";

const calcRecentPercentage = (applications) => {
    const recentApps = applications.filter((app) => new Date(app.date_applied) > new Date(Date.now() - 7 * 86400000));
    const lessRecentApps = applications.filter(
        (app) =>
            new Date(app.date_applied) > new Date(Date.now() - 14 * 86400000) &&
            app.date_applied < new Date(Date.now() - 7 * 86400000)
    );

    if (lessRecentApps.length > 0) {
        console.log("length");
        return (recentApps.length / lessRecentApps.length) * 100;
    } else {
        return recentApps.length * 100;
    }
}

const findRecurringCompanies = (applications) => {
    const companyTotals = applications.reduce((acc, obj) => {
        const { company } = obj;
        acc[company] = (acc[company] || 0) + 1;
        return acc;
      }, {});

      // Filter out items that occur only once
      const recurringCompanies = Object.fromEntries(
        Object.entries(companyTotals).filter(([_, quantity]) => quantity > 1)
      );

      return recurringCompanies;
}

export const StatsPage = () => {
    const applications = useApplicationsData();
    const companies = useMemo(() => [...new Set(applications.map(app => app.company))], [applications]);
    const percentChange = calcRecentPercentage(applications);

    const recurringCompanies = findRecurringCompanies(applications);
    console.log('recurringCompanies', recurringCompanies);

    // console.log('chartData', Object.values(chartData));
    // console.log('chartDays', chartDays);
    // console.log('chartDays', chartDataWZeros);

    return (
        <div className='grid md:grid-cols-1 lg:grid-cols-3 gap-4 gap-y-8'>
            <StatCard>
                <p className='text-lg text-center'>
                    Last 7 days
                    <span className='text-6xl block'>{percentChange}% </span>
                    {percentChange > 100 && "up"}
                    {percentChange < 100 && "down"} from 7 days prior
                </p>
            </StatCard>
            <StatCard>
                <p className='text-lg text-center'>
                    <span className='text-8xl block'>{applications.length}</span>
                    Total Applications
                </p>
            </StatCard>
            <StatCard>
                <p className='text-lg text-center'>
                    <span className='text-8xl block'>{companies.length}</span>
                    Different Companies
                </p>
            </StatCard>
            <StatCard>
                    <h2 className="font-bold text-xl">Recurring Companies</h2>
                    {Object.entries(recurringCompanies).map(([company, total]) => (
                        <div key={company} className="flex justify-between py-2 border-b-2">
                            <p>{company}</p>
                            <p className="font-bold">{total}</p>
                        </div>
                    ))}
            </StatCard>
        </div>
    );
}

const StatCard = ({children, className}) => {
    return <div className={classNames("rounded-md shadow-sm shadow-blue-400 p-4 bg-white", className)}>
        {children || "Card"}
    </div>
}