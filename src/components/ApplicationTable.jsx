import { TextField, SelectField, useAuthenticator } from "@aws-amplify/ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { listApplications } from "../graphql/queries";
import { useEffect, useMemo, memo, useState, useCallback } from "react";
import ApplicationCreateForm from "./ApplicationCreateForm";
import { deleteApplication, updateApplication } from "../graphql/mutations";
import { validateField, fetchByPath } from "../ui-components/utils";
import { onCreateApplication, onDeleteApplication, onUpdateApplication } from "../graphql/subscriptions";
import { CheckCircleIcon, PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { EditProvider, useEditContext, useSetEditContext } from "../lib/useEditContext";

const getApplications = async () => {
    // List all items
    const { data } = await API.graphql({
        query: listApplications,
    });

    // date_applied is a string, this wont sort
    return data.listApplications.items;
};

const deletedApplication = async (id) => {
    const deleted = await API.graphql({
        query: deleteApplication,
        variables: {
            input: {
                id: id,
            },
        },
    });
    return deleted;
};

const NoApps = ({ children }) => {
    <div className='h-96 bg-blue-200 text-center flex align-middle'>
        <p className='text-slate-500 text-xl mb-2'>No Applications</p>
        {children}
    </div>;
};

function ApplicationTable() {
    const [applications, setApplications] = useState([]);
    const [searchApps, setSearchApps] = useState([]);
    const acceptedApps = useMemo(() => applications.filter((app) => app.response === "ACCEPTED"), [applications]);
    const ongoingApps = useMemo(() => applications.filter((app) => app.response === "UNANSWERED"), [applications]);
    const declinedApps = useMemo(() => applications.filter((app) => app.response === "DECLINED"), [applications]);

    useEffect(() => {
        const subCreateApp = API.graphql(graphqlOperation(onCreateApplication)).subscribe({
            next: ({ value }) => {
                const newApp = value.data.onCreateApplication;
                setApplications((apps) => [newApp, ...apps]);
            },
            error: (error) => console.warn(error),
        });
        const subUpdateApp = API.graphql(graphqlOperation(onUpdateApplication)).subscribe({
            next: ({ value }) => {
                const updatedApp = value.data.onUpdateApplication;
                setApplications((apps) => apps.map((app) => (app.id !== updatedApp.id ? app : updatedApp)));
            },
            error: (error) => console.warn(error),
        });
        const subDeleteApp = API.graphql(graphqlOperation(onDeleteApplication)).subscribe({
            next: ({ value }) => {
                const deletedApp = value.data.onDeleteApplication;
                setApplications((apps) => apps.filter((app) => app.id !== deletedApp.id));
            },
            error: (error) => console.warn(error),
        });

        getApplications().then((data) => {
            if (Array.isArray(data)) {
                // data.map(v => console.log('date', v.company, new Date(v.date_applied).getTime()))
                data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAts));
                console.log("data", data);
                setApplications(data);
            } else {
                // TODO : ERROR HANDLING
                console.log("res0", data);
            }
        });

        return () => {
            subCreateApp.unsubscribe();
            subUpdateApp.unsubscribe();
            subDeleteApp.unsubscribe();
        };
    }, []);

    if (applications.length === 0) {
        return (
            <NoApps>
                <button className='py-2 px-3 bg-green-400 rounded-md' onClick={() => setShowForm(true)}>
                    Add Application
                </button>
            </NoApps>
        );
    }

    return (
        <EditProvider>
            <ApplicationsHeader appState={[applications, setApplications]} searchInput={(val) => setSearchApps(val)} />

            {/* <div>Dropdown with bulk action?</div> */}

            {searchApps.length > 0 && <Table title='Search Results' apps={searchApps} />}

            {searchApps.length === 0 && (
                <>
                    {acceptedApps.length > 0 && <Table title={"Accepted"} apps={acceptedApps} />}
                    {ongoingApps.length > 0 && <Table title={"Ongoing"} apps={ongoingApps} />}
                    {declinedApps.length > 0 && <Table title={"Declined"} apps={declinedApps} />}
                </>
            )}

            {/* {showAll && applications.length > 0 && <Table title='All' apps={applications} />} */}
        </EditProvider>
    );
}

function ApplicationsHeader({ appState, searchInput }) {
    const [applications, setApps] = appState;
    const [showForm, setShowForm] = useState(false);

    const handleAddition = (addition) => {
        delete addition.Field0;
        setApps((apps) => [addition, ...apps]);

        setShowForm(false);
    };

    const AdditionForm = (
        <div className='my-8 rounded-md bg-slate-100 w-96 shadow-lg'>
            <ApplicationCreateForm
                onSuccess={handleAddition}
                onCancel={() => setShowForm(false)}
                onError={(error) => {
                    console.log("error", error);
                }}
            />
        </div>
    );

    return (
        <>
            <div className='flex gap-2 my-4'>
                <input
                    placeholder='Search Companies...'
                    onChange={(e) => {
                        searchInput(applications.filter((app) => app.company === e.target.value));
                    }}
                    className='rounded-md px-2 border'
                    list='companies'
                    id='company-search'
                    name='company-search'
                />
                <datalist id='companies'>
                    {applications.map((app) => (
                        <option key={app.company} value={app.company}>
                            {app.company}
                        </option>
                    ))}
                </datalist>

                <button
                    className='py-2 px-3 rounded-md flex items-center gap-1 bg-blue-600 text-white'
                    onClick={() => setShowForm(true)}
                >
                    Add
                    <PlusCircleIcon className='h-5 w-5' />
                </button>
            </div>

            {showForm && AdditionForm}
        </>
    );
}

const Table = ({ title, apps }) => {
    return (
        <>
            <div className='flex items-end'>
                <h2 className='text-xl font-bold'>{title}</h2>
                <p className='ms-auto italic text-slate-400'>{apps.length} Total Apps</p>
            </div>

            <div className='overflow-hidden rounded-xl shadow-md my-2'>
                <TableHeader />

                {apps.map((app) => (
                    <TableRow key={app.id} app={app} selected={false} />
                ))}
            </div>
        </>
    );
};

const TableHeader = () => (
    <div className='grid grid-cols-4 bg-blue-600 text-white'>
        <div className='text-left px-3 my-2 border-r border-white'>Role</div>
        <div className='text-left  px-3 my-2  border-r border-white'>Company</div>
        <div className='text-left  px-3 my-2  border-r border-white'>Response</div>
        <div className='text-left  px-3 my-2'>Date Applied</div>
    </div>
);

const dataKeys = ["role", "company", "response", "date_applied"];

const convertDate = (date) => {
    return new Date(date.replace(/-/g, "/")).toDateString();
};

const TableRow = ({ app }) => {
    const handleSubmit = (val) => {
        console.log({ ...app, ...val });

        // Todo : Update via graphql by id;
    };

    return (
        <div className='grid grid-cols-4 bg-white'>
            {dataKeys.map((key) => {
                const val = key === "date_applied" ? convertDate(app[key]) : app[key];
                return (
                    <TableCell
                        key={app.id + key}
                        val={val}
                        id={app.id}
                        // selected={editId === app.id + val}
                        handleSubmit={(val) => handleSubmit({ [key]: val })}
                        // toggleEdit={() => toggleEdit(val)}
                    />
                );
            })}
        </div>
    );
};

const TableCell = function TableCell({ val, id, handleSubmit }) {
    const editId = useEditContext();
    const setEdit = useSetEditContext();
    const cellId = id + val;

    const toggleOff = useCallback(() => {
        setEdit("");
    }, []);

    const submit = useCallback((val) => {
        handleSubmit(val);
        toggleOff();
    }, []);

    const toggleEdit = useCallback(() => {
        console.log("togggle");
        setEdit(cellId);
    }, []);

    const cell = useMemo(
        () =>
            editId === cellId ? (
                <EditCell val={val} submit={submit} cancel={toggleOff} />
            ) : (
                <DefaultCell val={val} toggleEdit={toggleEdit} />
            ),
        [editId === cellId]
    );

    return cell;
};

const DefaultCell = ({ val, toggleEdit }) => {
    const [hover, setHover] = useState(false);
    return (
        <div
            className='flex justify-between items-center text-left px-3 py-2 truncate border hover:cursor-pointer hover:bg-slate-100'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onDoubleClick={toggleEdit}
        >
            <div className='w-5/6 truncate'>{val}</div>
            {hover && <PencilIcon onClick={toggleEdit} className='h-4 w-4' />}
        </div>
    );
};

const EditCell = ({ val, submit, cancel }) => {
    const [editVal, setEditVal] = useState(val);

    const handleInput = (e) => setEditVal(e.target.value);
    const handleKeyDown = (e) => {
        e.code === "Enter" && handleEdit(e.target.value);
        e.code === "Escape" && cancel();
    };

    return (
        <div className='flex justify-between items-center text-left px-3 py-2 truncate border bg-slate-100'>
            <input className='w-5/6' type='text' value={editVal} onChange={handleInput} onKeyDown={handleKeyDown} />
            <CheckCircleIcon onClick={() => submit(editVal)} className='h-4 w-4' />
        </div>
    );
};

export default ApplicationTable;
