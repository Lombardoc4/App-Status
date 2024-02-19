import { signOut } from 'aws-amplify/auth';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

function Nav() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignOut = () => {
        signOut().then(() => {
            if (location.pathname === '/') navigate(0);
            else navigate('/');
        });
    };
    return (
        <nav className='navbar col-span-5 bg-base-300'>
            <div className='navbar-start'>
                <Link to='/' className='btn btn-ghost text-xl'>
                    App Status
                </Link>
            </div>
            <div className='navbar-end'>
                <ul tabIndex={0} className='menu menu-horizontal'>
                    <li>
                        <NavLink to='/dashboard'>Dashboard</NavLink>
                    </li>
                </ul>
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
            </div>
        </nav>
    );
}

export default Nav;
