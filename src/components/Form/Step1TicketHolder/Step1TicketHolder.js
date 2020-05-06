import React from 'react';
import PropTypes from 'prop-types';
// Import contexts
// import { FormErrorContext } from 'globalState/FormErrorContext';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';
// import GenericError from 'components/shared/Errors/GenericError';
import { useFormContext } from 'react-hook-form';

const Step1TicketHolder = ({ setCurrentStep, setIsTicketHolder, formRef }) => {
  const { register, formState, triggerValidation } = useFormContext();
  // console.log(errors);
  // const [errorState, errorDispatch] = useContext(FormErrorContext); // Get the error state of form data from FormErrorContext
  // Update customerType on radio button change
  // const handleRadioChange = (e) => {
  //   if (e.target.value) {
  //     errorDispatch({ type: 'REMOVE_ERROR', payload: 'TicketHolder' }); // Else remove from global error state
  //   }
  //   // If paper ticket chosen
  //   if (e.target.value === 'yes') {
  //     setIsTicketHolder(true); // Then set paper ticket to true (value used in step 3)
  //   } else {
  //     setIsTicketHolder(false); // Else set to false
  //   }
  // };

  // Update the current step to the correct one depending on users selection
  const handleContinue = () => {
    const validate = async () => {
      const result = await triggerValidation('TicketHolder');
      if (result) {
        setCurrentStep((i) => i + 1);
      }
    };
    validate();
    // If errors, then don't progress and set continue button to true(halt form and show errors)
    // if (errorState.errors.length) {
    //   window.scrollTo(0, formRef.current.offsetTop); // Scroll to top of form
    //   errorDispatch({ type: 'CONTINUE_PRESSED', payload: true }); // set continue button pressed to true so errors can show
    // } else {
    //   errorDispatch({ type: 'CONTINUE_PRESSED', payload: false }); // Reset submit button pressed before going to next step
    //   setCurrentStep((i) => i + 1);
    //   window.scrollTo(0, 0); // Scroll to top of page
    // }
  };
  return (
    <>
      {/* {errorState.errors.length > 0 && errorState.continuePressed && (
        <GenericError />
      )} */}
      {JSON.stringify(formState, null, 2)}

      <Radios
        name="TicketHolder"
        label="Are you the ticket holder?"
        radios={[
          { text: 'Yes', value: 'yes' },
          { text: 'No', value: 'no' },
        ]}
        fieldRef={register({ required: true })}
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

Step1TicketHolder.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
  setIsTicketHolder: PropTypes.func.isRequired,
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step1TicketHolder;
