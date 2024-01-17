export const NoApps = ({ showForm }) => {
    <div className='flex h-96 bg-blue-200 text-center align-middle'>
        <p className='mb-2 text-xl text-slate-500'>No Applications</p>
        <button
            className='rounded-md bg-green-400 px-3 py-2'
            onClick={showForm}
        >
            Add Application
        </button>
    </div>;
};
