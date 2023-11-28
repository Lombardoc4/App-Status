/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Education } from "../API.ts";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EducationUpdateFormInputValues = {
    school?: string;
    tier?: string;
    completion?: string;
    resumeEducationId?: string;
};
export declare type EducationUpdateFormValidationValues = {
    school?: ValidationFunction<string>;
    tier?: ValidationFunction<string>;
    completion?: ValidationFunction<string>;
    resumeEducationId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EducationUpdateFormOverridesProps = {
    EducationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    school?: PrimitiveOverrideProps<TextFieldProps>;
    tier?: PrimitiveOverrideProps<SelectFieldProps>;
    completion?: PrimitiveOverrideProps<TextFieldProps>;
    resumeEducationId?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type EducationUpdateFormProps = React.PropsWithChildren<{
    overrides?: EducationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    education?: Education;
    onSubmit?: (fields: EducationUpdateFormInputValues) => EducationUpdateFormInputValues;
    onSuccess?: (fields: EducationUpdateFormInputValues) => void;
    onError?: (fields: EducationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EducationUpdateFormInputValues) => EducationUpdateFormInputValues;
    onValidate?: EducationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EducationUpdateForm(props: EducationUpdateFormProps): React.ReactElement;
