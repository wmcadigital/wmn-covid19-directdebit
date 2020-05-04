import React, { useContext } from 'react';
// Import contexts
import { FormContext } from 'globalState/FormContext';
// Import components
import Date from 'components/shared/FormElements/Date/Date';

const LastUsed = () => {
  const [formState] = useContext(FormContext); // Get the state of form data from FormContext

  const customValidation = () => {
    let error;

    // DirectDebit reference should start with 6
    if (formState.Application.LastUsedDate < '2020-03-16') {
      error = 'We can only issue refunds from the 16 March 2020. If you stopped travelling before this date, please still use 16 March 2020.';
    }

    return error;
  };

  return (
    <fieldset className="wmnds-fe-fieldset">
      <legend className="wmnds-fe-fieldset__legend">
        <h3 className="wmnds-fe-question">
          When did you last use your ticket to travel?
        </h3>
        <p>We can only issue refunds from the 16 March 2020. For example, 16 03 2020</p>
      </legend>
      <Date
        name="LastUsedDate"
        label="Last used date"
        customValidation={customValidation}
      />
    </fieldset>
  );
};

export default LastUsed;
