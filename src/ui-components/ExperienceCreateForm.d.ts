/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ExperienceCreateFormInputValues = {
    company?: string;
    role?: string;
    start_date?: string;
    end_date?: string;
    description?: string[];
    resumeEmploymentId?: string;
    resumeProjectsId?: string;
};
export declare type ExperienceCreateFormValidationValues = {
    company?: ValidationFunction<string>;
    role?: ValidationFunction<string>;
    start_date?: ValidationFunction<string>;
    end_date?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    resumeEmploymentId?: ValidationFunction<string>;
    resumeProjectsId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ExperienceCreateFormOverridesProps = {
    ExperienceCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    company?: PrimitiveOverrideProps<TextFieldProps>;
    role?: PrimitiveOverrideProps<TextFieldProps>;
    start_date?: PrimitiveOverrideProps<TextFieldProps>;
    end_date?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    resumeEmploymentId?: PrimitiveOverrideProps<AutocompleteProps>;
    resumeProjectsId?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type ExperienceCreateFormProps = React.PropsWithChildren<{
    overrides?: ExperienceCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ExperienceCreateFormInputValues) => ExperienceCreateFormInputValues;
    onSuccess?: (fields: ExperienceCreateFormInputValues) => void;
    onError?: (fields: ExperienceCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ExperienceCreateFormInputValues) => ExperienceCreateFormInputValues;
    onValidate?: ExperienceCreateFormValidationValues;
} & React.CSSProperties>;
export default function ExperienceCreateForm(props: ExperienceCreateFormProps): React.ReactElement;
