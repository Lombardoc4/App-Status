
import {
    SelectField,
    TextField
  } from "@aws-amplify/ui-react";

export const ResponseInput = ({onChange, initialVal, error, runValidationTasks, val, setVal}) => {
    return (
        <SelectField
          // label="Response"
          autoFocus
          placeholder={initialVal || "Please select an option"}
          isDisabled={false}
          value={val}
          onKeyDown = {(e) =>onChange(e)}
          onChange={(e) => {
            let { value } = e.target;
            if (error?.hasError) {
              runValidationTasks("response", value);
            }
            setVal(value);
          }}
          onBlur={() => runValidationTasks("response", val)}
          errorMessage={error?.errorMessage}
          hasError={error?.hasError}
        >
          <option
            children="Waiting"
            value="WAITING"
          ></option>
          <option
            children="Declined"
            value="DECLINED"
          ></option>
          <option
            children="Accepted"
            value="ACCEPTED"
          ></option>
          <option
            children="No answer"
            value="NO_ANSWER"
          ></option>
        </SelectField>
    )
}

export const DateInput = ({onChange, error, runValidationTasks, val, setVal}) => {
  return (
      <TextField
          // label='Date applied'
          autoFocus
          isRequired={true}
          isReadOnly={false}
          type='date'
          value={val}
          onKeyDown = {(e) =>onChange(e)}
          onChange={(e) => {
              let { value } = e.target;
              if (errors?.hasError) {
                  runValidationTasks("date_applied", value);
              }
              setVal(value);
          }}
          onBlur={() => runValidationTasks("date_applied", val)}
          errorMessage={error?.errorMessage}
          hasError={error?.hasError}
      ></TextField>
  );
}

export const TextInput = ({onChange, label, error, runValidationTasks, val, setVal}) => {
  return (
    <TextField
    // label={label}
    autoFocus
    isRequired={true}
    isReadOnly={false}
    value={val}
    onKeyDown = {(e) =>onChange(e)}
    onChange={(e) => {
      let { value } = e.target;
      if (error?.hasError) {
        runValidationTasks(label, value);
      }
      setVal(value);
    }}
    onBlur={() => runValidationTasks(label, val)}
    errorMessage={error?.errorMessage}
    hasError={error?.hasError}
  ></TextField>
  );
}