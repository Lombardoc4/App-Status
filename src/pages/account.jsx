import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashLayout } from './layout';
// import { Auth } from 'aws-amplify';
// import { getCurrentUser } from 'aws-amplify/auth';
import { updateUserAttribute, fetchUserAttributes } from 'aws-amplify/auth';

async function handleUpdateUserAttribute(attributeKey, value) {
    try {
        const output = await updateUserAttribute({
            userAttribute: {
                attributeKey,
                value,
            },
        });
        console.log(`attribute was successfully updated.`, output);
        return;
    } catch (error) {
        console.log(error);
    }
}

async function handleFetchUserAttributes() {
    try {
        const userAttributes = await fetchUserAttributes();
        console.log(userAttributes);
        return userAttributes;
    } catch (error) {
        console.log(error);
    }
}

function Account() {
    const { user, authStatus } = useAuthenticator((context) => [context.user]);

    console.log('authStatus', authStatus, user);
    const navigate = useNavigate();

    const [nameEdit, setNameEdit] = useState(false);
    const [attributes, setAttributes] = useState({});
    const nameInput = useRef(null);

    const handleEdit = () => {
        const newName = nameInput.current.value;
        handleUpdateUserAttribute('name', newName).then(() => {
            handleFetchUserAttributes().then((attrs) => setAttributes(attrs));
        });
        setNameEdit(false);
    };

    useEffect(() => {
        if (authStatus === 'unauthenticated') {
            navigate('/login');
        }

        handleFetchUserAttributes().then((attrs) => setAttributes(attrs));
    }, [authStatus]);

    console.log(authStatus !== 'unauthenticated' && !user);

    if (authStatus === 'unauthenticated' && !user) {
        return (
            <div className='mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4 shadow'>
                <div className='flex animate-pulse space-x-4'>
                    <div className='h-10 w-10 rounded-full bg-slate-700'></div>
                    <div className='flex-1 space-y-6 py-1'>
                        <div className='h-2 rounded bg-slate-700'></div>
                        <div className='space-y-3'>
                            <div className='grid grid-cols-3 gap-4'>
                                <div className='col-span-2 h-2 rounded bg-slate-700'></div>
                                <div className='col-span-1 h-2 rounded bg-slate-700'></div>
                            </div>
                            <div className='h-2 rounded bg-slate-700'></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <DashLayout>
            {attributes && (
                <>
                    <h1 className='text-3xl'>Welcome {attributes.name}</h1>
                    <div className='my-8 flex flex-col gap-4'>
                        <div>
                            <h2 className='text-xl font-bold'>Username</h2>
                            {nameEdit && (
                                <div className='flex w-96 gap-4'>
                                    <input
                                        className='amplify-input'
                                        style={{ padding: '0.25rem 0.5rem' }}
                                        type='text'
                                        ref={nameInput}
                                        autoFocus
                                        defaultValue={attributes.name}
                                    />
                                    <div className='mx-2 flex justify-end gap-2'>
                                        <button
                                            className='rounded-md bg-slate-200 px-3 py-2'
                                            onClick={() => setNameEdit(false)}
                                        >
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
                                        <button
                                            className='rounded-md bg-green-600 px-3 py-2 text-white'
                                            onClick={() => handleEdit()}
                                        >
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
                                </div>
                            )}
                            {!nameEdit && (
                                <div className='flex w-96 gap-4'>
                                    <p className='w-full py-1'>
                                        {attributes.name || '----'}
                                    </p>
                                    <button
                                        className='rounded-md bg-slate-200 px-3 py-2'
                                        onClick={() => setNameEdit(true)}
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
                                </div>
                            )}
                        </div>

                        <div>
                            <h2 className='text-xl font-bold'>Email</h2>
                            <p className='w-full py-1'>
                                {attributes.email || '----'}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2>Devices</h2>
                        <p>Table of devices</p>
                    </div>
                </>
            )}
        </DashLayout>
    );
}

export default Account;
