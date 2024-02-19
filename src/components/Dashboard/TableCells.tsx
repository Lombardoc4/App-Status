import { CheckCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';

import { DateInput, ResponseInput, TextInput } from './ApplicationInputs';
import { useEditContext, useSetEditContext } from '../../lib/useEditContext';
import { cleanDate, convertResponse } from '../../lib/utils';
// import { validateField } from '../../ui-components/utils.js';
// import { ValidationResponse } from '../../ui-components/ApplicationCreateForm';

interface TableCellProps {
    val: string;
    id: string;
    type: string;
    handleSubmit: (val: string) => void;
}

export const TableCell = function TableCell({
    val,
    id,
    type,
    handleSubmit,
}: TableCellProps) {
    const editId = useEditContext();
    const setEdit = useSetEditContext();

    const cellId = id + val;
    val = type === 'response' ? convertResponse(val) : val;

    const toggleOff = useCallback(() => {
        setEdit('');
    }, [setEdit]);

    const submit = useCallback(
        (val: string) => {
            handleSubmit(val);
            toggleOff();
        },
        [handleSubmit, toggleOff],
    );

    const toggleEdit = useCallback(() => {
        setEdit(cellId);
    }, [setEdit, cellId]);

    const cell = useMemo(
        () =>
            editId === cellId ? (
                <EditCell
                    val={val}
                    type={type}
                    submit={submit}
                    cancel={toggleOff}
                />
            ) : (
                <DefaultCell val={val} type={type} toggleEdit={toggleEdit} />
            ),
        [editId, cellId, val, type, submit, toggleEdit, toggleOff],
    );

    return cell;
};

interface DefaultCellProps {
    val: string;
    type: string;
    toggleEdit: () => void;
}

export const DefaultCell = ({ val, type, toggleEdit }: DefaultCellProps) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            className={classNames(
                'flex items-center justify-between truncate border px-3 py-2 text-left hover:cursor-pointer hover:bg-slate-100',
                { 'col-span-2': type === 'role' },
            )}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onDoubleClick={toggleEdit}
        >
            <div className='w-5/6 truncate' title={val}>
                {val}
            </div>
            {hover && <PencilIcon onClick={toggleEdit} className='size-4' />}
        </div>
    );
};

interface EditCellProps {
    val: string;
    type: string;
    submit: (val: string) => void;
    cancel: () => void;
}

export const EditCell = ({ val, submit, type, cancel }: EditCellProps) => {
    const [editVal, setEditVal] = useState(val);
    const [
        error,
        // setError
    ] = useState({
        hasError: false,
    });

    // const validations = {
    //     company: [{ type: 'Required' }],
    //     role: [{ type: 'Required' }],
    //     date_applied: [{ type: 'Required' }],
    //     response: [],
    // };

    // const runValidationTasks = async (fieldName: string, value: string) => {
    const runValidationTasks = async () => {
        // const validationResponse = validateField(
        //     value,
        //     validations[fieldName as keyof typeof validations],
        // ) as ValidationResponse;
        // setError(validationResponse);
        // return validationResponse;
    };

    const handleSubmit = () => {
        if (editVal === val) {
            cancel();
            return;
        }

        submit(editVal);
        // setEditVal(val);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        e.code === 'Enter' && handleSubmit;
        e.code === 'Escape' && cancel();
    };

    const inputProps = {
        onChange: handleKeyDown,
        initialVal: val,
        runValidationTasks: runValidationTasks,
        error: error,
        setVal: setEditVal,
        val: editVal,
    };

    const inputComponent = () => {
        switch (type) {
            case 'response':
                return <ResponseInput {...inputProps} initialVal={val} />;
            case 'date_applied':
                return <DateInput {...inputProps} val={cleanDate(editVal)} />;
            default:
                return <TextInput {...inputProps} label={type} />;
        }
    };

    return (
        <div className='edit-cell flex items-center justify-between gap-2 border border-blue-600 bg-blue-100 pr-2 text-left'>
            {inputComponent()}
            <CheckCircleIcon onClick={handleSubmit} className='size-8' />
        </div>
    );
};
