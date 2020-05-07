import React from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic'; // Import components
// Import components
import Date from 'components/shared/FormElements/Date/Date';

const Step5TravelDate = ({ formRef }) => {
  // Custom hook for handling continue button (validation, errors etc)
  const { register, showGenericError, handleContinue } = useStepLogic(formRef);

  return (
    <>
      {/* Subsection */}
      <div>
        Section 1 of 3 <h4>About your ticket</h4>
      </div>

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>When will you start to use your ticket to travel again?</h2>
          <p>For example, 2 5 2020</p>
        </legend>
        <Date name="TravelResumptionDate" label="Travel date" />
      </fieldset>

      {/* Continue button */}
      <button
        type="button"
        className="wmnds-btn wmnds-btn--disabled wmnds-col-1 wmnds-m-t-md"
        onClick={handleContinue}
      >
        Continue
      </button>
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
