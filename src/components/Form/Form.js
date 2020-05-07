import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormContext } from 'react-hook-form'; // https://react-hook-form.com/

// Import contexts

// Import components
import Step1TicketHolder from 'components/Form/Step1TicketHolder/Step1TicketHolder';
import Step2DDRef from 'components/Form/Step2DDRef/Step2DDRef';
import Step3SwiftCard from 'components/Form/Step3SwiftCard/Step3SwiftCard';
import Step4TravelAgain from 'components/Form/Step4TravelAgain/Step4TravelAgain';
import Step5TravelDate from 'components/Form/Step5TravelDate/Step5TravelDate';
import Step6Name from 'components/Form/Step6Name/Step6Name';
import Step7DOB from './Step7DOB/Step7DOB';
import Step8Contact from './Step8Contact/Step8Contact';
import Step9DDPayMessage from './Step9DDPayMessage/Step9DDPayMessage';
import Step10DDBankDetails from './Step10DDBankDetails/Step10DDBankDetails';

// Import styling
import s from './Form.module.scss';

const Form = ({ formSubmitStatus, setFormSubmitStatus }) => {
  const methods = useForm({ mode: 'onBlur' });
  const { getValues } = methods;

  const onSubmit = (data) => console.log(data);

  const formRef = useRef(null); // Ref for tracking the dom of the form (used in Google tracking)
  const [currentStep, setCurrentStep] = useState(1);
  const [isTicketHolder, setIsTicketHolder] = useState(null); // Used to track if a user is using a paper ticket (set in step 1). Then read this value in step 3 to show 'upload proof/photo'
  const [hasTravelAgain, setHasTravelAgain] = useState(null); // Used to track if a user is using a paper ticket (set in step 1). Then read this value in step 3 to show 'upload proof/photo'

  return (
    <>
      {/* pass all methods into the context */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormContext {...methods}>
        <div className="wmnds-col-1 wmnds-col-md-3-4 ">
          <div className={`wmnds-p-lg ${s.formWrapper}`}>
            {/* Start of form */}
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              autoComplete="on"
              ref={formRef}
            >
              {currentStep === 1 && (
                <Step1TicketHolder
                  formRef={formRef}
                  setCurrentStep={setCurrentStep}
                  setIsTicketHolder={setIsTicketHolder}
                />
              )}
              {/* Section 1 - About your ticket */}
              {currentStep === 2 && (
                <Step2DDRef formRef={formRef} setCurrentStep={setCurrentStep} />
              )}
              {currentStep === 3 && (
                <Step3SwiftCard
                  formRef={formRef}
                  setCurrentStep={setCurrentStep}
                />
              )}
              {currentStep === 4 && (
                <Step4TravelAgain
                  formRef={formRef}
                  setCurrentStep={setCurrentStep}
                  setHasTravelAgain={setHasTravelAgain}
                />
              )}
              {currentStep === 5 && (
                <Step5TravelDate
                  formRef={formRef}
                  setCurrentStep={setCurrentStep}
                />
              )}
              {/* Section 2 - About you */}
              {currentStep === 6 && (
                <Step6Name formRef={formRef} setCurrentStep={setCurrentStep} />
              )}
              {currentStep === 7 && (
                <Step7DOB formRef={formRef} setCurrentStep={setCurrentStep} />
              )}
              {currentStep === 8 && (
                <Step8Contact
                  formRef={formRef}
                  setCurrentStep={setCurrentStep}
                />
              )}
              {/* Section 3 - Direct Debit */}
              {currentStep === 9 && (
                <Step9DDPayMessage setCurrentStep={setCurrentStep} />
              )}
              {currentStep === 10 && (
                <Step10DDBankDetails
                  formRef={formRef}
                  setCurrentStep={setCurrentStep}
                />
              )}
            </form>
          </div>
        </div>
        {/* If in development based on envs then show form debugging */}
        {process.env.NODE_ENV !== 'production' && (
          <>
            <pre
              className="wmnds-col-1 wmnds-col-md-1-4 wmnds-p-md"
              style={{
                overflowX: 'auto',
                position: 'fixed',
                right: 0,
              }}
            >
              {JSON.stringify(getValues(), null, 2)}
            </pre>
            <br />
          </>
        )}
      </FormContext>
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
