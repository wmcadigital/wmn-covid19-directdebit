import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { FormContext } from 'globalState/FormContext';
import { FormErrorContext } from 'globalState/FormErrorContext';
// Import components
import GenericError from 'components/shared/Errors/GenericError';
import Input from 'components/shared/FormElements/Input/Input';

const Step3SwiftCard = ({ setCurrentStep, formRef }) => {
  const [formState] = useContext(FormContext); // Get the state of form data from FormContext
  const [errorState, errorDispatch] = useContext(FormErrorContext); // Get the error state of form data from FormErrorContext
  const label = 'Swift card number';

  const customValidation = () => {
    let error;
    const swiftNum = formState.form.SwiftCardNumber; // get swiftcard number from state
    const firstTen = swiftNum.substr(0, 10); // Get first ten chars of input

    // If card number starts with 6335970112 then user has NX card and needs to go to NX for refund
    if (firstTen === '6335970112') {
      error = `${label} is managed by National Express West Midlands and there is a
            <a
              href="https://nxbus.co.uk/west-midlands/news/ticket-refunds-due-to-covid19"
              title="National Express West Midlands ticket refund process"
              target="_blank"
              className="wmnds-link"
            >
              separate refund process
            </a>`;
    }
    // If swift card doesn't start with the below numbers then it's not valid
    else if (firstTen !== '6335970107' && firstTen !== '6335970319') {
      error = `Your ${label} is the long number on the front of the card`;
    }
    // Must be 18 digits long
    else if (swiftNum.length !== 18) {
      error = `Your ${label} is 18 digits long and begins with 633597`;
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
        Section 1 of 3 <h4>About your ticket</h4>
      </p>
      {errorState.errors.length > 0 && errorState.continuePressed && (
        <GenericError />
      )}
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>What is your Swift card number?</h2>
          <p>
            This is the long number on the front of the card and begins with{' '}
            <strong>633597</strong>
          </p>
          <p>Enter the number without spaces</p>
        </legend>
        <Input
          className="wmnds-col-1 wmnds-col-sm-3-4 wmnds-col-md-1-2"
          name="SwiftCardNumber"
          label={label}
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

Step3SwiftCard.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step3SwiftCard;
