import { useEffect, useState } from "react";
import { getApplications, subCreation, subDelete, subUpdate, deleteApp, updateApp } from "./utils";


const sortApps = (apps) => apps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

export const useApplicationsData = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const subCreateApp = subCreation((newApp) => {
            setApplications((apps) => sortApps([newApp, ...apps]))
            // updateAlerts({type: 'success', msg: 'Application added'})
        })
        const subUpdateApp = subUpdate((updatedApp) => {
            setApplications((apps) => sortApps(apps.map((app) => (app.id !== updatedApp.id ? app : updatedApp))))
            // updateAlerts({type: 'success', msg: 'Application updated'})
        })
        const subDeleteApp = subDelete((deletedApp) => setApplications((apps) => apps.filter((app) => app.id !== deletedApp.id)))

        getApplications().then((data) => {
            if (!Array.isArray(data)) {
                // TODO : ERROR HANDLING
                console.log("res0", data);
                return;
            }

            setApplications(sortApps(data));
        });


        return () => {
            subCreateApp.unsubscribe();
            subUpdateApp.unsubscribe();
            subDeleteApp.unsubscribe();
        };
    }, []);

    return applications;
}