import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

const SelectInput = ({
  input,
  multiple, //Notice this is what's different
  options,  //Notice this is what's different
  type,
  placeholder,
  meta: {
    touched,
    error,
  }
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <Select
        value={input.value || null}
        onChange={(e, data) => input.onChange(data.value)}     //the e represents the event itself. data represents the selected item frmo the dropodwn
        multiple={multiple}
        options={options}
        placeholder={placeholder}
        type={type}
      />
      {/* Validation Error */}
      {touched && !!error && <Label basic color="red">{error}</Label>}
    </Form.Field>
  )
}

export default SelectInput
