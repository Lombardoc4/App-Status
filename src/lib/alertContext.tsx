import { useContext } from 'react';

import { AlertContext } from './useAlertProvider';

export const useAlertContext = () => useContext(AlertContext);
