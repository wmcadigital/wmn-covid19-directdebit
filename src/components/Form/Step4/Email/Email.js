import React, { useContext } from 'react';
// Import contexts
import { FormContext } from 'globalState/FormContext';
// Import components
import Input from 'components/shared/FormElements/Input/Input';

const Email = () => {
  const [formState] = useContext(FormContext); // Get the state of form data from FormContext

  const customValidation = () => {
    let error;

    const emailRegex = /^[\w!#$%&amp;'*+\-/=?^_`{|}~]+(\.[\w!#$%&amp;'*+\-/=?^_`{|}~]+)*@((([-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$/; // Matches email regex on server

    // If not a valid email address
    if (!emailRegex.test(formState.Application.Email)) {
      error = 'Enter an email address in the correct format';
    }

    return error;
  };

  return (
    <fieldset className="wmnds-fe-fieldset">
      <legend className="wmnds-fe-fieldset__legend">
        <h3 className="wmnds-fe-question">What is your email address?</h3>
      </legend>

      <Input
        className="wmnds-col-sm-1-2"
        name="Email"
        label="Email address, for example name@example.com"
        type="email"
        autocomplete="email"
        customValidation={customValidation}
      />
    </fieldset>
  );
};

export default Email;
