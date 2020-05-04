import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { FormContext } from 'globalState/FormContext';
import { FormErrorContext } from 'globalState/FormErrorContext';
// Import components
import DirectDebit from './DirectDebit/DirectDebit';
import SwiftCard from './SwiftCard/SwiftCard';
import TicketNumber from './TicketNumber/TicketNumber';
import SoMTicketNumber from './SoMTicketNumber/SoMTicketNumber';
// import SoMTicketNumber from './SoMTicketNumber/SoMTicketNumber';
import UploadTicket from './UploadTicket/UploadTicket';
import LastUsed from './LastUsed/LastUsed';
import HowProcess from './HowProcess/HowProcess';
import GenericError from '../../shared/Errors/GenericError';

const Step3 = ({
  currentStep,
  setCurrentStep,
  isPaperTicket,
  isSwiftOnMobile,
  formRef,
}) => {
  const [formState] = useContext(FormContext); // Get the state of form data from FormContext
  const [errorState, errorDispatch] = useContext(FormErrorContext); // Get the error state of form data from FormErrorContext

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

  const { CustomerType, Application } = formState; // Destructure object

  // Set placeholder vars which we will change in the switch below (based on CustomerType)
  let elementsToRender; // Used to change conditional elements to render
  let shouldRenderUpload;

  // If a swift on mobile user (clicked in step 1)
  if (isSwiftOnMobile) {
    elementsToRender = <SoMTicketNumber />;
  }
  // Else if is paper ticket user (clicked in step 1)
  else if (isPaperTicket) {
    switch (CustomerType) {
      // If the paper ticket and customertype is DD
      case 'DirectDebit':
        elementsToRender = (
          <>
            <DirectDebit />
            <TicketNumber />
          </>
        );
        break;
      // If the paper ticket and customertype is Corporate
      case 'Corporate':
        elementsToRender = (
          <>
            <>
              <TicketNumber />
              <HowProcess />
            </>
          </>
        );
        break;
      // Else if paperTicket
      default:
        elementsToRender = <TicketNumber />;
        break;
    }

    // if a CustomerType is corporate then only show file upload if they have selected cancel ticket option in HowProcess
    // Otherwise if the customerType isn't corporate then show file upload.
    if (
      (CustomerType === 'Corporate' &&
        Application.ActionType === 'CancelTicket') ||
      CustomerType !== 'Corporate'
    ) {
      shouldRenderUpload = true; // Show FileUpload
    } else {
      shouldRenderUpload = false; // Hide FileUpload
    }
  }
  // If not a paper ticket or swift on mobile then must be online customertype so run switch on it
  else {
    // Switch on customer type, then change disabledState and elementsToRender accordingly
    switch (CustomerType) {
      // DirectDebit
      case 'DirectDebit':
        elementsToRender = (
          <>
            <DirectDebit />
            <SwiftCard />
          </>
        );

        break;

      //  Corporate
      case 'Corporate':
        elementsToRender = (
          <>
            <SwiftCard />
            <HowProcess />
          </>
        );

        break;

      // Worwise, Shop, SwiftPortal, OnlineSales(this won't happen as it is hidden in step2 unless paper ticket is chosen, so it will be part of the else statement below)
      // Pass isSwiftOnMobile state to see if user has selected this option in step 1, if so we show slightly different text for swiftCard
      default:
        elementsToRender = <SwiftCard />;
    }
  }

  return (
    <>
      <h2>Tell us about your ticket</h2>
      {errorState.errors.length && errorState.continuePressed && (
        <GenericError />
      )}

      {/* This changes based on switch logic above */}
      {elementsToRender}

      <LastUsed />

      {/* Only show this based on the logic set near top of file */}
      {shouldRenderUpload && <UploadTicket />}

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

Step3.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  isPaperTicket: PropTypes.bool.isRequired,
  isSwiftOnMobile: PropTypes.bool.isRequired,
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step3;
