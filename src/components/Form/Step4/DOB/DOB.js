import React from 'react';
// Import components
import Date from 'components/shared/FormElements/Date/Date';

const DOB = () => {
  return (
    <fieldset className="wmnds-fe-fieldset">
      <legend className="wmnds-fe-fieldset__legend">
        <h3 className="wmnds-fe-question">What is your date of birth?</h3>
        <p>For example, 31 03 1980</p>
      </legend>
      <Date
        name="DateOfBirth"
        label="Date of birth"
        autoCompletPrefix="bday-"
      />
    </fieldset>
  );
};

export default DOB;
