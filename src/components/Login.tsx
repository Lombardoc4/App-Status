import { Authenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';

import '@aws-amplify/ui-react/styles.css';

export default function Login() {
    return (
        <Authenticator variation='modal' loginMechanisms={['username']}>
            {({ user }) => (
                <main>
                    {user && <Navigate to='/dashboard' replace={true} />}
                </main>
            )}
        </Authenticator>
    );
}
