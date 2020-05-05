import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { FormErrorContext } from 'globalState/FormErrorContext';
import { FormContext } from 'globalState/FormContext';
// Import components
import GenericError from 'components/shared/Errors/GenericError';
import Input from 'components/shared/FormElements/Input/Input';

const Step8Contact = ({ setCurrentStep, formRef }) => {
  const [errorState, errorDispatch] = useContext(FormErrorContext); // Get the error state of form data from FormErrorContext
  const [formState] = useContext(FormContext); // Get the state of form data from FormContext

  const customEmailValidation = () => {
    let error;

    const emailRegex = /^[\w!#$%&amp;'*+\-/=?^_`{|}~]+(\.[\w!#$%&amp;'*+\-/=?^_`{|}~]+)*@((([-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$/; // Matches email regex on server

    // If not a valid email address
    if (!emailRegex.test(formState.Application.Email)) {
      error = 'Enter an email address in the correct format';
    }

    return error;
  };

  const customPhoneValidation = () => {
    const phoneRegex = /^\s*(([+]\s?\d[-\s]?\d|0)?\s?\d([-\s]?\d){9,10}|[(]\s?\d([-\s]?\d)+\s*[)]([-\s]?\d)+)\s*$/; // Got from https://www.codeproject.com/Questions/1016303/How-to-write-a-regular-expression-for-UK-phone-num adapated the middle part so it can contain between 9 and 10 chars {9,10}
    let error;

    // Phone number should match UK specific phone number(s)
    if (!phoneRegex.test(formState.Application.PhoneNumber)) {
      error =
        'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192';
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
      <h2>Contact details</h2>
      <p>
        We’ll use this information to contact you if we have any questions and
        send updates about your application
      </p>
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h3 className="wmnds-fe-question">What is your email address?</h3>
        </legend>

        <Input
          className="wmnds-col-sm-1-2"
          name="Email"
          label="Email address, for example name@example.com"
          type="email"
          autocomplete="email"
          customValidation={customEmailValidation}
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
          label="UK telephone number"
          inputmode="numeric"
          autocomplete="tel-national"
          customValidation={customPhoneValidation}
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

Step8Contact.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step8Contact;
