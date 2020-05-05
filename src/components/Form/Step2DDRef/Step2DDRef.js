import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { FormContext } from 'globalState/FormContext';
import { FormErrorContext } from 'globalState/FormErrorContext';
// Import components
import GenericError from 'components/shared/Errors/GenericError';
import Input from 'components/shared/FormElements/Input/Input';

const Step2DDRef = ({ currentStep, setCurrentStep, formRef }) => {
  const [formState] = useContext(FormContext); // Get the state of form data from FormContext
  const [errorState, errorDispatch] = useContext(FormErrorContext); // Get the error state of form data from FormErrorContext
  const label = 'Direct Debit reference'; // Used on input and for validation

  const customValidation = () => {
    let error;
    const ddNum = formState.Application.DirectDebitNumber;

    // DirectDebit reference should start with 6
    if (ddNum.charAt(0) !== '6') {
      error = `${label} is a number that begins with '6'`;
    }
    // Must be 8 digits long
    else if (ddNum.length !== 6) {
      error = `${label} must be 6 digits`;
    }
    // Not valid ref if not between these numbers
    else if (+ddNum < 600000 || ddNum > 699999) {
      error = `Enter a valid ${label}`;
    }

    return error;
  };

  // Goto next step on continue
  const handleContinue = () => {
    // If errors, then don't progress and set continue button to true(halt form and show errors)
    if (errorState.errors.length) {
      window.scrollTo(0, formRef.current.offsetTop); // Scroll to top of form
      errorDispatch({ type: 'CONTINUE_PRESSED', payload: true }); // set continue button pressed to true so errors can show
    } else {
      errorDispatch({ type: 'CONTINUE_PRESSED', payload: false }); // Reset submit button pressed before going to next step
      setCurrentStep(currentStep + 1); // Set to next step in form
      window.scrollTo(0, 0); // Scroll to top of page
    }
  };

  return (
    <>
      <h2>What is your Direct Debit reference?</h2>
      {errorState.errors.length > 0 && errorState.continuePressed && (
        <GenericError />
      )}
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <p>
            This can be found in the email we sent you asking you to reinstate
            your Direct Debit and begins with a <strong>6</strong>.
          </p>
          <p>
            This can be found in the email we sent you asking you to reinstate
            your Direct Debit and begins with a 6 If you didn’t receive this
            email, it is shown next to every payment to WMCA for your Direct
            Debit on your bank statement.
          </p>
        </legend>
        <Input
          className="wmnds-col-1-2 wmnds-col-sm-1-5"
          name="DirectDebitNumber"
          label="Direct Debit reference"
          inputmode="numeric"
          customValidation={customValidation}
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

Step2DDRef.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step2DDRef;
