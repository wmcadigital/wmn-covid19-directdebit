import React from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';

const Step1TicketHolder = ({ setCurrentStep, setIsTicketHolder, formRef }) => {
  const { register, showGenericError, handleContinue } = useStepLogic(
    setCurrentStep,
    formRef
  ); // Custom hook for handling continue button (validation, errors etc)

  // Update customerType on radio button change
  const handleRadioChange = (e) => {
    // If paper ticket chosen
    if (e.target.value === 'yes') {
      setIsTicketHolder(true); // Then set paper ticket to true (value used in step 3)
    } else {
      setIsTicketHolder(false); // Else set to false
    }
  };

  return (
    <>
      {/* Show generic error message */}
      {showGenericError}

      <Radios
        name="TicketHolder"
        label="Are you the ticket holder?"
        radios={[
          { text: 'Yes', value: 'yes' },
          { text: 'No', value: 'no' },
        ]}
        fieldRef={register({ required: 'Select are you the ticket holder' })}
        onChange={handleRadioChange}
      />
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
