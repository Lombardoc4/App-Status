import { useEffect, useMemo, useState, useRef  } from "react";
import { EditProvider } from "../../lib/useEditContext";
import { NoApps } from "./NoApps";
import { deleteApp } from "../../lib/utils";
import { ApplicationsHeader } from "./Header";
import { TableRow } from "./TableRow";
import { Table } from "./Table";
import { BulkAction } from "./BulkAction";
import { useApplicationsData } from "../../lib/useApplicationsData";
import { useAlertContext } from "../../lib/useAlertContext";


const sortByResponse = (a,b) => {
    let res = 1
    if (a.response === b.response)
        res= 0;
    else if (a.response === 'ACCEPTED')
        res = -1;
    else if (a.response === 'WAITING' && b.response !== 'ACCEPTED')
        res = -1;
    else if (a.response === 'DECLINED' && (b.response !== "WAITING" && b.response !== 'ACCEPTED'))
        res = -1;

    return res;
}


function ApplicationTables() {
    const applications = useApplicationsData();

    const [filterApps, setFilterApps] = useState([]);
    const [selectedApps, setSelectedApps] = useState([]);

    const {updateAlert} = useAlertContext()


    const acceptedApps = useMemo(() => applications.filter((app) => app.response === "ACCEPTED"), [applications]);
    const ongoingApps = useMemo(() => applications.filter((app) => app.response === "WAITING"), [applications]);
    const declinedApps = useMemo(() => applications.filter((app) => app.response === "DECLINED"), [applications]);
    const noAnswerApps = useMemo(() => applications.filter((app) => app.response === "NO_ANSWER"), [applications]);


    const deleteSelectedApps = () => {
        const responses = selectedApps.map(app => deleteApp(app));

        Promise.all(responses).then((res) => {
            updateAlert({
                type: 'success',
                msg: 'Items deleted successfully'
            })

            setSelectedApps([]);
        }).catch( err => {
            updateAlert({
                type: 'error',
                msg: 'Items could not be deleted'
            })
            console.log('error', err)
        })
    }

    const BulkActionEl = <BulkAction
                        selectedApps={selectedApps}
                        deselectApps={() => setSelectedApps([])}
                        deleteApps={(apps) => deleteSelectedApps(apps)}
                        />

    const toggleSelectApp = (id) => {
        const apps = selectedApps.includes(id) ? selectedApps.filter((app) => app !== id) : [...selectedApps, id]

        // Toggle on Bulk Element Comp
        if (apps.length > 0) {
            updateAlert({
                type: 'bulk',
                msg: BulkActionEl
            })
        } else  {
            updateAlert();
        }

        setSelectedApps(apps)
    }

    const handleDateFilter = (days) => {
        const compareDate = new Date(Date.now() - days * 86400000);
        const filteredApps = [...applications.filter(app => new Date(app.date_applied) > compareDate)];
        filteredApps.sort(sortByResponse);
        setFilterApps(filteredApps);
    }


    if (applications.length === 0) {
        return <NoApps showForm={() => setShowForm(true)}/>
    }

    return (
        <EditProvider>
            <ApplicationsHeader
                applications={applications}
                searchInput={(apps) => setFilterApps(apps)}
                dateFilter={(days) => handleDateFilter(days)}
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
                        <Table title={"Accepted!"}>
                            {acceptedApps.map((app) => (
                                <TableRow
                                    key={app.id}
                                    app={app}
                                    selected={selectedApps.includes(app.id)}
                                    toggleSelect={() => toggleSelectApp(app.id)}
                                />
                            ))}
                        </Table>
                    )}
                    {ongoingApps.length > 0 && (
                        <Table title={"Awaiting answer"}>
                            {ongoingApps.map((app) => (
                                <TableRow
                                    key={app.id}
                                    app={app}
                                    selected={selectedApps.includes(app.id)}
                                    toggleSelect={() => toggleSelectApp(app.id)}
                                />
                            ))}
                        </Table>
                    )}
                    {declinedApps.length > 0 && (
                        <Table title={"Declined"}>
                            {declinedApps.map((app) => (
                                <TableRow
                                    key={app.id}
                                    app={app}
                                    selected={selectedApps.includes(app.id)}
                                    toggleSelect={() => toggleSelectApp(app.id)}
                                />
                            ))}
                        </Table>
                    )}
                    {noAnswerApps.length > 0 && (
                        <Table title={"No answer"}>
                            {noAnswerApps.map((app) => (
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
