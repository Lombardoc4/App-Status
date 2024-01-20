import { useContext } from 'react';

import { EditContext, SetEditContext } from './useEditProvider';

export const useEditContext = () => useContext(EditContext);
export const useSetEditContext = () => useContext(SetEditContext);
