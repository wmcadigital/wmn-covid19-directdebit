import React from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { useFormContext } from 'react-hook-form';
// Import components
import GenericError from 'components/shared/Errors/GenericError';
import Input from 'components/shared/FormElements/Input/Input';

const Step2DDRef = ({ setCurrentStep, formRef }) => {
  const { register, errors, triggerValidation } = useFormContext();

  // const label = 'Direct Debit reference'; // Used on input and for validation

  // Update the current step to the correct one depending on users selection
  const handleContinue = () => {
    const validate = async () => {
      const result = await triggerValidation();
      // setIsContinuePressed(true);

      // if no errors
      if (result) {
        setCurrentStep((i) => i + 1);
      }
      // else, errors are true...
      else {
        window.scrollTo(0, formRef.current.offsetTop); // Scroll to top of form
      }
    };
    validate();
  };

  return (
    <>
      <div>
        Section 1 of 3 <h4>About your ticket</h4>
      </div>
      <h2>What is your Direct Debit reference?</h2>
      {errors && <GenericError />}
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
          // customValidation={customValidation}
          fieldRef={register({
            required: true,
            validate: {
              shouldStartWith6: (val) =>
                val.charAt(0) === '6' ||
                `Direct Debit reference is a number that begins with '6'`,
              mustBe8DigitsLong: (val) =>
                val.length === 8 || 'Direct Debit reference must be 8 digits',
              shouldBeValidRef: (val) =>
                (+val > 60000000 && +val < 70000000) ||
                'Enter a valid Direct Debit reference',
            },
          })}
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
  setCurrentStep: PropTypes.func.isRequired,
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step2DDRef;
