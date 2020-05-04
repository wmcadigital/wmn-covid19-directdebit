import React, { useContext } from 'react';
// Import contexts
import { FormContext } from 'globalState/FormContext';
// Import components
import Input from 'components/shared/FormElements/Input/Input';

const Telephone = () => {
  const [formState] = useContext(FormContext); // Get the state of form data from FormContext
  const phoneRegex = /^\s*(([+]\s?\d[-\s]?\d|0)?\s?\d([-\s]?\d){9,10}|[(]\s?\d([-\s]?\d)+\s*[)]([-\s]?\d)+)\s*$/; // Got from https://www.codeproject.com/Questions/1016303/How-to-write-a-regular-expression-for-UK-phone-num adapated the middle part so it can contain between 9 and 10 chars {9,10}

  const customValidation = () => {
    let error;

    // Phone number should match UK specific phone number(s)
    if (!phoneRegex.test(formState.Application.PhoneNumber)) {
      error =
        'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192';
    }

    return error;
  };

  return (
    <fieldset className="wmnds-fe-fieldset">
      <legend className="wmnds-fe-fieldset__legend">
        <h3 className="wmnds-fe-question">What is your telephone number?</h3>
      </legend>
      <Input
        className="wmnds-col-sm-1-2"
        name="PhoneNumber"
        label="UK telephone number"
        inputmode="numeric"
        autocomplete="tel-national"
        customValidation={customValidation}
      />
    </fieldset>
  );
};

export default Telephone;
