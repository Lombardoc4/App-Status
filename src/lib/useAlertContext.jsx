import { createContext, useContext, useRef, useState } from 'react';

const initialAlert = {
    type: '',
    msg: '',
};

const AlertContext = createContext(undefined);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(initialAlert);
    const alertTimer = useRef();

    const clearAlert = () => {
        setAlert(initialAlert);
        alertTimer.current && clearTimeout(alertTimer);
    };

    const updateAlert = (alert) => {
        clearAlert();

        if (alert) {
            setAlert(alert);
            if (alert.type !== 'bulk') {
                alertTimer.current = setTimeout(() => {
                    clearAlert();
                }, 5000);
            }
        }
    };

    return (
        <AlertContext.Provider value={{ alert, updateAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlertContext = () => useContext(AlertContext);
