import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationTable from '../components/ApplicationTable';

import { DashLayout } from './layout';


function Dashboard() {
    const { user, authStatus } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate()

    useEffect(() => {
        if (authStatus === 'unauthenticated') {
            navigate('/login')
        }
    }, [authStatus])



    return (
        <DashLayout>
            {/* <h1 className='text-3xl'>Dashboard de {user?.attributes.name}</h1> */}

            <ApplicationTable />
        </DashLayout>
    );
}

export default Dashboard