/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getEducation, getResume, listResumes } from "../graphql/queries";
import { updateEducation } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function EducationUpdateForm(props) {
  const {
    id: idProp,
    education: educationModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    school: "",
    tier: "",
    completion: "",
    resumeEducationId: undefined,
  };
  const [school, setSchool] = React.useState(initialValues.school);
  const [tier, setTier] = React.useState(initialValues.tier);
  const [completion, setCompletion] = React.useState(initialValues.completion);
  const [resumeEducationId, setResumeEducationId] = React.useState(
    initialValues.resumeEducationId
  );
  const [resumeEducationIdLoading, setResumeEducationIdLoading] =
    React.useState(false);
  const [resumeEducationIdRecords, setResumeEducationIdRecords] =
    React.useState([]);
  const [
    selectedResumeEducationIdRecords,
    setSelectedResumeEducationIdRecords,
  ] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = educationRecord
      ? { ...initialValues, ...educationRecord, resumeEducationId }
      : initialValues;
    setSchool(cleanValues.school);
    setTier(cleanValues.tier);
    setCompletion(cleanValues.completion);
    setResumeEducationId(cleanValues.resumeEducationId);
    setCurrentResumeEducationIdValue(undefined);
    setCurrentResumeEducationIdDisplayValue("");
    setErrors({});
  };
  const [educationRecord, setEducationRecord] =
    React.useState(educationModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getEducation.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getEducation
        : educationModelProp;
      const resumeEducationIdRecord = record
        ? record.resumeEducationId
        : undefined;
      const resumeRecord = resumeEducationIdRecord
        ? (
            await client.graphql({
              query: getResume.replaceAll("__typename", ""),
              variables: { id: resumeEducationIdRecord },
            })
          )?.data?.getResume
        : undefined;
      setResumeEducationId(resumeEducationIdRecord);
      setSelectedResumeEducationIdRecords([resumeRecord]);
      setEducationRecord(record);
    };
    queryData();
  }, [idProp, educationModelProp]);
  React.useEffect(resetStateValues, [educationRecord, resumeEducationId]);
  const [
    currentResumeEducationIdDisplayValue,
    setCurrentResumeEducationIdDisplayValue,
  ] = React.useState("");
  const [currentResumeEducationIdValue, setCurrentResumeEducationIdValue] =
    React.useState(undefined);
  const resumeEducationIdRef = React.createRef();
  const getDisplayValue = {
    resumeEducationId: (r) =>
      `${r?.fullName ? r?.fullName + " - " : ""}${r?.id}`,
  };
  const validations = {
    school: [{ type: "Required" }],
    tier: [{ type: "Required" }],
    completion: [{ type: "Required" }],
    resumeEducationId: [],
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
  const fetchResumeEducationIdRecords = async (value) => {
    setResumeEducationIdLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ fullName: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listResumes.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listResumes?.items;
      var loaded = result.filter((item) => resumeEducationId !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setResumeEducationIdRecords(newOptions.slice(0, autocompleteLength));
    setResumeEducationIdLoading(false);
  };
  React.useEffect(() => {
    fetchResumeEducationIdRecords("");
  }, []);
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          school,
          tier,
          completion,
          resumeEducationId: resumeEducationId ?? null,
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
            query: updateEducation.replaceAll("__typename", ""),
            variables: {
              input: {
                id: educationRecord.id,
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
      {...getOverrideProps(overrides, "EducationUpdateForm")}
      {...rest}
    >
      <TextField
        label="School"
        isRequired={true}
        isReadOnly={false}
        value={school}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              school: value,
              tier,
              completion,
              resumeEducationId,
            };
            const result = onChange(modelFields);
            value = result?.school ?? value;
          }
          if (errors.school?.hasError) {
            runValidationTasks("school", value);
          }
          setSchool(value);
        }}
        onBlur={() => runValidationTasks("school", school)}
        errorMessage={errors.school?.errorMessage}
        hasError={errors.school?.hasError}
        {...getOverrideProps(overrides, "school")}
      ></TextField>
      <SelectField
        label="Tier"
        placeholder="Please select an option"
        isDisabled={false}
        value={tier}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              school,
              tier: value,
              completion,
              resumeEducationId,
            };
            const result = onChange(modelFields);
            value = result?.tier ?? value;
          }
          if (errors.tier?.hasError) {
            runValidationTasks("tier", value);
          }
          setTier(value);
        }}
        onBlur={() => runValidationTasks("tier", tier)}
        errorMessage={errors.tier?.errorMessage}
        hasError={errors.tier?.hasError}
        {...getOverrideProps(overrides, "tier")}
      >
        <option
          children="Associates"
          value="ASSOCIATES"
          {...getOverrideProps(overrides, "tieroption0")}
        ></option>
        <option
          children="Bachelors"
          value="BACHELORS"
          {...getOverrideProps(overrides, "tieroption1")}
        ></option>
        <option
          children="Masters"
          value="MASTERS"
          {...getOverrideProps(overrides, "tieroption2")}
        ></option>
        <option
          children="Doctorate"
          value="DOCTORATE"
          {...getOverrideProps(overrides, "tieroption3")}
        ></option>
      </SelectField>
      <TextField
        label="Completion"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={completion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              school,
              tier,
              completion: value,
              resumeEducationId,
            };
            const result = onChange(modelFields);
            value = result?.completion ?? value;
          }
          if (errors.completion?.hasError) {
            runValidationTasks("completion", value);
          }
          setCompletion(value);
        }}
        onBlur={() => runValidationTasks("completion", completion)}
        errorMessage={errors.completion?.errorMessage}
        hasError={errors.completion?.hasError}
        {...getOverrideProps(overrides, "completion")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              school,
              tier,
              completion,
              resumeEducationId: value,
            };
            const result = onChange(modelFields);
            value = result?.resumeEducationId ?? value;
          }
          setResumeEducationId(value);
          setCurrentResumeEducationIdValue(undefined);
        }}
        currentFieldValue={currentResumeEducationIdValue}
        label={"Resume education id"}
        items={resumeEducationId ? [resumeEducationId] : []}
        hasError={errors?.resumeEducationId?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "resumeEducationId",
            currentResumeEducationIdValue
          )
        }
        errorMessage={errors?.resumeEducationId?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.resumeEducationId(
                resumeEducationIdRecords.find((r) => r.id === value) ??
                  selectedResumeEducationIdRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentResumeEducationIdDisplayValue(
            value
              ? getDisplayValue.resumeEducationId(
                  resumeEducationIdRecords.find((r) => r.id === value) ??
                    selectedResumeEducationIdRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentResumeEducationIdValue(value);
          const selectedRecord = resumeEducationIdRecords.find(
            (r) => r.id === value
          );
          if (selectedRecord) {
            setSelectedResumeEducationIdRecords([selectedRecord]);
          }
        }}
        inputFieldRef={resumeEducationIdRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Resume education id"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Resume"
          value={currentResumeEducationIdDisplayValue}
          options={resumeEducationIdRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.resumeEducationId?.(r),
            }))}
          isLoading={resumeEducationIdLoading}
          onSelect={({ id, label }) => {
            setCurrentResumeEducationIdValue(id);
            setCurrentResumeEducationIdDisplayValue(label);
            runValidationTasks("resumeEducationId", label);
          }}
          onClear={() => {
            setCurrentResumeEducationIdDisplayValue("");
          }}
          defaultValue={resumeEducationId}
          onChange={(e) => {
            let { value } = e.target;
            fetchResumeEducationIdRecords(value);
            if (errors.resumeEducationId?.hasError) {
              runValidationTasks("resumeEducationId", value);
            }
            setCurrentResumeEducationIdDisplayValue(value);
            setCurrentResumeEducationIdValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "resumeEducationId",
              currentResumeEducationIdValue
            )
          }
          errorMessage={errors.resumeEducationId?.errorMessage}
          hasError={errors.resumeEducationId?.hasError}
          ref={resumeEducationIdRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "resumeEducationId")}
        ></Autocomplete>
      </ArrayField>
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
          isDisabled={!(idProp || educationModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || educationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
