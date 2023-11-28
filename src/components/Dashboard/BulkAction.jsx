import { TrashIcon } from "@heroicons/react/24/outline"


export const BulkAction = ({selectedApps, deselectApps, deleteApps}) => {
    return (
            <>
                <p className='my-auto italic text-slate-400'>{selectedApps.length} Selected</p>
                <button
                    onClick={deselectApps}
                    className='py-2 px-3 rounded-md flex items-center gap-1 bg-slate-200'
                >
                    Deselect
                </button>
                <button
                    onClick={deleteApps}
                    className='py-2 px-3 rounded-md flex items-center gap-1 bg-red-600 text-white'
                >
                    Remove <TrashIcon className='h-5 w-5' />
                </button>
            </>
    )
}