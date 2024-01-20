import { ValidationResponse } from './ApplicationCreateForm';

export default function validateField(
    value: string,
    validations: { type: string; validationMessage: string }[],
): ValidationResponse;
