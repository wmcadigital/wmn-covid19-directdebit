import React, { useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
import useWho from 'customHooks/useWho';

// Import components
import Input from 'components/shared/FormElements/Input/Input';

const Step2DDRef = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const {
    register,
    handleSubmit,
    showGenericError,
    continueButton,
  } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)
  const { yourTheir, youThey, youThem } = useWho(); // Use custom hook which changes your/their based on what user selected in step 1

  const ddLabel = 'Direct Debit reference'; // Label used on input and for validation
  // Logic used to validate the field
  const fieldValidation = register({
    required: `${ddLabel} is required`,
    validate: {
      shouldStartWith6: (val) =>
        val.charAt(0) === '6' || `${ddLabel} is a number that begins with '6'`,
      mustBe6Or8Digits: (val) =>
        val.length === 8 ||
        val.length === 6 ||
        `${ddLabel} must be 6 or 8 digits`,
      shouldBeValidRef: (val) => {
        let validation; // set var placeholder
        // If the val length is 8 digits, then check to see if it's a valid 8 digit ref
        if (val.length === 8) {
          validation =
            (+val > 60000000 && +val < 70000000) || `Enter a valid ${ddLabel}`;
        }
        // Else it must be another length (6 digits), so check if valid 6 digit ref
        else {
          validation =
            (+val > 600000 && +val < 700000) || `Enter a valid ${ddLabel}`;
        }

        return validation; // Return correct validation based on iffy above
      },
    },
  });

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      <div>
        Section 1 of 3 <h4>About {yourTheir} ticket</h4>
      </div>

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>What is {yourTheir} Direct Debit reference?</h2>
        </legend>
        <p>
          This can be found in the email we sent you asking {youThem} to
          reinstate {yourTheir} Direct Debit and begins with a{' '}
          <strong>6</strong>.
        </p>
        <p>
          If {youThey} didn’t receive this email, it is shown next to every
          payment to WMCA for {yourTheir} Direct Debit on {yourTheir} bank
          statement.
        </p>
        <Input
          className="wmnds-col-1-2 wmnds-col-sm-1-5"
          name="DirectDebitNumber"
          label={ddLabel}
          inputmode="numeric"
          fieldValidation={fieldValidation}
        />
      </fieldset>

      {/* Continue button */}
      {continueButton}
    </form>
  );
};

export default Step2DDRef;
