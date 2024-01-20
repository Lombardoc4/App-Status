import Nav from './components/Nav';

function App() {
    return (
        <div className='flex min-h-screen flex-col'>
            <Nav />
            <div className='hero flex-1 bg-base-200'>
                <div className='container hero-content flex-col lg:flex-row'>
                    <div className='max-w-md text-center lg:text-left'>
                        <h1 className='text-6xl font-extrabold'>App Status</h1>
                        <p className='py-6'>
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className='card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl'>
                        <form className='card-body'>
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
                                    <a
                                        href='#'
                                        className='link-hover link label-text-alt'
                                    >
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className='form-control mt-6'>
                                <button className='btn btn-primary'>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
