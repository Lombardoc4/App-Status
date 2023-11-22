/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getApplication } from "../graphql/queries";
import { updateApplication } from "../graphql/mutations";
const client = generateClient();
export default function ApplicationUpdateForm(props) {
  const {
    id: idProp,
    application: applicationModelProp,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    company: "",
    role: "",
    date_applied: "",
    response: "",
  };
  const [company, setCompany] = React.useState(initialValues.company);
  const [role, setRole] = React.useState(initialValues.role);
  const [date_applied, setDate_applied] = React.useState(
    initialValues.date_applied
  );
  const [response, setResponse] = React.useState(initialValues.response);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = applicationRecord
      ? { ...initialValues, ...applicationRecord }
      : initialValues;
    setCompany(cleanValues.company);
    setRole(cleanValues.role);
    setDate_applied(cleanValues.date_applied);
    setResponse(cleanValues.response);
    setErrors({});
  };
  const [applicationRecord, setApplicationRecord] =
    React.useState(applicationModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getApplication.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getApplication
        : applicationModelProp;
      setApplicationRecord(record);
    };
    queryData();
  }, [idProp, applicationModelProp]);
  React.useEffect(resetStateValues, [applicationRecord]);
  const validations = {
    company: [{ type: "Required" }],
    role: [{ type: "Required" }],
    date_applied: [{ type: "Required" }],
    response: [],
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
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          company,
          role,
          date_applied,
          response: response ?? null,
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
          await client.graphql({
            query: updateApplication.replaceAll("__typename", ""),
            variables: {
              input: {
                id: applicationRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ApplicationUpdateForm")}
      {...rest}
    >
      <Grid
        columnGap="inherit"
        rowGap="inherit"
        templateColumns="repeat(4, auto)"
        {...getOverrideProps(overrides, "RowGrid0")}
      >
        <TextField
          label="Company"
          isRequired={true}
          isReadOnly={false}
          value={company}
          onChange={(e) => {
            let { value } = e.target;
            if (onChange) {
              const modelFields = {
                company: value,
                role,
                date_applied,
                response,
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
        <TextField
          label="Role"
          isRequired={true}
          isReadOnly={false}
          value={role}
          onChange={(e) => {
            let { value } = e.target;
            if (onChange) {
              const modelFields = {
                company,
                role: value,
                date_applied,
                response,
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
          label="Date applied"
          isRequired={true}
          isReadOnly={false}
          type="date"
          value={date_applied}
          onChange={(e) => {
            let { value } = e.target;
            if (onChange) {
              const modelFields = {
                company,
                role,
                date_applied: value,
                response,
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
        <SelectField
          label="Response"
          placeholder="Please select an option"
          isDisabled={false}
          value={response}
          onChange={(e) => {
            let { value } = e.target;
            if (onChange) {
              const modelFields = {
                company,
                role,
                date_applied,
                response: value,
              };
              const result = onChange(modelFields);
              value = result?.response ?? value;
            }
            if (errors.response?.hasError) {
              runValidationTasks("response", value);
            }
            setResponse(value);
          }}
          onBlur={() => runValidationTasks("response", response)}
          errorMessage={errors.response?.errorMessage}
          hasError={errors.response?.hasError}
          {...getOverrideProps(overrides, "response")}
        >
          <option
            children="Waiting"
            value="WAITING"
            {...getOverrideProps(overrides, "responseoption0")}
          ></option>
          <option
            children="Declined"
            value="DECLINED"
            {...getOverrideProps(overrides, "responseoption1")}
          ></option>
          <option
            children="Accepted"
            value="ACCEPTED"
            {...getOverrideProps(overrides, "responseoption2")}
          ></option>
          <option
            children="No answer"
            value="NO_ANSWER"
            {...getOverrideProps(overrides, "responseoption3")}
          ></option>
        </SelectField>
      </Grid>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || applicationModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
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
            isDisabled={
              !(idProp || applicationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
