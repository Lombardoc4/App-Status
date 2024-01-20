import { createContext, useState } from 'react';

export const EditContext = createContext<string>('');
export const SetEditContext = createContext<(val: string) => void>(
    () => undefined,
);

export const EditProvider = ({ children }: { children: React.ReactNode }) => {
    const [editId, setEditId] = useState('');

    const handleEdit = (val: string) => {
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
