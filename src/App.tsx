import { useAuthenticator } from '@aws-amplify/ui-react';
import { signIn, type SignInInput } from 'aws-amplify/auth';
import { Link, useNavigate } from 'react-router-dom';

import Nav from './components/Nav';

async function handleSignIn({ username, password }: SignInInput) {
    try {
        const { isSignedIn, nextStep } = await signIn({ username, password });
        return { isSignedIn, nextStep };
    } catch (error) {
        // console.log('error signing in', error);
        throw new Error('Cannot sign-in');
    }
}

const LoginForm = ({
    formSubmit,
}: {
    formSubmit: (e: React.FormEvent) => void;
}) => (
    <div className='card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl'>
        <form className='card-body' onSubmit={formSubmit}>
            <div className='form-control'>
                <label className='label'>
                    <span className='label-text'>Email</span>
                </label>
                <input
                    type='email'
                    placeholder='email'
                    className='input input-bordered'
                    required
                />
            </div>
            <div className='form-control'>
                <label className='label'>
                    <span className='label-text'>Password</span>
                </label>
                <input
                    type='password'
                    placeholder='password'
                    className='input input-bordered'
                    required
                />
                <label className='label'>
                    <a href='#' className='link-hover link label-text-alt'>
                        Forgot password?
                    </a>
                </label>
            </div>
            <div className='form-control mt-6'>
                <button className='btn btn-primary'>Login</button>
            </div>
            <div className='form-control mt-2'>
                <Link to='/login' className='text-center text-sm underline'>
                    Sign Up
                </Link>
            </div>
        </form>
    </div>
);

function App() {
    const { authStatus } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate();

    const formSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // !!!!!!!!!!!!
        const testCred = {
            username: 'lom13@pm.me',
            password: '@Tester123',
        };

        // https://docs.amplify.aws/react/build-a-backend/auth/enable-sign-up/#sign-in
        handleSignIn(testCred).then(({ isSignedIn, nextStep }) => {
            if (nextStep.signInStep === 'DONE' && isSignedIn) {
                navigate('/dashboard');
            }
            // else if (nextStep.signInStep === 'RESET_PASSWORD') {
            //     navigate('/dashboard');
            // }
            // else if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
            //     navigate('/dashboard');
            // }
            // else if (
            //     nextStep.signInStep ===
            //     'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED'
            // ) {
            //     confirmSignIn;
            // }
        });
    };

    return (
        <div className='flex min-h-screen flex-col'>
            {authStatus === 'authenticated' && <Nav />}
            <div className='hero flex-1 bg-base-200'>
                <div className='container hero-content flex-col lg:flex-row'>
                    <div className='max-w-md text-center lg:text-left'>
                        <h1 className='text-6xl font-extrabold'>App Status</h1>
                        <p className='py-6'>
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>

                        {authStatus === 'authenticated' && (
                            <Link
                                to='/dashboard'
                                className='btn btn-primary mx-auto'
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>
                    {authStatus === 'unauthenticated' && (
                        <LoginForm formSubmit={formSubmit} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
