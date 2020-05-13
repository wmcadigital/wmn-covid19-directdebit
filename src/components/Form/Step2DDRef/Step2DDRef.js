import React from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
import useWho from 'customHooks/useWho';
// Import components
import Input from 'components/shared/FormElements/Input/Input';

const Step2DDRef = ({ formRef }) => {
  const { register, showGenericError, continueButton } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)
  const { yourTheir, youThey } = useWho(); // Use custom hook which changes your/their based on what user selected in step 1

  const ddLabel = 'Direct Debit reference'; // Label used on input and for validation
  // Logic used to validate the field
  const fieldValidation = register({
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
        Section 1 of 3 <h4>About {yourTheir} ticket</h4>
      </div>

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>What is {yourTheir} Direct Debit reference?</h2>
        </legend>
        <p>
          This can be found in the email we sent you asking you to reinstate{' '}
          {yourTheir} Direct Debit and begins with a <strong>6</strong>.
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
    </>
  );
};

Step2DDRef.propTypes = {
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step2DDRef;
