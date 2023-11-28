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
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getResume, listEducations, listExperiences } from "../graphql/queries";
import {
  updateEducation,
  updateExperience,
  updateResume,
} from "../graphql/mutations";
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
export default function ResumeUpdateForm(props) {
  const {
    id: idProp,
    resume: resumeModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    links: "",
    bio: "",
    skills: [],
    employment: [],
    projects: [],
    education: [],
  };
  const [fullName, setFullName] = React.useState(initialValues.fullName);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phoneNumber, setPhoneNumber] = React.useState(
    initialValues.phoneNumber
  );
  const [links, setLinks] = React.useState(initialValues.links);
  const [bio, setBio] = React.useState(initialValues.bio);
  const [skills, setSkills] = React.useState(initialValues.skills);
  const [employment, setEmployment] = React.useState(initialValues.employment);
  const [employmentLoading, setEmploymentLoading] = React.useState(false);
  const [employmentRecords, setEmploymentRecords] = React.useState([]);
  const [projects, setProjects] = React.useState(initialValues.projects);
  const [projectsLoading, setProjectsLoading] = React.useState(false);
  const [projectsRecords, setProjectsRecords] = React.useState([]);
  const [education, setEducation] = React.useState(initialValues.education);
  const [educationLoading, setEducationLoading] = React.useState(false);
  const [educationRecords, setEducationRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = resumeRecord
      ? {
          ...initialValues,
          ...resumeRecord,
          employment: linkedEmployment,
          projects: linkedProjects,
          education: linkedEducation,
        }
      : initialValues;
    setFullName(cleanValues.fullName);
    setEmail(cleanValues.email);
    setPhoneNumber(cleanValues.phoneNumber);
    setLinks(
      typeof cleanValues.links === "string" || cleanValues.links === null
        ? cleanValues.links
        : JSON.stringify(cleanValues.links)
    );
    setBio(cleanValues.bio);
    setSkills(cleanValues.skills ?? []);
    setCurrentSkillsValue("");
    setEmployment(cleanValues.employment ?? []);
    setCurrentEmploymentValue(undefined);
    setCurrentEmploymentDisplayValue("");
    setProjects(cleanValues.projects ?? []);
    setCurrentProjectsValue(undefined);
    setCurrentProjectsDisplayValue("");
    setEducation(cleanValues.education ?? []);
    setCurrentEducationValue(undefined);
    setCurrentEducationDisplayValue("");
    setErrors({});
  };
  const [resumeRecord, setResumeRecord] = React.useState(resumeModelProp);
  const [linkedEmployment, setLinkedEmployment] = React.useState([]);
  const canUnlinkEmployment = true;
  const [linkedProjects, setLinkedProjects] = React.useState([]);
  const canUnlinkProjects = true;
  const [linkedEducation, setLinkedEducation] = React.useState([]);
  const canUnlinkEducation = true;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getResume.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getResume
        : resumeModelProp;
      const linkedEmployment = record?.employment?.items ?? [];
      setLinkedEmployment(linkedEmployment);
      const linkedProjects = record?.projects?.items ?? [];
      setLinkedProjects(linkedProjects);
      const linkedEducation = record?.education?.items ?? [];
      setLinkedEducation(linkedEducation);
      setResumeRecord(record);
    };
    queryData();
  }, [idProp, resumeModelProp]);
  React.useEffect(resetStateValues, [
    resumeRecord,
    linkedEmployment,
    linkedProjects,
    linkedEducation,
  ]);
  const [currentSkillsValue, setCurrentSkillsValue] = React.useState("");
  const skillsRef = React.createRef();
  const [currentEmploymentDisplayValue, setCurrentEmploymentDisplayValue] =
    React.useState("");
  const [currentEmploymentValue, setCurrentEmploymentValue] =
    React.useState(undefined);
  const employmentRef = React.createRef();
  const [currentProjectsDisplayValue, setCurrentProjectsDisplayValue] =
    React.useState("");
  const [currentProjectsValue, setCurrentProjectsValue] =
    React.useState(undefined);
  const projectsRef = React.createRef();
  const [currentEducationDisplayValue, setCurrentEducationDisplayValue] =
    React.useState("");
  const [currentEducationValue, setCurrentEducationValue] =
    React.useState(undefined);
  const educationRef = React.createRef();
  const getIDValue = {
    employment: (r) => JSON.stringify({ id: r?.id }),
    projects: (r) => JSON.stringify({ id: r?.id }),
    education: (r) => JSON.stringify({ id: r?.id }),
  };
  const employmentIdSet = new Set(
    Array.isArray(employment)
      ? employment.map((r) => getIDValue.employment?.(r))
      : getIDValue.employment?.(employment)
  );
  const projectsIdSet = new Set(
    Array.isArray(projects)
      ? projects.map((r) => getIDValue.projects?.(r))
      : getIDValue.projects?.(projects)
  );
  const educationIdSet = new Set(
    Array.isArray(education)
      ? education.map((r) => getIDValue.education?.(r))
      : getIDValue.education?.(education)
  );
  const getDisplayValue = {
    employment: (r) => `${r?.company ? r?.company + " - " : ""}${r?.id}`,
    projects: (r) => `${r?.company ? r?.company + " - " : ""}${r?.id}`,
    education: (r) => `${r?.school ? r?.school + " - " : ""}${r?.id}`,
  };
  const validations = {
    fullName: [{ type: "Required" }],
    email: [{ type: "Required" }, { type: "Email" }],
    phoneNumber: [{ type: "Required" }, { type: "Phone" }],
    links: [{ type: "Required" }, { type: "JSON" }],
    bio: [{ type: "Required" }],
    skills: [],
    employment: [],
    projects: [],
    education: [],
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
  const fetchEmploymentRecords = async (value) => {
    setEmploymentLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ company: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listExperiences.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listExperiences?.items;
      var loaded = result.filter(
        (item) => !employmentIdSet.has(getIDValue.employment?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setEmploymentRecords(newOptions.slice(0, autocompleteLength));
    setEmploymentLoading(false);
  };
  const fetchProjectsRecords = async (value) => {
    setProjectsLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ company: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listExperiences.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listExperiences?.items;
      var loaded = result.filter(
        (item) => !projectsIdSet.has(getIDValue.projects?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setProjectsRecords(newOptions.slice(0, autocompleteLength));
    setProjectsLoading(false);
  };
  const fetchEducationRecords = async (value) => {
    setEducationLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ school: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listEducations.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listEducations?.items;
      var loaded = result.filter(
        (item) => !educationIdSet.has(getIDValue.education?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setEducationRecords(newOptions.slice(0, autocompleteLength));
    setEducationLoading(false);
  };
  React.useEffect(() => {
    fetchEmploymentRecords("");
    fetchProjectsRecords("");
    fetchEducationRecords("");
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
          fullName,
          email,
          phoneNumber,
          links,
          bio,
          skills: skills ?? null,
          employment: employment ?? null,
          projects: projects ?? null,
          education: education ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
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
          const promises = [];
          const employmentToLink = [];
          const employmentToUnLink = [];
          const employmentSet = new Set();
          const linkedEmploymentSet = new Set();
          employment.forEach((r) =>
            employmentSet.add(getIDValue.employment?.(r))
          );
          linkedEmployment.forEach((r) =>
            linkedEmploymentSet.add(getIDValue.employment?.(r))
          );
          linkedEmployment.forEach((r) => {
            if (!employmentSet.has(getIDValue.employment?.(r))) {
              employmentToUnLink.push(r);
            }
          });
          employment.forEach((r) => {
            if (!linkedEmploymentSet.has(getIDValue.employment?.(r))) {
              employmentToLink.push(r);
            }
          });
          employmentToUnLink.forEach((original) => {
            if (!canUnlinkEmployment) {
              throw Error(
                `Experience ${original.id} cannot be unlinked from Resume because resumeEmploymentId is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateExperience.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    resumeEmploymentId: null,
                  },
                },
              })
            );
          });
          employmentToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateExperience.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    resumeEmploymentId: resumeRecord.id,
                  },
                },
              })
            );
          });
          const projectsToLink = [];
          const projectsToUnLink = [];
          const projectsSet = new Set();
          const linkedProjectsSet = new Set();
          projects.forEach((r) => projectsSet.add(getIDValue.projects?.(r)));
          linkedProjects.forEach((r) =>
            linkedProjectsSet.add(getIDValue.projects?.(r))
          );
          linkedProjects.forEach((r) => {
            if (!projectsSet.has(getIDValue.projects?.(r))) {
              projectsToUnLink.push(r);
            }
          });
          projects.forEach((r) => {
            if (!linkedProjectsSet.has(getIDValue.projects?.(r))) {
              projectsToLink.push(r);
            }
          });
          projectsToUnLink.forEach((original) => {
            if (!canUnlinkProjects) {
              throw Error(
                `Experience ${original.id} cannot be unlinked from Resume because resumeProjectsId is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateExperience.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    resumeProjectsId: null,
                  },
                },
              })
            );
          });
          projectsToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateExperience.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    resumeProjectsId: resumeRecord.id,
                  },
                },
              })
            );
          });
          const educationToLink = [];
          const educationToUnLink = [];
          const educationSet = new Set();
          const linkedEducationSet = new Set();
          education.forEach((r) => educationSet.add(getIDValue.education?.(r)));
          linkedEducation.forEach((r) =>
            linkedEducationSet.add(getIDValue.education?.(r))
          );
          linkedEducation.forEach((r) => {
            if (!educationSet.has(getIDValue.education?.(r))) {
              educationToUnLink.push(r);
            }
          });
          education.forEach((r) => {
            if (!linkedEducationSet.has(getIDValue.education?.(r))) {
              educationToLink.push(r);
            }
          });
          educationToUnLink.forEach((original) => {
            if (!canUnlinkEducation) {
              throw Error(
                `Education ${original.id} cannot be unlinked from Resume because resumeEducationId is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateEducation.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    resumeEducationId: null,
                  },
                },
              })
            );
          });
          educationToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateEducation.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    resumeEducationId: resumeRecord.id,
                  },
                },
              })
            );
          });
          const modelFieldsToSave = {
            fullName: modelFields.fullName,
            email: modelFields.email,
            phoneNumber: modelFields.phoneNumber,
            links: modelFields.links,
            bio: modelFields.bio,
            skills: modelFields.skills ?? null,
          };
          promises.push(
            client.graphql({
              query: updateResume.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: resumeRecord.id,
                  ...modelFieldsToSave,
                },
              },
            })
          );
          await Promise.all(promises);
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
      {...getOverrideProps(overrides, "ResumeUpdateForm")}
      {...rest}
    >
      <TextField
        label="Full name"
        isRequired={true}
        isReadOnly={false}
        value={fullName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              fullName: value,
              email,
              phoneNumber,
              links,
              bio,
              skills,
              employment,
              projects,
              education,
            };
            const result = onChange(modelFields);
            value = result?.fullName ?? value;
          }
          if (errors.fullName?.hasError) {
            runValidationTasks("fullName", value);
          }
          setFullName(value);
        }}
        onBlur={() => runValidationTasks("fullName", fullName)}
        errorMessage={errors.fullName?.errorMessage}
        hasError={errors.fullName?.hasError}
        {...getOverrideProps(overrides, "fullName")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              fullName,
              email: value,
              phoneNumber,
              links,
              bio,
              skills,
              employment,
              projects,
              education,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phone number"
        isRequired={true}
        isReadOnly={false}
        type="tel"
        value={phoneNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              fullName,
              email,
              phoneNumber: value,
              links,
              bio,
              skills,
              employment,
              projects,
              education,
            };
            const result = onChange(modelFields);
            value = result?.phoneNumber ?? value;
          }
          if (errors.phoneNumber?.hasError) {
            runValidationTasks("phoneNumber", value);
          }
          setPhoneNumber(value);
        }}
        onBlur={() => runValidationTasks("phoneNumber", phoneNumber)}
        errorMessage={errors.phoneNumber?.errorMessage}
        hasError={errors.phoneNumber?.hasError}
        {...getOverrideProps(overrides, "phoneNumber")}
      ></TextField>
      <TextAreaField
        label="Links"
        isRequired={true}
        isReadOnly={false}
        value={links}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              fullName,
              email,
              phoneNumber,
              links: value,
              bio,
              skills,
              employment,
              projects,
              education,
            };
            const result = onChange(modelFields);
            value = result?.links ?? value;
          }
          if (errors.links?.hasError) {
            runValidationTasks("links", value);
          }
          setLinks(value);
        }}
        onBlur={() => runValidationTasks("links", links)}
        errorMessage={errors.links?.errorMessage}
        hasError={errors.links?.hasError}
        {...getOverrideProps(overrides, "links")}
      ></TextAreaField>
      <TextField
        label="Bio"
        isRequired={true}
        isReadOnly={false}
        value={bio}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              fullName,
              email,
              phoneNumber,
              links,
              bio: value,
              skills,
              employment,
              projects,
              education,
            };
            const result = onChange(modelFields);
            value = result?.bio ?? value;
          }
          if (errors.bio?.hasError) {
            runValidationTasks("bio", value);
          }
          setBio(value);
        }}
        onBlur={() => runValidationTasks("bio", bio)}
        errorMessage={errors.bio?.errorMessage}
        hasError={errors.bio?.hasError}
        {...getOverrideProps(overrides, "bio")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              fullName,
              email,
              phoneNumber,
              links,
              bio,
              skills: values,
              employment,
              projects,
              education,
            };
            const result = onChange(modelFields);
            values = result?.skills ?? values;
          }
          setSkills(values);
          setCurrentSkillsValue("");
        }}
        currentFieldValue={currentSkillsValue}
        label={"Skills"}
        items={skills}
        hasError={errors?.skills?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("skills", currentSkillsValue)
        }
        errorMessage={errors?.skills?.errorMessage}
        setFieldValue={setCurrentSkillsValue}
        inputFieldRef={skillsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Skills"
          isRequired={false}
          isReadOnly={false}
          value={currentSkillsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.skills?.hasError) {
              runValidationTasks("skills", value);
            }
            setCurrentSkillsValue(value);
          }}
          onBlur={() => runValidationTasks("skills", currentSkillsValue)}
          errorMessage={errors.skills?.errorMessage}
          hasError={errors.skills?.hasError}
          ref={skillsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "skills")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              fullName,
              email,
              phoneNumber,
              links,
              bio,
              skills,
              employment: values,
              projects,
              education,
            };
            const result = onChange(modelFields);
            values = result?.employment ?? values;
          }
          setEmployment(values);
          setCurrentEmploymentValue(undefined);
          setCurrentEmploymentDisplayValue("");
        }}
        currentFieldValue={currentEmploymentValue}
        label={"Employment"}
        items={employment}
        hasError={errors?.employment?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("employment", currentEmploymentValue)
        }
        errorMessage={errors?.employment?.errorMessage}
        getBadgeText={getDisplayValue.employment}
        setFieldValue={(model) => {
          setCurrentEmploymentDisplayValue(
            model ? getDisplayValue.employment(model) : ""
          );
          setCurrentEmploymentValue(model);
        }}
        inputFieldRef={employmentRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Employment"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Experience"
          value={currentEmploymentDisplayValue}
          options={employmentRecords
            .filter((r) => !employmentIdSet.has(getIDValue.employment?.(r)))
            .map((r) => ({
              id: getIDValue.employment?.(r),
              label: getDisplayValue.employment?.(r),
            }))}
          isLoading={employmentLoading}
          onSelect={({ id, label }) => {
            setCurrentEmploymentValue(
              employmentRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentEmploymentDisplayValue(label);
            runValidationTasks("employment", label);
          }}
          onClear={() => {
            setCurrentEmploymentDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchEmploymentRecords(value);
            if (errors.employment?.hasError) {
              runValidationTasks("employment", value);
            }
            setCurrentEmploymentDisplayValue(value);
            setCurrentEmploymentValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("employment", currentEmploymentDisplayValue)
          }
          errorMessage={errors.employment?.errorMessage}
          hasError={errors.employment?.hasError}
          ref={employmentRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "employment")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              fullName,
              email,
              phoneNumber,
              links,
              bio,
              skills,
              employment,
              projects: values,
              education,
            };
            const result = onChange(modelFields);
            values = result?.projects ?? values;
          }
          setProjects(values);
          setCurrentProjectsValue(undefined);
          setCurrentProjectsDisplayValue("");
        }}
        currentFieldValue={currentProjectsValue}
        label={"Projects"}
        items={projects}
        hasError={errors?.projects?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("projects", currentProjectsValue)
        }
        errorMessage={errors?.projects?.errorMessage}
        getBadgeText={getDisplayValue.projects}
        setFieldValue={(model) => {
          setCurrentProjectsDisplayValue(
            model ? getDisplayValue.projects(model) : ""
          );
          setCurrentProjectsValue(model);
        }}
        inputFieldRef={projectsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Projects"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Experience"
          value={currentProjectsDisplayValue}
          options={projectsRecords
            .filter((r) => !projectsIdSet.has(getIDValue.projects?.(r)))
            .map((r) => ({
              id: getIDValue.projects?.(r),
              label: getDisplayValue.projects?.(r),
            }))}
          isLoading={projectsLoading}
          onSelect={({ id, label }) => {
            setCurrentProjectsValue(
              projectsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentProjectsDisplayValue(label);
            runValidationTasks("projects", label);
          }}
          onClear={() => {
            setCurrentProjectsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchProjectsRecords(value);
            if (errors.projects?.hasError) {
              runValidationTasks("projects", value);
            }
            setCurrentProjectsDisplayValue(value);
            setCurrentProjectsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("projects", currentProjectsDisplayValue)
          }
          errorMessage={errors.projects?.errorMessage}
          hasError={errors.projects?.hasError}
          ref={projectsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "projects")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              fullName,
              email,
              phoneNumber,
              links,
              bio,
              skills,
              employment,
              projects,
              education: values,
            };
            const result = onChange(modelFields);
            values = result?.education ?? values;
          }
          setEducation(values);
          setCurrentEducationValue(undefined);
          setCurrentEducationDisplayValue("");
        }}
        currentFieldValue={currentEducationValue}
        label={"Education"}
        items={education}
        hasError={errors?.education?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("education", currentEducationValue)
        }
        errorMessage={errors?.education?.errorMessage}
        getBadgeText={getDisplayValue.education}
        setFieldValue={(model) => {
          setCurrentEducationDisplayValue(
            model ? getDisplayValue.education(model) : ""
          );
          setCurrentEducationValue(model);
        }}
        inputFieldRef={educationRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Education"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Education"
          value={currentEducationDisplayValue}
          options={educationRecords
            .filter((r) => !educationIdSet.has(getIDValue.education?.(r)))
            .map((r) => ({
              id: getIDValue.education?.(r),
              label: getDisplayValue.education?.(r),
            }))}
          isLoading={educationLoading}
          onSelect={({ id, label }) => {
            setCurrentEducationValue(
              educationRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentEducationDisplayValue(label);
            runValidationTasks("education", label);
          }}
          onClear={() => {
            setCurrentEducationDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchEducationRecords(value);
            if (errors.education?.hasError) {
              runValidationTasks("education", value);
            }
            setCurrentEducationDisplayValue(value);
            setCurrentEducationValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("education", currentEducationDisplayValue)
          }
          errorMessage={errors.education?.errorMessage}
          hasError={errors.education?.hasError}
          ref={educationRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "education")}
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
          isDisabled={!(idProp || resumeModelProp)}
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
              !(idProp || resumeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
