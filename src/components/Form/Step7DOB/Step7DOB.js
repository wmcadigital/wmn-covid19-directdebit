import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { FormErrorContext } from 'globalState/FormErrorContext';
// Import components
import GenericError from 'components/shared/Errors/GenericError';
import Date from 'components/shared/FormElements/Date/Date';

const Step7DOB = ({ setCurrentStep, formRef }) => {
  const [errorState, errorDispatch] = useContext(FormErrorContext); // Get the error state of form data from FormErrorContext

  // Goto next step on continue
  const handleContinue = () => {
    // If errors, then don't progress and set continue button to true(halt form and show errors)
    if (errorState.errors.length) {
      window.scrollTo(0, formRef.current.offsetTop); // Scroll to top of form
      errorDispatch({ type: 'CONTINUE_PRESSED', payload: true }); // set continue button pressed to true so errors can show
    } else {
      errorDispatch({ type: 'CONTINUE_PRESSED', payload: false }); // Reset submit button pressed before going to next step
      setCurrentStep((c) => c + 1); // Set to next step in form
      window.scrollTo(0, 0); // Scroll to top of page
    }
  };

  return (
    <>
      <p>
        Section 2 of 3 <h4>About you</h4>
      </p>
      {errorState.errors.length > 0 && errorState.continuePressed && (
        <GenericError />
      )}
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>What is your date of birth?</h2>
          <p>We&apos;ll use this information to confirm your identity</p>
          <p>For example, 31 03 1980</p>
        </legend>
        <Date
          name="DateOfBirth"
          label="Date of birth"
          autoCompletPrefix="bday-"
        />
      </fieldset>
      <button
        type="button"
        className="wmnds-btn wmnds-btn--disabled wmnds-col-1 wmnds-m-t-md"
        onClick={() => handleContinue()}
      >
        Continue
      </button>
    </>
  );
};

Step7DOB.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step7DOB;
