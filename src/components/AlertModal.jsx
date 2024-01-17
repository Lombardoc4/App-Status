import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useAlertContext } from '../lib/useAlertContext';

export const AlertModal = () => {
    const { alert, updateAlert } = useAlertContext();

    const modalClasses = classNames(
        'px-6 py-4 shadow-md rounded-md',
        { 'bg-green-400 shadow-green-400': alert.type === 'success' },
        { 'bg-red-400 shadow-red-400': alert.type === 'error' },
        { 'bg-white shadow-blue-400': alert.type === 'bulk' },
    );

    const handleClick = () => {
        alert.type !== 'default' && updateAlert();
    };

    if (!alert.type) return <></>;

    return (
        <div className='relative flex flex-col items-center'>
            <div className='fixed bottom-8'>
                <div className={modalClasses}>
                    <div
                        onClick={handleClick}
                        className='flex items-center gap-2'
                    >
                        {alert.type === 'success' && (
                            <>
                                <CheckIcon className='h-6 w-6' />
                                {alert.msg}
                            </>
                        )}

                        {alert.type === 'error' && (
                            <>
                                <ExclamationCircleIcon className='h-6 w-6' />
                                {alert.msg}
                            </>
                        )}

                        {alert.type === 'bulk' && <>{alert.msg}</>}
                    </div>
                </div>
            </div>
        </div>
    );
};
