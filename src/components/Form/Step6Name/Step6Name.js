import React from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Input from 'components/shared/FormElements/Input/Input';

const Step6Name = ({ formRef }) => {
  const { register, showGenericError, handleContinue } = useStepLogic(formRef);

  // Labels used on inputs and for validation
  const fNameLabel = 'First name';
  const lNameLabel = 'Last name';

  // Logic used to validate fields
  const fieldValidation = (name) => {
    return register({ required: `${name} is required` });
  };

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
          <h2>What is your name?</h2>
        </legend>
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

Step6Name.propTypes = {
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step6Name;
