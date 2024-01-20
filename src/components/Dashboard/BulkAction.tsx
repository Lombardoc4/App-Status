import { TrashIcon } from '@heroicons/react/24/outline';

interface BulkActionProps {
    selectedApps: number;
    deselectApps: () => void;
    deleteApps: () => void;
}

export const BulkAction = ({
    selectedApps,
    deselectApps,
    deleteApps,
}: BulkActionProps) => {
    return (
        <>
            <p className='my-auto italic text-slate-400'>
                {selectedApps} Selected
            </p>
            <button
                onClick={deselectApps}
                className='flex items-center gap-1 rounded-md bg-slate-200 px-3 py-2'
            >
                Deselect
            </button>
            <button
                onClick={deleteApps}
                className='flex items-center gap-1 rounded-md bg-red-600 px-3 py-2 text-white'
            >
                Remove <TrashIcon className='h-5 w-5' />
            </button>
        </>
    );
};
