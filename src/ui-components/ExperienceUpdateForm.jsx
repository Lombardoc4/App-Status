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
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getExperience, getResume, listResumes } from "../graphql/queries";
import { updateExperience } from "../graphql/mutations";
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
export default function ExperienceUpdateForm(props) {
  const {
    id: idProp,
    experience: experienceModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    company: "",
    role: "",
    start_date: "",
    end_date: "",
    description: [],
    resumeEmploymentId: undefined,
    resumeProjectsId: undefined,
  };
  const [company, setCompany] = React.useState(initialValues.company);
  const [role, setRole] = React.useState(initialValues.role);
  const [start_date, setStart_date] = React.useState(initialValues.start_date);
  const [end_date, setEnd_date] = React.useState(initialValues.end_date);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [resumeEmploymentId, setResumeEmploymentId] = React.useState(
    initialValues.resumeEmploymentId
  );
  const [resumeEmploymentIdLoading, setResumeEmploymentIdLoading] =
    React.useState(false);
  const [resumeEmploymentIdRecords, setResumeEmploymentIdRecords] =
    React.useState([]);
  const [
    selectedResumeEmploymentIdRecords,
    setSelectedResumeEmploymentIdRecords,
  ] = React.useState([]);
  const [resumeProjectsId, setResumeProjectsId] = React.useState(
    initialValues.resumeProjectsId
  );
  const [resumeProjectsIdLoading, setResumeProjectsIdLoading] =
    React.useState(false);
  const [resumeProjectsIdRecords, setResumeProjectsIdRecords] = React.useState(
    []
  );
  const [selectedResumeProjectsIdRecords, setSelectedResumeProjectsIdRecords] =
    React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = experienceRecord
      ? {
          ...initialValues,
          ...experienceRecord,
          resumeEmploymentId,
          resumeProjectsId,
        }
      : initialValues;
    setCompany(cleanValues.company);
    setRole(cleanValues.role);
    setStart_date(cleanValues.start_date);
    setEnd_date(cleanValues.end_date);
    setDescription(cleanValues.description ?? []);
    setCurrentDescriptionValue("");
    setResumeEmploymentId(cleanValues.resumeEmploymentId);
    setCurrentResumeEmploymentIdValue(undefined);
    setCurrentResumeEmploymentIdDisplayValue("");
    setResumeProjectsId(cleanValues.resumeProjectsId);
    setCurrentResumeProjectsIdValue(undefined);
    setCurrentResumeProjectsIdDisplayValue("");
    setErrors({});
  };
  const [experienceRecord, setExperienceRecord] =
    React.useState(experienceModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getExperience.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getExperience
        : experienceModelProp;
      const resumeEmploymentIdRecord = record
        ? record.resumeEmploymentId
        : undefined;
      const resumeRecord = resumeEmploymentIdRecord
        ? (
            await client.graphql({
              query: getResume.replaceAll("__typename", ""),
              variables: { id: resumeEmploymentIdRecord },
            })
          )?.data?.getResume
        : undefined;
      setResumeEmploymentId(resumeEmploymentIdRecord);
      setSelectedResumeEmploymentIdRecords([resumeRecord]);
      const resumeProjectsIdRecord = record
        ? record.resumeProjectsId
        : undefined;
      const resumeRecord = resumeProjectsIdRecord
        ? (
            await client.graphql({
              query: getResume.replaceAll("__typename", ""),
              variables: { id: resumeProjectsIdRecord },
            })
          )?.data?.getResume
        : undefined;
      setResumeProjectsId(resumeProjectsIdRecord);
      setSelectedResumeProjectsIdRecords([resumeRecord]);
      setExperienceRecord(record);
    };
    queryData();
  }, [idProp, experienceModelProp]);
  React.useEffect(resetStateValues, [
    experienceRecord,
    resumeEmploymentId,
    resumeProjectsId,
  ]);
  const [currentDescriptionValue, setCurrentDescriptionValue] =
    React.useState("");
  const descriptionRef = React.createRef();
  const [
    currentResumeEmploymentIdDisplayValue,
    setCurrentResumeEmploymentIdDisplayValue,
  ] = React.useState("");
  const [currentResumeEmploymentIdValue, setCurrentResumeEmploymentIdValue] =
    React.useState(undefined);
  const resumeEmploymentIdRef = React.createRef();
  const [
    currentResumeProjectsIdDisplayValue,
    setCurrentResumeProjectsIdDisplayValue,
  ] = React.useState("");
  const [currentResumeProjectsIdValue, setCurrentResumeProjectsIdValue] =
    React.useState(undefined);
  const resumeProjectsIdRef = React.createRef();
  const getDisplayValue = {
    resumeEmploymentId: (r) =>
      `${r?.fullName ? r?.fullName + " - " : ""}${r?.id}`,
    resumeProjectsId: (r) =>
      `${r?.fullName ? r?.fullName + " - " : ""}${r?.id}`,
  };
  const validations = {
    company: [{ type: "Required" }],
    role: [{ type: "Required" }],
    start_date: [{ type: "Required" }],
    end_date: [],
    description: [],
    resumeEmploymentId: [],
    resumeProjectsId: [],
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
  const fetchResumeEmploymentIdRecords = async (value) => {
    setResumeEmploymentIdLoading(true);
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
      var loaded = result.filter((item) => resumeEmploymentId !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setResumeEmploymentIdRecords(newOptions.slice(0, autocompleteLength));
    setResumeEmploymentIdLoading(false);
  };
  const fetchResumeProjectsIdRecords = async (value) => {
    setResumeProjectsIdLoading(true);
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
      var loaded = result.filter((item) => resumeProjectsId !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setResumeProjectsIdRecords(newOptions.slice(0, autocompleteLength));
    setResumeProjectsIdLoading(false);
  };
  React.useEffect(() => {
    fetchResumeEmploymentIdRecords("");
    fetchResumeProjectsIdRecords("");
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
          company,
          role,
          start_date,
          end_date: end_date ?? null,
          description: description ?? null,
          resumeEmploymentId: resumeEmploymentId ?? null,
          resumeProjectsId: resumeProjectsId ?? null,
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
            query: updateExperience.replaceAll("__typename", ""),
            variables: {
              input: {
                id: experienceRecord.id,
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
      {...getOverrideProps(overrides, "ExperienceUpdateForm")}
      {...rest}
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
              start_date,
              end_date,
              description,
              resumeEmploymentId,
              resumeProjectsId,
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
              start_date,
              end_date,
              description,
              resumeEmploymentId,
              resumeProjectsId,
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
        label="Start date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={start_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              company,
              role,
              start_date: value,
              end_date,
              description,
              resumeEmploymentId,
              resumeProjectsId,
            };
            const result = onChange(modelFields);
            value = result?.start_date ?? value;
          }
          if (errors.start_date?.hasError) {
            runValidationTasks("start_date", value);
          }
          setStart_date(value);
        }}
        onBlur={() => runValidationTasks("start_date", start_date)}
        errorMessage={errors.start_date?.errorMessage}
        hasError={errors.start_date?.hasError}
        {...getOverrideProps(overrides, "start_date")}
      ></TextField>
      <TextField
        label="End date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={end_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              company,
              role,
              start_date,
              end_date: value,
              description,
              resumeEmploymentId,
              resumeProjectsId,
            };
            const result = onChange(modelFields);
            value = result?.end_date ?? value;
          }
          if (errors.end_date?.hasError) {
            runValidationTasks("end_date", value);
          }
          setEnd_date(value);
        }}
        onBlur={() => runValidationTasks("end_date", end_date)}
        errorMessage={errors.end_date?.errorMessage}
        hasError={errors.end_date?.hasError}
        {...getOverrideProps(overrides, "end_date")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              company,
              role,
              start_date,
              end_date,
              description: values,
              resumeEmploymentId,
              resumeProjectsId,
            };
            const result = onChange(modelFields);
            values = result?.description ?? values;
          }
          setDescription(values);
          setCurrentDescriptionValue("");
        }}
        currentFieldValue={currentDescriptionValue}
        label={"Description"}
        items={description}
        hasError={errors?.description?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("description", currentDescriptionValue)
        }
        errorMessage={errors?.description?.errorMessage}
        setFieldValue={setCurrentDescriptionValue}
        inputFieldRef={descriptionRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Description"
          isRequired={false}
          isReadOnly={false}
          value={currentDescriptionValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.description?.hasError) {
              runValidationTasks("description", value);
            }
            setCurrentDescriptionValue(value);
          }}
          onBlur={() =>
            runValidationTasks("description", currentDescriptionValue)
          }
          errorMessage={errors.description?.errorMessage}
          hasError={errors.description?.hasError}
          ref={descriptionRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "description")}
        ></TextField>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              company,
              role,
              start_date,
              end_date,
              description,
              resumeEmploymentId: value,
              resumeProjectsId,
            };
            const result = onChange(modelFields);
            value = result?.resumeEmploymentId ?? value;
          }
          setResumeEmploymentId(value);
          setCurrentResumeEmploymentIdValue(undefined);
        }}
        currentFieldValue={currentResumeEmploymentIdValue}
        label={"Resume employment id"}
        items={resumeEmploymentId ? [resumeEmploymentId] : []}
        hasError={errors?.resumeEmploymentId?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "resumeEmploymentId",
            currentResumeEmploymentIdValue
          )
        }
        errorMessage={errors?.resumeEmploymentId?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.resumeEmploymentId(
                resumeEmploymentIdRecords.find((r) => r.id === value) ??
                  selectedResumeEmploymentIdRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentResumeEmploymentIdDisplayValue(
            value
              ? getDisplayValue.resumeEmploymentId(
                  resumeEmploymentIdRecords.find((r) => r.id === value) ??
                    selectedResumeEmploymentIdRecords.find(
                      (r) => r.id === value
                    )
                )
              : ""
          );
          setCurrentResumeEmploymentIdValue(value);
          const selectedRecord = resumeEmploymentIdRecords.find(
            (r) => r.id === value
          );
          if (selectedRecord) {
            setSelectedResumeEmploymentIdRecords([selectedRecord]);
          }
        }}
        inputFieldRef={resumeEmploymentIdRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Resume employment id"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Resume"
          value={currentResumeEmploymentIdDisplayValue}
          options={resumeEmploymentIdRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.resumeEmploymentId?.(r),
            }))}
          isLoading={resumeEmploymentIdLoading}
          onSelect={({ id, label }) => {
            setCurrentResumeEmploymentIdValue(id);
            setCurrentResumeEmploymentIdDisplayValue(label);
            runValidationTasks("resumeEmploymentId", label);
          }}
          onClear={() => {
            setCurrentResumeEmploymentIdDisplayValue("");
          }}
          defaultValue={resumeEmploymentId}
          onChange={(e) => {
            let { value } = e.target;
            fetchResumeEmploymentIdRecords(value);
            if (errors.resumeEmploymentId?.hasError) {
              runValidationTasks("resumeEmploymentId", value);
            }
            setCurrentResumeEmploymentIdDisplayValue(value);
            setCurrentResumeEmploymentIdValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "resumeEmploymentId",
              currentResumeEmploymentIdValue
            )
          }
          errorMessage={errors.resumeEmploymentId?.errorMessage}
          hasError={errors.resumeEmploymentId?.hasError}
          ref={resumeEmploymentIdRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "resumeEmploymentId")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              company,
              role,
              start_date,
              end_date,
              description,
              resumeEmploymentId,
              resumeProjectsId: value,
            };
            const result = onChange(modelFields);
            value = result?.resumeProjectsId ?? value;
          }
          setResumeProjectsId(value);
          setCurrentResumeProjectsIdValue(undefined);
        }}
        currentFieldValue={currentResumeProjectsIdValue}
        label={"Resume projects id"}
        items={resumeProjectsId ? [resumeProjectsId] : []}
        hasError={errors?.resumeProjectsId?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "resumeProjectsId",
            currentResumeProjectsIdValue
          )
        }
        errorMessage={errors?.resumeProjectsId?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.resumeProjectsId(
                resumeProjectsIdRecords.find((r) => r.id === value) ??
                  selectedResumeProjectsIdRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentResumeProjectsIdDisplayValue(
            value
              ? getDisplayValue.resumeProjectsId(
                  resumeProjectsIdRecords.find((r) => r.id === value) ??
                    selectedResumeProjectsIdRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentResumeProjectsIdValue(value);
          const selectedRecord = resumeProjectsIdRecords.find(
            (r) => r.id === value
          );
          if (selectedRecord) {
            setSelectedResumeProjectsIdRecords([selectedRecord]);
          }
        }}
        inputFieldRef={resumeProjectsIdRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Resume projects id"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Resume"
          value={currentResumeProjectsIdDisplayValue}
          options={resumeProjectsIdRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.resumeProjectsId?.(r),
            }))}
          isLoading={resumeProjectsIdLoading}
          onSelect={({ id, label }) => {
            setCurrentResumeProjectsIdValue(id);
            setCurrentResumeProjectsIdDisplayValue(label);
            runValidationTasks("resumeProjectsId", label);
          }}
          onClear={() => {
            setCurrentResumeProjectsIdDisplayValue("");
          }}
          defaultValue={resumeProjectsId}
          onChange={(e) => {
            let { value } = e.target;
            fetchResumeProjectsIdRecords(value);
            if (errors.resumeProjectsId?.hasError) {
              runValidationTasks("resumeProjectsId", value);
            }
            setCurrentResumeProjectsIdDisplayValue(value);
            setCurrentResumeProjectsIdValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("resumeProjectsId", currentResumeProjectsIdValue)
          }
          errorMessage={errors.resumeProjectsId?.errorMessage}
          hasError={errors.resumeProjectsId?.hasError}
          ref={resumeProjectsIdRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "resumeProjectsId")}
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
          isDisabled={!(idProp || experienceModelProp)}
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
              !(idProp || experienceModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
