import React, { useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
import useWho from 'customHooks/useWho';
// Import components
import Input from 'components/shared/FormElements/Input/Input';

const Step6Name = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const {
    register,
    handleSubmit,
    showGenericError,
    continueButton,
  } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)
  const { yourTheir, youThem } = useWho(); // Use custom hook which changes your/their based on what user selected in step 1

  // Labels used on inputs and for validation
  const fNameLabel = 'First name';
  const lNameLabel = 'Last name';

  // Logic used to validate fields
  const fieldValidation = (name) => {
    return register({ required: `${name} is required` });
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      <div>
        Section 2 of 3 <h4>About {youThem}</h4>
      </div>

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>What is {yourTheir} name?</h2>
        </legend>

        <p>We’ll use this information to confirm {yourTheir} identity.</p>
        <p>If you are completing this for somebody else, enter their name</p>

        <Input
          className="wmnds-col-1 wmnds-col-sm-2-3 wmnds-col-lg-1-2"
          name="Firstname"
          label={fNameLabel}
          autocomplete="given-name"
          fieldValidation={fieldValidation(fNameLabel)}
        />
        <Input
          className="wmnds-col-1 wmnds-col-sm-2-3 wmnds-col-lg-1-2"
          name="Lastname"
          label={lNameLabel}
          autocomplete="family-name"
          fieldValidation={fieldValidation(lNameLabel)}
        />
      </fieldset>

      {/* Continue button */}
      {continueButton}
    </form>
  );
};

export default Step6Name;
