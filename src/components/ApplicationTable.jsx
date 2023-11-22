import { generateClient } from "aws-amplify/api";
import { listApplications } from "../graphql/queries";
import { useEffect, useMemo, useState, useCallback } from "react";
import ApplicationCreateForm from "./ApplicationCreateForm";
import { deleteApplication, updateApplication } from "../graphql/mutations";
import { validateField } from "../ui-components/utils";
import { onCreateApplication, onDeleteApplication, onUpdateApplication } from "../graphql/subscriptions";
import { CheckCircleIcon, PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { EditProvider, useEditContext, useSetEditContext } from "../lib/useEditContext";
import { DateInput, ResponseInput, TextInput } from "./ApplicationInputs";

const client = generateClient();

const getApplications = async () => {
    console.log('intercept')
    // List all items
    const { data } = await client.graphql({
        query: listApplications
    });

    console.log('data', data);

    // date_applied is a string, this wont sort
    return data.listApplications.items;
};

const updateApp = async (values) => {
    // Todo: try catch to return error
    const { data } = await client.graphql({
        query: updateApplication,
        variables: { input: values },
    });

    return data.updateApplication;
};

const deletedApplication = async (id) => {
    const deleted = await client.graphql({
        query: deleteApplication,
        variables: {
            input: {
                id: id,
            },
        },
    });
    return deleted;
};

const sortApps = (apps) => apps.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

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
    const ongoingApps = useMemo(() => applications.filter((app) => app.response === "WAITING"), [applications]);
    const declinedApps = useMemo(() => applications.filter((app) => app.response === "DECLINED"), [applications]);
    const noAnswerApps = useMemo(() => applications.filter((app) => app.response === "NO_ANSWER"), [applications]);

    useEffect(() => {
        const subCreateApp = client.graphql({ query: onCreateApplication }).subscribe({
            next: ({ value }) => {
                const newApp = value.data.onCreateApplication;
                setApplications((apps) => sortApps([newApp, ...apps]));
            },
            error: (error) => console.warn(error),
        });

        const subUpdateApp = client
            .graphql({
                query: onUpdateApplication,
            })
            .subscribe({
                next: ({ data }) => {
                    const updatedApp = data.onUpdateApplication;
                    setApplications((apps) =>
                        sortApps(apps.map((app) => (app.id !== updatedApp.id ? app : updatedApp)))
                    );
                },
                error: (error) => console.warn(error),
            });
        const subDeleteApp = client.graphql({ query: onDeleteApplication }).subscribe({
            next: ({ value }) => {
                const deletedApp = value.data.onDeleteApplication;
                setApplications((apps) => apps.filter((app) => app.id !== deletedApp.id));
            },
            error: (error) => console.warn(error),
        });

        getApplications().then((data) => {
            if (Array.isArray(data)) {
                setApplications(sortApps(data));
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
                    {ongoingApps.length > 0 && <Table title={"Awaiting answer"} apps={ongoingApps} />}
                    {declinedApps.length > 0 && <Table title={"Declined"} apps={declinedApps} />}
                    {noAnswerApps.length > 0 && <Table title={"No Answer"} apps={noAnswerApps} />}
                </>
            )}

            {/* {showAll && applications.length > 0 && <Table title='All' apps={applications} />} */}
        </EditProvider>
    );
}

function ApplicationsHeader({ appState, searchInput }) {
    const [applications, setApps] = appState;
    const [showForm, setShowForm] = useState(false);

    // Todo : Migrate to own component
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
    // Todo : Migrate to own component

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
                <p className='ms-auto italic text-slate-400'>{applications.length} Total Apps</p>

            </div>

            {showForm && AdditionForm}
        </>
    );
}

const Table = ({ title, apps }) => {
    return (
        <div className="mb-8">
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
        </div>
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
const cleanDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
}

const TableRow = ({ app }) => {
    const initialVal = {};
    console.log('app', app);

    for (const key of dataKeys) {
        initialVal[key] = key === "date_applied" ? convertDate(app[key]) : app[key];
    }

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
        <div className='grid grid-cols-4 bg-white'>
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
    );
};

const TableCell = function TableCell({ val, id, type, handleSubmit }) {
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
        setEdit(cellId);
    }, []);

    const cell = useMemo(
        () =>
            editId === cellId ? (
                <EditCell val={val} type={type} submit={submit} cancel={toggleOff} />
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

const EditCell = ({ val, submit, type, cancel }) => {
    const [editVal, setEditVal] = useState(val);
    const [error, setError] = useState("");

    const validations = {
        company: [{ type: "Required" }],
        role: [{ type: "Required" }],
        date_applied: [{ type: "Required" }],
        response: [],
    };

    const runValidationTasks = async (fieldName, value) => {
        let validationResponse = validateField(value, validations[fieldName]);
        console.log('validation res', validationResponse);
        setError(validationResponse);
        return validationResponse;
    };

    const handleSubmit = () => {
        if (editVal === val)
            return;

        submit(editVal);
        // setEditVal(val);
    };
    const handleKeyDown = (e) => {
        console.log('e', e)
        e.code === "Enter" && handleSubmit;
        e.code === "Escape" && cancel();
    };

    const inputComponent = () => {
        switch (type) {
            case "response":
                return (
                    <ResponseInput
                        onChange={handleKeyDown}
                        initialVal={val}
                        error={error}
                        runValidationTasks={runValidationTasks}
                        val={editVal}
                        setVal={setEditVal}
                    />
                );
            case "date_applied":
                return (
                    <DateInput
                        onChange={handleKeyDown}
                        error={error}
                        runValidationTasks={runValidationTasks}
                        val={cleanDate(editVal)}
                        setVal={setEditVal}
                    />
                );
            default:
                return (
                    <TextInput
                        onChange={handleKeyDown}
                        label={type}
                        error={error}
                        runValidationTasks={runValidationTasks}
                        val={editVal}
                        setVal={setEditVal}
                    />
                )
        }
    }

    return (
        <div className='flex justify-between items-center text-left px-3 py-2 truncate border bg-slate-100'>
            {inputComponent()}
            <CheckCircleIcon onClick={handleSubmit} className='h-4 w-4' />
        </div>
    );
};

export default ApplicationTable;
