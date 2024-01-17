import { generateClient } from 'aws-amplify/api';

import { deleteApplication, updateApplication } from '../graphql/mutations';
import { listApplications } from '../graphql/queries';
import {
    onCreateApplication,
    onDeleteApplication,
    onUpdateApplication,
} from '../graphql/subscriptions';

const client = generateClient();

const responseOptions = {
    WAITING: 'Waiting',
    DECLINED: 'Declined',
    NO_ANSWER: 'No response',
    ACCEPTED: 'Accepted!',
};

export const convertDate = (date) => {
    return new Date(date.replace(/-/g, '/')).toDateString();
};
export const cleanDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
};

export const convertResponse = (response) => {
    let newVal = response;

    Object.entries(responseOptions).map(([key, val]) => {
        if (response === key) newVal = val;
        else if (response === val) newVal = key;
    });

    return newVal;
};

export const getApplications = async () => {
    // List all items
    const { data } = await client.graphql({
        query: listApplications,
    });

    return data.listApplications.items;
};

export const updateApp = async (values) => {
    // Todo: try catch to return error
    const { data } = await client.graphql({
        query: updateApplication,
        variables: { input: values },
    });

    return data.updateApplication;
};

export const deleteApp = async (id) => {
    const { data } = await client.graphql({
        query: deleteApplication,
        variables: {
            input: {
                id: id,
            },
        },
    });
    return data.deleteApplication;
};

export const subCreation = (cb) => {
    const subCreateApp = client
        .graphql({ query: onCreateApplication })
        .subscribe({
            next: ({ data }) => {
                cb(data.onCreateApplication);
            },
            error: (error) => error,
        });

    return subCreateApp;
};

export const subUpdate = (cb) => {
    const subUpdateApp = client
        .graphql({ query: onUpdateApplication })
        .subscribe({
            next: ({ data }) => {
                cb(data.onUpdateApplication);
            },
            error: (error) => error,
        });

    return subUpdateApp;
};

export const subDelete = (cb) => {
    const subDeleteApp = client
        .graphql({ query: onDeleteApplication })
        .subscribe({
            next: ({ data }) => {
                cb(data.onDeleteApplication);
            },
            error: (error) => error,
        });

    return subDeleteApp;
};
