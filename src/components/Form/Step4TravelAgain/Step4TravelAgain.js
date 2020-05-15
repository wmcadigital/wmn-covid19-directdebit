import React, { useRef } from 'react';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
import useWho from 'customHooks/useWho';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';

const Step4TravelAgain = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const {
    register,
    handleSubmit,
    showGenericError,
    continueButton,
  } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)
  const { youThey } = useWho(); // Use custom hook which changes your/their based on what user selected in step 1

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      {/* Show generic error message */}
      {showGenericError}

      <Radios
        name="TravelAgain"
        label={`Have ${youThey} started to travel again?`}
        radios={[
          { text: 'Yes', value: 'yes' },
          { text: 'No', value: 'no' },
        ]}
        fieldValidation={register({
          required: `Select have ${youThey} started to travel again`,
        })}
      />

      {/* Continue button */}
      {continueButton}
    </form>
  );
};

export default Step4TravelAgain;
