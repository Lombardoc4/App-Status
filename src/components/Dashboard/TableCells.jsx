import { useState, useCallback, useMemo } from 'react';
import { CheckCircleIcon, PencilIcon } from '@heroicons/react/24/outline';

import { validateField } from '../../ui-components/utils';
import { useEditContext, useSetEditContext } from '../../lib/useEditContext';
import { DateInput, ResponseInput, TextInput } from './ApplicationInputs';
import { cleanDate, convertResponse } from '../../lib/utils';
import classNames from 'classnames';

export const TableCell = function TableCell({ val, id, type, handleSubmit }) {
    const editId = useEditContext();
    const setEdit = useSetEditContext();

    const cellId = id + val;
    val = type === 'response' ? convertResponse(val) : val;

    const toggleOff = useCallback(() => {
        setEdit('');
    }, []);

    const submit = useCallback((val) => {
        handleSubmit(val);
        toggleOff();
    }, []);

    const toggleEdit = useCallback(() => {
        setEdit(cellId);
    }, []);

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
        [editId === cellId],
    );

    return cell;
};

export const DefaultCell = ({ val, type, toggleEdit }) => {
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
            {hover && <PencilIcon onClick={toggleEdit} className='h-4 w-4' />}
        </div>
    );
};

export const EditCell = ({ val, submit, type, cancel }) => {
    const [editVal, setEditVal] = useState(val);
    const [error, setError] = useState('');

    const validations = {
        company: [{ type: 'Required' }],
        role: [{ type: 'Required' }],
        date_applied: [{ type: 'Required' }],
        response: [],
    };

    const runValidationTasks = async (fieldName, value) => {
        let validationResponse = validateField(value, validations[fieldName]);
        setError(validationResponse);
        return validationResponse;
    };

    const handleSubmit = () => {
        if (editVal === val) {
            cancel();
            return;
        }

        submit(editVal);
        // setEditVal(val);
    };

    const handleKeyDown = (e) => {
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
            <CheckCircleIcon onClick={handleSubmit} className='h-8 w-8' />
        </div>
    );
};
