import { createContext, useContext, useState } from 'react';

const EditContext = createContext(undefined);
const SetEditContext = createContext(undefined);

export const EditProvider = ({ children }) => {
    const [editId, setEditId] = useState('');

    const handleEdit = (val) => {
        setEditId(val);
    };

    return (
        <EditContext.Provider value={editId}>
            <SetEditContext.Provider value={handleEdit}>
                {children}
            </SetEditContext.Provider>
        </EditContext.Provider>
    );
};

export const useEditContext = () => useContext(EditContext);
export const useSetEditContext = () => useContext(SetEditContext);
