import { TextField, SelectField, useAuthenticator } from "@aws-amplify/ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { listApplications } from "../graphql/queries";
import { useEffect, useMemo, useState } from "react";
import ApplicationCreateForm from "./ApplicationCreateForm";
import { deleteApplication, updateApplication } from "../graphql/mutations";
import { validateField, fetchByPath } from "../ui-components/utils";
import { onCreateApplication, onDeleteApplication, onUpdateApplication } from "../graphql/subscriptions";

const getApplications = async () => {
    // List all items
    const allApplications = await API.graphql({
        query: listApplications
    });
    return allApplications;
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


function ApplicationTable() {
    const [showForm, setShowForm] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [applications, setApplications] = useState([]);
    const acceptedApps = useMemo(() => applications.filter(app => app.response === 'ACCEPTED'), [applications])
    const ongoingApps = useMemo(() => applications.filter(app => app.response === 'UNANSWERED'), [applications])
    const declinedApps = useMemo(() => applications.filter(app => app.response === 'DECLINED'), [applications])

    useEffect(() => {
        const subCreateApp =  API.graphql(
            graphqlOperation(onCreateApplication)
          ).subscribe({
            next: ({ value }) => {
                const newApp = value.data.onCreateApplication;
                setApplications(apps => [newApp, ...apps]);
            },
            error: (error) => console.warn(error)
          });
        const subUpdateApp = API.graphql(
            graphqlOperation(onUpdateApplication)
          ).subscribe({
            next: ({ value }) => {
                const updatedApp = value.data.onUpdateApplication;
                setApplications(apps => apps.map(app => (app.id !== updatedApp.id ? app : updatedApp)));
            },
            error: (error) => console.warn(error)
          });
        const subDeleteApp = API.graphql(
                graphqlOperation(onDeleteApplication)
              ).subscribe({
                next: ({ value }) => {

                    const deletedApp = value.data.onDeleteApplication;
                    setApplications(apps => apps.filter(app => app.id !== deletedApp.id));
                },
                error: (error) => console.warn(error)
            });

            getApplications().then((res) => {
                if (res.data && res.data.listApplications) {
                    setApplications(res.data.listApplications.items);
                } else {
                    // TODO : ERROR HANDLING
                    console.log("res0", res);
                }
            });

        return () => {
            subCreateApp.unsubscribe();
            subUpdateApp.unsubscribe();
            subDeleteApp.unsubscribe();
        }

    }, []);

    const handleAddition = () => {
        setShowForm(false);

        // TODO : TURN INTO SUBSCRIPTION
        getApplications(user.username).then((res) => {
            if (res.data && res.data.listApplications) {
                setApplications(res.data.listApplications.items);
            } else {
                console.log("res0", res);
            }
        });
    };

    return (
        <>
            <div className="flex gap-4 items-center mt-8 mb-4">

            <button
                className='py-2 px-3 bg-green-400 rounded-md shadow'
                onClick={() => setShowForm(true)}
                >
                Add Application
            </button>
            <button
                className='py-2 px-3 bg-slate-200 rounded-md shadow'
                onClick={() => setShowAll(!showAll)}
                >
                View All
            </button>

            <p className="ms-auto italic text-slate-400">{applications.length} Total Apps</p>
            </div>

            {showForm && (
                <div className='my-8 rounded-md bg-slate-100 w-96 shadow-lg'>
                    <ApplicationCreateForm
                        onSuccess={handleAddition}
                        onCancel={() => setShowForm(false)}
                        onError={(error) => {
                            console.log("error", error);
                        }}
                    />
                </div>
            )}
            <div className='border-slate-200 border-2 bg-slate-100 shadow-lg rounded-xl overflow-auto'>
                <div className='overflow-hidden my-4'>
                    {/* <div>Dropdown with bulk action?</div> */}
                    <table className='border-collapse table-auto w-full'>
                        <thead>
                            <tr>
                                <th className='text-left border-b px-3 py-4 pb-3 pt-0'>Role</th>
                                <th className='text-left border-b px-3 py-4 pb-3 pt-0'>Company</th>
                                <th className='text-left border-b px-3 py-4 pb-3 pt-0'>Response</th>
                                <th className='text-left border-b px-3 py-4 pb-3 pt-0'>Date Applied</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='bg-white shadow-inner'>
                            {applications.length <= 0 && (
                                <tr>
                                    <td colSpan={5} className='h-96 bg-blue-100 text-center'>
                                            <p className='text-slate-500 text-xl mb-2'>No Applications</p>
                                            <button
                                                className='py-2 px-3 bg-green-400 rounded-md'
                                                onClick={() => setShowForm(true)}
                                            >
                                                Add Application
                                            </button>
                                    </td>
                                </tr>
                            )}
                            {!showAll && <>

                            {acceptedApps.length > 0 && <>
                                <ApplicationHeaderRow value={'Moving Forward'}/>

                                {acceptedApps.map((app) =>  <ApplicationRow key={`${app.role} - ${app.company}`} application={app} />)}
                            </>}
                            {ongoingApps.length > 0 && <>
                                <ApplicationHeaderRow value={'Unanswered'}/>
                                {ongoingApps.map((app) =>  <ApplicationRow key={`${app.role} - ${app.company}`} application={app} />)}
                            </>}
                            {declinedApps.length > 0 && <>
                                <ApplicationHeaderRow value={'Declined'}/>
                                {declinedApps.map((app) =>  <ApplicationRow key={`${app.role} - ${app.company}`} application={app} />)}
                            </>}
                            </>}


                            {showAll && applications.length > 0 && applications.map((app) => <ApplicationRow application={app} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

const responseIcon = (response) => {
    switch (response) {
        case 'ACCEPTED':
            return '✅';
        case 'UNANSWERED':
            return '⏰';
        case 'DECLINE':
            return '❌';
    }
}

function ApplicationHeaderRow({value}) {
    return (
        <tr>
            <td colSpan={5} className='bg-blue-200 p-2 text-sm font-mono'>
                <h3 className='font-bold uppercase'>{value}</h3>
            </td>
        </tr>
    );
}

function ApplicationRow({ application }) {
    const [edit, setEdit] = useState(false);

    if (edit) {
        return <ApplicationEdit application={application} cancel={() => setEdit(false)}
        onSuccess={() => setEdit(false)}
        />;
    }

    return (
        <tr>
            <td className='border-b border-slate-100 px-3 py-4 text-slate-500'>{application.role}</td>
            <td className='border-b border-slate-100 px-3 py-4 text-slate-500'>{application.company}</td>
            <td className='border-b border-slate-100 px-3 py-4 text-slate-500 text-center'>{responseIcon(application.response)}</td>
            <td className='border-b border-slate-100 px-3 py-4 text-slate-500'>{new Date(application.date_applied.replace(/-/g, '\/')).toDateString()}</td>
            <td className='border-b border-slate-100 px-3 py-4 text-slate-500'>
                <div className="flex gap-2 mx-2 justify-end">
                <button
                    className='bg-slate-200 py-2 px-3 rounded-md'
                    onClick={() => setEdit(true)}
                    // onClick={() => handleDelete(app.id)}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        viewBox='0 0 16 16'
                    >
                        <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
                    </svg>
                </button>
                <button
                    className='bg-red-400 text-white py-2 px-3 rounded-md'
                    onClick={() => deletedApplication(application.id)}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        viewBox='0 0 16 16'
                    >
                        <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
                        <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
                    </svg>
                </button>
                </div>
            </td>
        </tr>
    );
}



function ApplicationEdit({application, cancel, onSuccess}) {

    const [company, setCompany] = useState(application.company);
    const [role, setRole] = useState(application.role);
    const [date_applied, setDate_applied] = useState(application.date_applied);
    const [response, setResponse] = useState(application.response);
    const [errors, setErrors] = useState({});
    const resetStateValues = () => {
        const cleanValues = application;
        setCompany(cleanValues.company);
        setRole(cleanValues.role);
        setDate_applied(cleanValues.date_applied);
        setResponse(cleanValues.response);
        setErrors({});
    };

    useEffect(resetStateValues, [application]);
    const validations = {
        company: [{ type: "Required" }],
        role: [{ type: "Required" }],
        date_applied: [{ type: "Required" }],
        response: [],
    };

    const runValidationTasks = async (fieldName, currentValue, getDisplayValue) => {
        const value = currentValue && getDisplayValue ? getDisplayValue(currentValue) : currentValue;
        let validationResponse = validateField(value, validations[fieldName]);
        // const customValidator = fetchByPath(onValidate, fieldName);
        // if (customValidator) {
            // validationResponse = await customValidator(value, validationResponse);
        // }
        setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
        return validationResponse;
    };

    const handleSubmit = async () => {
            // event.preventDefault();
            let modelFields = {
              company,
              role,
              date_applied,
              response: response ?? null,
            };
            const validationResponses = await Promise.all(
              Object.keys(validations).reduce((promises, fieldName) => {
                if (Array.isArray(modelFields[fieldName])) {
                  promises.push(
                    ...modelFields[fieldName].map((item) =>
                      runValidationTasks(fieldName, item)
                    )
                  );
                  return promises;
                }
                promises.push(
                  runValidationTasks(fieldName, modelFields[fieldName])
                );
                return promises;
              }, [])
            );
            if (validationResponses.some((r) => r.hasError)) {
              return;
            }
            // if (onSubmit) {
            //   modelFields = onSubmit(modelFields);
            // }
            try {
              Object.entries(modelFields).forEach(([key, value]) => {
                if (typeof value === "string" && value === "") {
                  modelFields[key] = null;
                }
              });
              await API.graphql({
                query: updateApplication,
                variables: {
                  input: {
                    id: application.id,
                    ...modelFields,
                  },
                },
              });
              if (onSuccess) {
                onSuccess(modelFields);
              }
            } catch (err) {
                console.log('errs', err)
            //   if (onError) {
                // const messages = err.errors.map((e) => e.message).join("\n");
                // onError(modelFields, messages);
            //   }
            }
    }

    return (
        <>
            <tr>
                <td className='border-b border-slate-100 px-3 py-4 text-slate-500'>
                    <TextField
                        inputStyles={{ padding: "0.25rem 0.5rem" }}
                        label='Role'
                        labelHidden={true}
                        isRequired={true}
                        isReadOnly={false}
                        value={role}
                        onChange={(e) => {
                            let { value } = e.target;
                            if (errors.role?.hasError) {
                                runValidationTasks("role", value);
                            }
                            setRole(value);
                        }}
                        onBlur={() => runValidationTasks("role", role)}
                        errorMessage={errors.role?.errorMessage}
                        hasError={errors.role?.hasError}
                    ></TextField>
                </td>
                <td className='border-b border-slate-100 px-3 py-4 text-slate-500'>
                    <TextField
                        inputStyles={{ padding: "0.25rem 0.5rem" }}
                        label='Company'
                        labelHidden={true}
                        isRequired={true}
                        isReadOnly={false}
                        value={company}
                        onChange={(e) => {
                            let { value } = e.target;

                            if (errors.company?.hasError) {
                                runValidationTasks("company", value);
                            }
                            setCompany(value);
                        }}
                        onBlur={() => runValidationTasks("company", company)}
                        errorMessage={errors.company?.errorMessage}
                        hasError={errors.company?.hasError}
                    ></TextField>
                </td>
                <td className='border-b border-slate-100 px-3 py-4 text-slate-500'>
                    <SelectField
                        inputStyles={{ padding: "0.25rem 0.5rem" }}
                        label='Response'
                        // placeholder='Please select an option'
                        labelHidden={true}
                        isDisabled={false}
                        value={response}
                        onChange={(e) => {
                            let { value } = e.target;
                            if (errors.response?.hasError) {
                                runValidationTasks("response", value);
                            }
                            setResponse(value);
                        }}
                        onBlur={() => runValidationTasks("response", response)}
                        errorMessage={errors.response?.errorMessage}
                        hasError={errors.response?.hasError}
                    >
                        <option children='💤' value='UNANSWERED'></option>
                        <option children='❌' value='DECLINED'></option>
                        <option children='✅' value='ACCEPTED'></option>
                    </SelectField>
                </td>
                <td className='border-b border-slate-100 px-3 py-4 text-slate-500'>
                    <TextField
                        inputStyles={{ padding: "0.25rem 0.5rem" }}
                        label='Date applied'
                        labelHidden={true}
                        isRequired={true}
                        isReadOnly={false}
                        type='date'
                        value={date_applied}
                        defaultValue={date_applied}
                        onChange={(e) => {
                            let { value } = e.target;

                            if (errors.date_applied?.hasError) {
                                runValidationTasks("date_applied", value);
                            }
                            setDate_applied(value);
                        }}
                        onBlur={() => runValidationTasks("date_applied", date_applied)}
                        errorMessage={errors.date_applied?.errorMessage}
                        hasError={errors.date_applied?.hasError}
                    ></TextField>
                </td>

                <td className='border-b border-slate-100 px-3 py-4 text-slate-500'>
                    <div className='flex gap-2 mx-2 justify-end'>
                        <button className='py-2 px-3 bg-slate-200 rounded-md' onClick={() => cancel()}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                viewBox='0 0 16 16'
                            >
                                <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                                <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                            </svg>
                        </button>
                        <button className='py-2 px-3 bg-green-600 text-white rounded-md' onClick={() => handleSubmit()}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                viewBox='0 0 16 16'
                            >
                                <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                                <path d='M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z' />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
            <tr></tr>
        </>
    );
}

export default ApplicationTable;
