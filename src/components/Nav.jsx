import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

function Nav() {
    const { authStatus, signOut } = useAuthenticator((context) => [
        context.user,
        context.authStatus,
    ]);

    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    return (
        <nav className='py-3'>
            <div className='mx-4 flex justify-end gap-4'>
                {/* <input className="rounded-md px-2 border" type="text" placeholder="Search..."/> */}

                {/* <div className='flex gap-4'> */}
                {authStatus === 'authenticated' && (
                    <>
                        <NavLink
                            className='flex gap-1 rounded-md px-3 py-2 underline hover:bg-slate-200'
                            to='/account'
                        >
                            <UserCircleIcon className='h-6 w-6' />
                            Account
                        </NavLink>
                    </>
                )}
                {authStatus === 'authenticated' ? (
                    <button
                        className='rounded-md px-3 py-1 underline hover:bg-slate-200'
                        onClick={handleSignOut}
                    >
                        Log out
                    </button>
                ) : (
                    <NavLink to='/login'>Login</NavLink>
                )}
                {/* </div> */}
            </div>
        </nav>
    );
}

export default Nav;
