import { useAuthenticator } from '@aws-amplify/ui-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

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
        <div className='navbar bg-base-100'>
            <div className='navbar-start'>
                <Link to='/' className='btn btn-ghost text-xl'>
                    App Status
                </Link>
            </div>
            <div className='navbar-end'>
                <div className='dropdown dropdown-end'>
                    <div
                        tabIndex={0}
                        role='button'
                        className='btn btn-ghost sm:hidden'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M4 6h16M4 12h8m-8 6h16'
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className='menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow'
                    >
                        <li>
                            <NavLink to='/dashboard'>Dashboard</NavLink>
                        </li>
                    </ul>
                </div>
                <ul className='menu menu-horizontal hidden px-1 sm:flex'>
                    {authStatus === 'authenticated' ? (
                        <li>
                            <NavLink to='/dashboard'>Dashboard</NavLink>
                        </li>
                    ) : (
                        <li>
                            <NavLink to='/login'>Login</NavLink>
                        </li>
                    )}
                </ul>
                {authStatus === 'authenticated' && (
                    <div className='dropdown dropdown-end hidden sm:inline-block'>
                        <div
                            tabIndex={0}
                            role='button'
                            className='avatar btn btn-circle btn-ghost'
                        >
                            <div className='w-10 rounded-full'>
                                <img
                                    alt='Tailwind CSS Navbar component'
                                    src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className='menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow'
                        >
                            <li>
                                <Link to='/account' className='justify-between'>
                                    Profile
                                    <span className='badge'>New</span>
                                </Link>
                            </li>
                            <li>
                                <a onClick={handleSignOut}>Logout</a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Nav;
