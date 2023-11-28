import { useMemo } from "react";
import { useApplicationsData } from "../lib/useApplicationsData";
import classNames from "classnames";
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts";
import moment from "moment";

const calcRecentPercentage = (applications) => {
    const recentApps = applications.filter(app => new Date(app.date_applied) > new Date(Date.now() - 7 * 86400000))
    const lessRecentApps = applications.filter(app => new Date(app.date_applied) > new Date(Date.now() - 14 * 86400000) && app.date_applied < new Date(Date.now() - 7 * 86400000))

    if (lessRecentApps.length > 0) {
        console.log('length')
        return  (recentApps.length / lessRecentApps.length) * 100;
    } else {
        return recentApps.length * 100;
    }
}

const generateDates = (startDate, endDate) => {
    let currDate = moment(startDate).startOf('day');
    const dates = [currDate.format('M-D-YYYY')];

    const lastDate = moment(endDate).startOf('day');

    while(currDate.add(1, 'days').diff(lastDate) < 0) {
        // console.log(currDate.toDate());
        dates.push(currDate.clone().format('M-D-YYYY'));
    }

    dates.push(lastDate.format('M-D-YYYY'));
    return dates;
};

export const StatsPage = () => {
    const applications = useApplicationsData();
    const companies = useMemo(() => [...new Set(applications.map(app => app.company))], [applications]);
    const percentChange = calcRecentPercentage(applications);

    const chartDays = useMemo(() => {
        if (applications.length <= 0)
            return [];

        const lastApp = applications[0].date_applied
        const firstApp = applications[applications.length - 1].date_applied
        return generateDates(firstApp, lastApp)

        // return true
    }, [applications])

    // console.log('chartDays', chartDays && chartDays.reduce((acc, date) => {
    //     acc[date] = {
    //         name: date
    //     }

    //     acc[date].total = applications.filter(app => moment(app.date_applied).toISOString() === moment(date).toISOString()).length
    //     return acc;
    // }, {}));

    // const chartData = applications.reduce((acc, app) => {
    //     if (acc[app.date_applied]) {
    //         acc[app.date_applied].total += 1;
    //     } else {
    //         acc[app.date_applied] = {
    //             name: app.date_applied,
    //             total: 1
    //         }
    //     }

    //     return acc;
    // }, {})
    const chartDataWZeros = []
    const chartData = chartDays && chartDays.reduce((acc, date) => {
            acc[date] = {
                name: date
            }
            const copy = {...acc[date]}

            const isoDate = moment(date).toISOString();
            const total = applications.filter(app => moment(app.date_applied).toISOString() === isoDate).length
            // if (total) {
                acc[date].total = total
            // }

            copy.total = total
            chartDataWZeros.push(copy)
            return acc;
        }, {})

    console.log('chartData', Object.values(chartData));
    console.log('chartDays', chartDays);
    console.log('chartDays', chartDataWZeros);

    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8'>
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
                <p className='text-lg text-center'>
                    <span className='text-8xl block'>{companies.length}</span>
                    Different Companies
                </p>
            </StatCard>
            <StatCard className='col-span-4'>
                <p>Select Interval: All</p>
                <ResponsiveContainer width='100%' height={300}>
                    <LineChart
                        width={800}
                        height={300}
                        data={Object.values(chartData)}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                        <Line type='monotone' dataKey='total' stroke='#8884d8' connectNulls />
                        <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                        <XAxis dataKey='name' interval={"preserveStartEnd"} minTickGap={100} />
                        <YAxis />
                    </LineChart>
                </ResponsiveContainer>
            </StatCard>
        </div>
    );
}

const StatCard = ({children, className}) => {
    return <div className={classNames("rounded-md shadow-sm shadow-blue-400 p-4 bg-white", className)}>
        {children || "Card"}
    </div>
}