import { useMemo, useState } from 'react';

import { BulkAction } from './BulkAction';
import { ApplicationsHeader } from './Header';
// import { NoApps } from './NoApps';
import { Table } from './Table';
import { TableRow } from './TableRow';
import { Application } from '../../API';
import { useAlertContext } from '../../lib/alertContext';
import { useApplicationsData } from '../../lib/useApplicationsData';
import { EditProvider } from '../../lib/useEditContext';
import { deleteApp } from '../../lib/utils';

const sortByResponse = (a: Application, b: Application) => {
    let res = 1;
    if (a.response === b.response) res = 0;
    else if (a.response === 'ACCEPTED') res = -1;
    else if (a.response === 'WAITING' && b.response !== 'ACCEPTED') res = -1;
    else if (
        a.response === 'DECLINED' &&
        b.response !== 'WAITING' &&
        b.response !== 'ACCEPTED'
    )
        res = -1;

    return res;
};

function ApplicationTables() {
    const applications = useApplicationsData();

    const [filterApps, setFilterApps] = useState<Application[]>([]);
    const [selectedApps, setSelectedApps] = useState<string[]>([]);

    const { updateAlert } = useAlertContext();

    const acceptedApps = useMemo(
        () => applications.filter((app) => app.response === 'ACCEPTED'),
        [applications],
    );
    const activeApps = useMemo(
        () => applications.filter((app) => app.response === 'WAITING'),
        [applications],
    );
    const closedApps = useMemo(
        () =>
            applications.filter(
                (app) =>
                    app.response === 'NO_ANSWER' || app.response === 'DECLINED',
            ),
        [applications],
    );

    const deleteSelectedApps = () => {
        const responses = selectedApps.map((app) => deleteApp(app));

        Promise.all(responses)
            .then(() => {
                updateAlert({
                    type: 'success',
                    msg: 'Items deleted successfully',
                });

                setSelectedApps([]);
            })
            .catch(() => {
                updateAlert({
                    type: 'error',
                    msg: 'Items could not be deleted',
                });
                // console.log('error', err);
            });
    };

    const BulkActionEl = (
        <BulkAction
            selectedApps={selectedApps.length}
            deselectApps={() => setSelectedApps([])}
            deleteApps={() => deleteSelectedApps()}
        />
    );

    const toggleSelectApp = (id: string) => {
        const apps = selectedApps.includes(id)
            ? selectedApps.filter((app) => app !== id)
            : [...selectedApps, id];

        // Toggle on Bulk Element Comp
        if (apps.length > 0) {
            updateAlert({
                type: 'bulk',
                msg: BulkActionEl,
            });
        } else {
            updateAlert();
        }

        setSelectedApps(apps);
    };

    const handleDateFilter = (days: number) => {
        const compareDate = new Date(Date.now() - days * 86400000);
        const filteredApps = [
            ...applications.filter(
                (app) => new Date(app.date_applied) > compareDate,
            ),
        ];
        filteredApps.sort(sortByResponse);
        setFilterApps(filteredApps);
    };

    // ! Todo : Bring back to life
    // if (applications.length === 0) {
    //     return <NoApps showForm={() => setShowForm(true)} />;
    // }

    return (
        <EditProvider>
            <ApplicationsHeader
                applications={applications}
                searchInput={(apps: Application[]) => setFilterApps(apps)}
                dateFilter={(days: number) => handleDateFilter(days)}
            />

            {/* <div>Dropdown with bulk action?</div> */}

            {filterApps.length > 0 && (
                <Table title='Search Results'>
                    {filterApps.map((app) => (
                        <TableRow
                            key={app.id}
                            app={app}
                            selected={selectedApps.includes(app.id)}
                            toggleSelect={() => toggleSelectApp(app.id)}
                        />
                    ))}
                </Table>
            )}

            {filterApps.length === 0 && (
                <>
                    {acceptedApps.length > 0 && (
                        <Table title='Accepted!'>
                            {acceptedApps.map((app: Application) => (
                                <TableRow
                                    key={app.id}
                                    app={app}
                                    selected={selectedApps.includes(app.id)}
                                    toggleSelect={() => toggleSelectApp(app.id)}
                                />
                            ))}
                        </Table>
                    )}
                    {activeApps.length > 0 && (
                        <Table title='Active'>
                            {activeApps.map((app) => (
                                <TableRow
                                    key={app.id}
                                    app={app}
                                    selected={selectedApps.includes(app.id)}
                                    toggleSelect={() => toggleSelectApp(app.id)}
                                />
                            ))}
                        </Table>
                    )}
                    {closedApps.length > 0 && (
                        <Table title='Closed' closed={true}>
                            {closedApps.map((app) => (
                                <TableRow
                                    key={app.id}
                                    app={app}
                                    selected={selectedApps.includes(app.id)}
                                    toggleSelect={() => toggleSelectApp(app.id)}
                                />
                            ))}
                        </Table>
                    )}
                </>
            )}

            {/* {showAll && applications.length > 0 && <Table title='All' apps={applications} />} */}
        </EditProvider>
    );
}

export default ApplicationTables;
