// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Input from 'components/shared/FormElements/Input/Input';
import PropTypes from 'prop-types';
import React from 'react';

const Step8Contact = ({formRef}) => {
  // Custom hook for handling continue button (validation, errors etc)
  const { register, showGenericError, continueButton } = useStepLogic(formRef);

  // Labels used on inputs and for validation
  const emailLabel = 'Email address';
  const phoneLabel = 'UK telephone number';

  // Logic used to validate the email field
  const emailRegex = /^[\w!#$%&amp;'*+\-/=?^_`{|}~]+(\.[\w!#$%&amp;'*+\-/=?^_`{|}~]+)*@((([-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$/; // Matches email regex on server
  const emailValidation = register({
    required: `${emailLabel} is required`,
    pattern: {
      value: emailRegex,
      message: `Enter an ${emailLabel.toLowerCase()} in the correct format`,
    },
  });

  // Logic used to validate the telephone field
  const phoneRegex = /^\s*(([+]\s?\d[-\s]?\d|0)?\s?\d([-\s]?\d){9,10}|[(]\s?\d([-\s]?\d)+\s*[)]([-\s]?\d)+)\s*$/; // Got from https://www.codeproject.com/Questions/1016303/How-to-write-a-regular-expression-for-UK-phone-num adapated the middle part so it can contain between 9 and 10 chars {9,10}
  const phoneValidation = register({
    required: `${phoneLabel} is required`,
    pattern: {
      value: phoneRegex,
      message: `Enter a ${phoneLabel}, like 01632 960 001, 07700 900 982 or + 44 0808 157 0192`,
    },
  });

  return (
    <>
      {/* Subsection */}
      <div>
        Section 2 of 3 <h4>About you</h4>
      </div>

      {/* Show generic error message */}
      {showGenericError}

      <h2>Contact details</h2>
      <p>
        We’ll use this information to contact you if we have any questions and
        send updates about your application
      </p>

      {/* Email */}
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h3 className="wmnds-fe-question">What is your email address?</h3>
        </legend>

        <Input
          className="wmnds-col-sm-1-2"
          name="Email"
          label={`${emailLabel}, for example name@example.com`}
          type="email"
          autocomplete="email"
          fieldValidation={emailValidation}
        />
      </fieldset>

      {/* Telephone */}
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h3 className="wmnds-fe-question">What is your telephone number?</h3>
        </legend>
        <Input
          className="wmnds-col-sm-1-2"
          name="PhoneNumber"
          label={phoneLabel}
          inputmode="numeric"
          autocomplete="tel-national"
          fieldValidation={phoneValidation}
        />
      </fieldset>

      {/* Continue button */}
      {continueButton}
    </>
  );
};

Step8Contact.propTypes = {
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step8Contact;
