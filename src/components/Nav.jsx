import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect } from "react";
import { UserCircleIcon } from '@heroicons/react/24/outline'

function Nav() {
    const { authStatus, signOut } = useAuthenticator((context) => [context.user, context.authStatus]);

    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/')
    }

    return (
        <nav className='py-3'>
            <div className='flex justify-end mx-4 gap-4'>
                {/* <input className="rounded-md px-2 border" type="text" placeholder="Search..."/> */}

                {/* <div className='flex gap-4'> */}
                    {authStatus === "authenticated" && (<>
                    <NavLink className="underline py-2 px-3 rounded-md hover:bg-slate-200 flex gap-1" to='/account'>
                        <UserCircleIcon className="h-6 w-6"/>
                        Account
                    </NavLink>
                    </>
                    )}
                    {authStatus === "authenticated" ? (
                        <button  className="underline py-1 px-3 rounded-md hover:bg-slate-200"  onClick={handleSignOut}>Log out</button>
                        ) : (
                            <NavLink to='/login'>Login</NavLink>
                            )}
                {/* </div> */}
            </div>
        </nav>
    );
}

export default Nav;
