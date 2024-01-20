import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ApplicationTable from '../components/Dashboard';

function Dashboard() {
    const { authStatus } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate();

    useEffect(() => {
        if (authStatus === 'unauthenticated') {
            navigate('/login');
        }
    }, [authStatus, navigate]);

    return <ApplicationTable />;
}

export default Dashboard;
