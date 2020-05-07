import React from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Input from 'components/shared/FormElements/Input/Input';

const Step2DDRef = ({ setCurrentStep, formRef }) => {
  // Custom hook for handling continue button (validation, errors etc)
  const { register, showGenericError, handleContinue } = useStepLogic(
    setCurrentStep,
    formRef
  );

  const ddLabel = 'Direct Debit reference'; // Label used on input and for validation
  // Logic used to validate the field
  const fieldRef = register({
    required: `${ddLabel} is required`,
    validate: {
      shouldStartWith6: (val) =>
        val.charAt(0) === '6' || `${ddLabel} is a number that begins with '6'`,
      mustBe8Digits: (val) => val.length === 8 || `${ddLabel} must be 8 digits`,
      shouldBeValidRef: (val) =>
        (+val > 60000000 && +val < 70000000) || `Enter a valid ${ddLabel}`,
    },
  });

  return (
    <>
      {/* Subsection */}
      <div>
        Section 1 of 3 <h4>About your ticket</h4>
      </div>

      <h2>What is your Direct Debit reference?</h2>

      {/* Show generic error message */}
      {showGenericError}

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
          label={ddLabel}
          inputmode="numeric"
          fieldRef={fieldRef}
        />
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

Step2DDRef.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step2DDRef;
