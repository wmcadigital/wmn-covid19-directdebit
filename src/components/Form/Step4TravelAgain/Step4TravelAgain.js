import React from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
import useWho from 'customHooks/useWho';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';

const Step4TravelAgain = ({ formRef }) => {
  // Custom hook for handling continue button (validation, errors etc)
  const { register, showGenericError, continueButton } = useStepLogic(formRef);
  const { youThey } = useWho(); // Use custom hook which changes your/their based on what user selected in step 1

  return (
    <>
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
    </>
  );
};

Step4TravelAgain.propTypes = {
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step4TravelAgain;
