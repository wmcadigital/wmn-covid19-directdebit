import React from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Date from 'components/shared/FormElements/Date/Date';

const Step7DOB = ({ formRef }) => {
  // Custom hook for handling continue button (validation, errors etc)
  const { register, showGenericError, continueButton } = useStepLogic(formRef);

  const DOBLabel = 'Date of birth'; // Label used on input and for validation

  // Logic used to validate the field
  const dateRegex = /^((((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[13578]|10|12)([-])(0[1-9]|[12][0-9]|3[01]))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[469]|11)([-])([0][1-9]|[12][0-9]|30))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(02)([-])(0[1-9]|1[0-9]|2[0-8]))|(([02468][048]00)([-])(02)([-])(29))|(([13579][26]00)([-])(02)([-])(29))|(([0-9][0-9][0][48])([-])(02)([-])(29))|(([0-9][0-9][2468][048])([-])(02)([-])(29))|(([0-9][0-9][13579][26])([-])(02)([-])(29)))$/; // Date regex http://regexlib.com/REDetails.aspx?regexp_id=1850

  const fieldValidation = register({
    required: `${DOBLabel} is required`,
    pattern: {
      value: dateRegex,
      message: `Enter ${DOBLabel.toLowerCase()} in the correct format, for example 18 03 2020`,
    },
  });

  return (
    <>
      {/* Subsection */}
      <div>
        Section 2 of 3 <h4>About you</h4>
      </div>

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>What is your date of birth?</h2>
          <p>We&apos;ll use this information to confirm your identity</p>
          <p>For example, 31 03 1980</p>
        </legend>
        <Date
          name="DateOfBirth"
          label={DOBLabel}
          autoCompletPrefix="bday-"
          fieldValidation={fieldValidation}
        />
      </fieldset>

      {/* Continue button */}
      {continueButton}
    </>
  );
};

Step7DOB.propTypes = {
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step7DOB;
