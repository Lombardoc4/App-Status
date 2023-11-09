import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect } from "react";


function Nav() {
    const { authStatus, signOut } = useAuthenticator((context) => [context.user, context.authStatus]);

    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/')
    }

    return (
        <nav className='py-3 bg-slate-300'>
            <div className='flex justify-between mx-4'>
                <Link className="border py-1 px-3 rounded-xl bg-blue-600 text-white shadow-inner " to='/'>RR</Link>
                <div className='flex gap-4'>
                    {authStatus === "authenticated" && <NavLink className="border py-1 px-3 rounded-md bg-blue-600 text-white shadow-inner " to='/dashboard'>Dashboard</NavLink>}
                    {authStatus === "authenticated" ? (
                        <button  className="border py-1 px-3 rounded-full bg-red-400 text-white shadow-inner"  onClick={handleSignOut}>Sign out</button>
                    ) : (
                        <NavLink to='/login'>Login</NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Nav;