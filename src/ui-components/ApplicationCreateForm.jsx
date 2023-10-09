/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Divider,
  Flex,
  Grid,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { createApplication } from "../graphql/mutations";
export default function ApplicationCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  console.log('overrides', overrides);
  const { tokens } = useTheme();
  const initialValues = {
    role: "",
    company: "",
    date_applied: "",
  };
  const [role, setRole] = React.useState(initialValues.role);
  const [company, setCompany] = React.useState(initialValues.company);
  const [date_applied, setDate_applied] = React.useState(
    initialValues.date_applied
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setRole(initialValues.role);
    setCompany(initialValues.company);
    setDate_applied(initialValues.date_applied);
    setErrors({});
  };
  const validations = {
    role: [{ type: "Required" }],
    company: [{ type: "Required" }],
    date_applied: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap={tokens.space.xl.value}
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          role,
          company,
          date_applied,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createApplication,
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ApplicationCreateForm")}
      {...rest}
    >
      <Grid
        columnGap="inherit"
        rowGap="inherit"
        templateColumns="repeat(2, auto)"
        {...getOverrideProps(overrides, "RowGrid0")}
      >
        <TextField
          label="Role"
          isRequired={true}
          isReadOnly={false}
          value={role}
          onChange={(e) => {
            let { value } = e.target;
            if (onChange) {
              const modelFields = {
                role: value,
                company,
                date_applied,
              };
              const result = onChange(modelFields);
              value = result?.role ?? value;
            }
            if (errors.role?.hasError) {
              runValidationTasks("role", value);
            }
            setRole(value);
          }}
          onBlur={() => runValidationTasks("role", role)}
          errorMessage={errors.role?.errorMessage}
          hasError={errors.role?.hasError}
          {...getOverrideProps(overrides, "role")}
        ></TextField>
        <TextField
          label="Company"
          isRequired={true}
          isReadOnly={false}
          value={company}
          onChange={(e) => {
            let { value } = e.target;
            if (onChange) {
              const modelFields = {
                role,
                company: value,
                date_applied,
              };
              const result = onChange(modelFields);
              value = result?.company ?? value;
            }
            if (errors.company?.hasError) {
              runValidationTasks("company", value);
            }
            setCompany(value);
          }}
          onBlur={() => runValidationTasks("company", company)}
          errorMessage={errors.company?.errorMessage}
          hasError={errors.company?.hasError}
          {...getOverrideProps(overrides, "company")}
        ></TextField>
      </Grid>
      <TextField
        label="Date applied"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={date_applied}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              role,
              company,
              date_applied: value,
            };
            const result = onChange(modelFields);
            value = result?.date_applied ?? value;
          }
          if (errors.date_applied?.hasError) {
            runValidationTasks("date_applied", value);
          }
          setDate_applied(value);
        }}
        onBlur={() => runValidationTasks("date_applied", date_applied)}
        errorMessage={errors.date_applied?.errorMessage}
        hasError={errors.date_applied?.hasError}
        {...getOverrideProps(overrides, "date_applied")}
      ></TextField>
      <Divider
        orientation="horizontal"
        {...getOverrideProps(overrides, "SectionalElement0")}
      ></Divider>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
