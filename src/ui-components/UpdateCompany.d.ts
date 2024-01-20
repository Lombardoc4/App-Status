/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Application } from "../API.ts";
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
export declare type UpdateCompanyInputValues = {
    company?: string;
};
export declare type UpdateCompanyValidationValues = {
    company?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UpdateCompanyOverridesProps = {
    UpdateCompanyGrid?: PrimitiveOverrideProps<GridProps>;
    company?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UpdateCompanyProps = React.PropsWithChildren<{
    overrides?: UpdateCompanyOverridesProps | undefined | null;
} & {
    id?: string;
    application?: Application;
    onSubmit?: (fields: UpdateCompanyInputValues) => UpdateCompanyInputValues;
    onSuccess?: (fields: UpdateCompanyInputValues) => void;
    onError?: (fields: UpdateCompanyInputValues, errorMessage: string) => void;
    onChange?: (fields: UpdateCompanyInputValues) => UpdateCompanyInputValues;
    onValidate?: UpdateCompanyValidationValues;
} & React.CSSProperties>;
export default function UpdateCompany(props: UpdateCompanyProps): React.ReactElement;
