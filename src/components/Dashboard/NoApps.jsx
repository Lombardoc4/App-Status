export const NoApps = ({ showForm }) => {
    <div className='h-96 bg-blue-200 text-center flex align-middle'>
        <p className='text-slate-500 text-xl mb-2'>No Applications</p>
        <button className='py-2 px-3 bg-green-400 rounded-md' onClick={showForm}>
            Add Application
        </button>
    </div>;
};