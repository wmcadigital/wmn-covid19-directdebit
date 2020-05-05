import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { FormErrorContext } from 'globalState/FormErrorContext';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';
import GenericError from 'components/shared/Errors/GenericError';

const Step4TravelAgain = ({ setCurrentStep, setHasTravelAgain, formRef }) => {
  const [errorState, errorDispatch] = useContext(FormErrorContext); // Get the error state of form data from FormErrorContext
  // Update customerType on radio button change
  const handleRadioChange = (e) => {
    if (e.target.value) {
      errorDispatch({ type: 'REMOVE_ERROR', payload: 'TravelAgain' }); // Else remove from global error state
    }
    // If paper ticket chosen
    if (e.target.value === 'yes') {
      setHasTravelAgain(true); // Then set paper ticket to true (value used in step 3)
    } else {
      setHasTravelAgain(false); // Else set to false
    }
  };

  // Update the current step to the correct one depending on users selection
  const handleContinue = () => {
    // If errors, then don't progress and set continue button to true(halt form and show errors)
    if (errorState.errors.length) {
      window.scrollTo(0, formRef.current.offsetTop); // Scroll to top of form
      errorDispatch({ type: 'CONTINUE_PRESSED', payload: true }); // set continue button pressed to true so errors can show
    } else {
      errorDispatch({ type: 'CONTINUE_PRESSED', payload: false }); // Reset submit button pressed before going to next step
      setCurrentStep((i) => i + 1);
      window.scrollTo(0, 0); // Scroll to top of page
    }
  };
  return (
    <>
      {errorState.errors.length > 0 && errorState.continuePressed && (
        <GenericError />
      )}
      <Radios
        name="TravelAgain"
        label="Have you started to travel again?"
        radios={[
          { text: 'Yes', value: 'yes' },
          { text: 'No', value: 'no' },
        ]}
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

Step4TravelAgain.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
  setHasTravelAgain: PropTypes.func.isRequired,
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step4TravelAgain;
