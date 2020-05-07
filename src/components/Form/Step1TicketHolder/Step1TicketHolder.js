import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { useFormContext } from 'react-hook-form';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';
import GenericError from 'components/shared/Errors/GenericError';

const Step1TicketHolder = ({ setCurrentStep, setIsTicketHolder, formRef }) => {
  const { register, errors, triggerValidation } = useFormContext();
  const [isContinuePressed, setIsContinuePressed] = useState(false);

  // Update customerType on radio button change
  const handleRadioChange = (e) => {
    // If paper ticket chosen
    if (e.target.value === 'yes') {
      setIsTicketHolder(true); // Then set paper ticket to true (value used in step 3)
    } else {
      setIsTicketHolder(false); // Else set to false
    }
  };

  // Update the current step to the correct one depending on users selection
  const handleContinue = async () => {
    const result = await triggerValidation();
    setIsContinuePressed(true);

    // if no errors
    if (result) {
      setCurrentStep((i) => i + 1);
    }
    // else, errors are true...
    else {
      window.scrollTo(0, formRef.current.offsetTop); // Scroll to top of form
    }
  };
  return (
    <>
      {Object.keys(errors).length > 0 && isContinuePressed && <GenericError />}

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
