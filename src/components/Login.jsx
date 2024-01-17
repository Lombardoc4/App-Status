import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Navigate } from 'react-router-dom';

export default function Login() {
    return (
        <Authenticator variation='modal' signUpAttributes={['username']}>
            {({ user }) => (
                <main>
                    {user && <Navigate to='/dashboard' replace={true} />}
                </main>
            )}
        </Authenticator>
    );
}
