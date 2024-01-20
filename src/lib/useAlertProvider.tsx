import { createContext, useRef, useState } from 'react';

interface Alert {
    type: string;
    msg: React.ReactNode;
}

const initialAlert = {
    type: '',
    msg: '',
};

interface Context {
    alert: Alert;
    updateAlert: (alert?: Alert) => void;
}

export const AlertContext = createContext<Context>({
    alert: initialAlert,
    updateAlert: () => undefined,
});

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [alert, setAlert] = useState<Alert>(initialAlert);
    const alertTimer = useRef<NodeJS.Timeout | null>(null);

    const clearAlert = () => {
        setAlert(initialAlert);

        if (alertTimer.current) {
            clearTimeout(alertTimer.current);
        }
    };

    const updateAlert = (alert?: Alert) => {
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
