import React from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
import useWho from 'customHooks/useWho';
// Import components
import Date from 'components/shared/FormElements/Date/Date';

const Step5TravelDate = ({ formRef }) => {
  // Custom hook for handling continue button (validation, errors etc)
  const { register, showGenericError, continueButton } = useStepLogic(formRef);
  const { yourTheir, youThey } = useWho(); // Use custom hook which changes your/their based on what user selected in step 1

  const travelLabel = 'Travel date'; // Label used on input and for validation

  // Logic used to validate the field
  const dateRegex = /^((((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[13578]|10|12)([-])(0[1-9]|[12][0-9]|3[01]))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[469]|11)([-])([0][1-9]|[12][0-9]|30))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(02)([-])(0[1-9]|1[0-9]|2[0-8]))|(([02468][048]00)([-])(02)([-])(29))|(([13579][26]00)([-])(02)([-])(29))|(([0-9][0-9][0][48])([-])(02)([-])(29))|(([0-9][0-9][2468][048])([-])(02)([-])(29))|(([0-9][0-9][13579][26])([-])(02)([-])(29)))$/; // Date regex http://regexlib.com/REDetails.aspx?regexp_id=1850

  const fieldValidation = register({
    required: `${travelLabel} is required`,
    pattern: {
      value: dateRegex,
      message: `Enter ${travelLabel.toLowerCase()} in the correct format, for example 18 03 2020`,
    },
  });

  return (
    <>
      {/* Subsection */}
      <div>
        Section 1 of 3 <h4>About {yourTheir} ticket</h4>
      </div>

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>
            When will {youThey} start to use {yourTheir} ticket to travel again?
          </h2>
          <p>For example, 2 5 2020</p>
        </legend>
        <Date
          name="TravelResumptionDate"
          label={travelLabel}
          fieldValidation={fieldValidation}
        />
      </fieldset>

      {/* Continue button */}
      {continueButton}
    </>
  );
};

Step5TravelDate.propTypes = {
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step5TravelDate;
