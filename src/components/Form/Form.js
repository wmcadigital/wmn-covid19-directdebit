import React, { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { FormContext } from 'globalState/FormContext';
import { FormErrorContext } from 'globalState/FormErrorContext';

// Import components
import Step1 from 'components/Form/Step1/Step1';
import Step2 from 'components/Form/Step2/Step2';
import Step3 from 'components/Form/Step3/Step3';
import Step4 from 'components/Form/Step4/Step4';
import ProgressIndicator from './ProgressIndicator/ProgressIndicator';
// Import custom hooks
import useTrackFormAbandonment from './useTrackFormAbandonment';
import useLogRocketTracking from './useLogRocketTracking';
// Import styling
import s from './Form.module.scss';

const Form = ({ formSubmitStatus, setFormSubmitStatus }) => {
  const [formState, formDispatch] = useContext(FormContext); // Get the state of form data from FormContext
  const [errorState, errorDispatch] = useContext(FormErrorContext); // Get the error state of form data from FormErrorContext

  const formRef = useRef(null); // Ref for tracking the dom of the form (used in Google tracking)
  const [currentStep, setCurrentStep] = useState(1);
  const [isPaperTicket, setIsPaperTicket] = useState(false); // Used to track if a user is using a paper ticket (set in step 1). Then read this value in step 3 to show 'upload proof/photo'
  const [isSwiftOnMobile, setIsSwiftOnMobile] = useState(false); // Used to track if a user has clicked Swift On Mobile (set in step 1). Then read this value in step 3 to show 'different text for swift card number'
  const [isFetching, setIsFetching] = useState(false);

  useTrackFormAbandonment(formRef, currentStep, formSubmitStatus, formState); // Used to track user abandonment via Google Analytics/Tag Manager

  useLogRocketTracking(formState, isPaperTicket, isSwiftOnMobile); // Used to track javascript errors etc. in Log Rocket

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission method

    // If error
    if (errorState.errors.length) {
      window.scrollTo(0, formRef.current.offsetTop); // Scroll to top of form
      errorDispatch({ type: 'CONTINUE_PRESSED', payload: true }); // set continue button pressed to true so errors can show
    } else {
      window.dataLayer = window.dataLayer || []; // Set datalayer (GA thing)
      errorDispatch({ type: 'CONTINUE_PRESSED', payload: false }); // Reset submit button pressed before going to next step

      setIsFetching(true); // Set this so we can put loading state on button

      // Go hit the API with the data
      fetch(process.env.REACT_APP_API_HOST, {
        method: 'post',
        body: JSON.stringify(formState),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // If the response is successful(200: OK)
          if (response.status === 200) {
            return response.text(); // Return response (reference number)
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })
        .then((payload) => {
          // If formsubmission is successful
          formDispatch({ type: 'ADD_FORM_REF', payload }); // Update form state with the form ref received from server
          // Log event to analytics/tag manager
          window.dataLayer.push({
            event: 'formAbandonment',
            eventCategory: 'Refund form submission: success',
            eventAction: `CustomerType:${formState.CustomerType}`,
          });
          setIsFetching(false); // set to false as we are done fetching now
          setFormSubmitStatus(true); // Set form status to success
          window.scrollTo(0, 0); // Scroll to top of page
        })
        .catch((error) => {
          // If formsubmission errors
          // eslint-disable-next-line no-console
          console.error({ error });
          let errMsg;

          if (error.text) {
            error.text().then((errorMessage) => {
              errMsg = errorMessage;
            });
          } else {
            errMsg = error;
          }

          // Log event to analytics/tag manager
          window.dataLayer.push({
            event: 'formAbandonment',
            eventCategory: 'Refund form submission: error',
            eventAction: errMsg,
          });
          setIsFetching(false); // set to false as we are done fetching now
          setFormSubmitStatus(false); // Set form status to error
          window.scrollTo(0, 0); // Scroll to top of page
        });
    }
  };

  return (
    <>
      <div className="wmnds-col-1 wmnds-col-md-3-4 ">
        <ProgressIndicator currentStep={currentStep} />
        <div className={`wmnds-p-lg ${s.formWrapper}`}>
          {/* Start of form */}
          <form onSubmit={handleSubmit} autoComplete="on" ref={formRef}>
            {currentStep === 1 && (
              <Step1
                formRef={formRef}
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
                setIsPaperTicket={setIsPaperTicket}
                setIsSwiftOnMobile={setIsSwiftOnMobile}
              />
            )}
            {currentStep === 2 && (
              <Step2
                formRef={formRef}
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
                isPaperTicket={isPaperTicket}
              />
            )}
            {currentStep === 3 && (
              <Step3
                formRef={formRef}
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
                isPaperTicket={isPaperTicket}
                isSwiftOnMobile={isSwiftOnMobile}
              />
            )}
            {currentStep === 4 && (
              <Step4
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
                isFetching={isFetching}
              />
            )}
          </form>
        </div>
      </div>
      {/* If not built for Umbraco based on envs then show debugging */}
      {process.env.REACT_APP_UMBRACO === 'false' && (
        <pre
          className="wmnds-col-1 wmnds-col-md-1-4 wmnds-p-md"
          style={{
            overflowX: 'auto',
            position: 'fixed',
            right: 0,
          }}
        >
          {JSON.stringify(formState, null, 2)}
        </pre>
      )}
    </>
  );
};

Form.propTypes = {
  formSubmitStatus: PropTypes.bool,
  setFormSubmitStatus: PropTypes.func.isRequired,
};

Form.defaultProps = {
  formSubmitStatus: null,
};

export default Form;
