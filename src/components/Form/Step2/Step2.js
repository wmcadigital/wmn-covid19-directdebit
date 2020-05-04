import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { FormContext } from 'globalState/FormContext';
import { FormErrorContext } from 'globalState/FormErrorContext';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';
import GenericError from 'components/shared/Errors/GenericError';

const Step2 = ({ currentStep, setCurrentStep, isPaperTicket, formRef }) => {
  const [, formDispatch] = useContext(FormContext); // Get the state of form data from FormContext
  const [errorState, errorDispatch] = useContext(FormErrorContext); // Get the error state of form data from FormErrorContext

  // Update customerType on radio button change
  const handleRadioChange = (e) =>
    formDispatch({
      type: 'UPDATE_CUSTOMER_TYPE',
      payload: e.target.value,
    });

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

  //  Set up default radio options (shown for both paper ticket and swift card)
  const radios = [
    {
      text: 'I pay monthly by Direct Debit',
      value: 'DirectDebit',
    },
    {
      text: 'I bought it from the West Midlands Network or Swift website',
      value: 'SwiftPortal',
    },
    {
      text: 'I pay for it through my company',
      value: 'Corporate',
    },

    {
      text: 'I bought it from a West Midlands Network travel shop, railway station ticket office or Payzone shop',
      value: 'Shop',
    },
  ];

  // If the user has selected something other than paper ticket in step 1
  if (!isPaperTicket) {
    const workwise = { text: 'I am on the Workwise scheme', value: 'Workwise' };
    const ticketMachine = {
      text: 'I bought it from a Swift kiosk',
      value: 'SwiftPortal',
    };

    radios.splice(-1, 0, workwise); // push workwise radio option to last before 1 in radio list
    radios.splice(-1, 0, ticketMachine); // push ticketMachine radio option to last before 1 in radio list
  }

  return (
    <>
      <h2>Tell us about your ticket</h2>
      {errorState.errors.length > 0 && errorState.continuePressed && (
        <GenericError />
      )}
      <Radios
        name="CustomerTypeStep2"
        label="How did you buy your ticket?"
        radios={radios}
        onChange={handleRadioChange}
      />

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

Step2.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  isPaperTicket: PropTypes.bool.isRequired,
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step2;
