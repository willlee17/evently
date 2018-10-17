import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const DateInput = ({
  input: {value, onChange, onBlur, ...restInput},
  width,
  placeholder,
  meta: {
    touched,
    error,
  },
  ...rest //takes the rest of the properties of DatePicker
}) => {
  if(value) {
    value=moment(value, 'X')
  }
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        selected={value ? moment(value) : null} //These are destructured from input above. Even onChange below.
        onChange={onChange} //Note how im using the redux form onCHange and not the one internal to DatePicker. 
        onBlur={() => onBlur()}
        {...restInput}
      />

      {/* Validation Error */}
      {touched && !!error && <Label basic color="red">{error}</Label>}
    </Form.Field>
  )
}

export default DateInput
