// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';
import PropTypes from 'prop-types';
import React from 'react';

const Step4TravelAgain = ({formRef}) => {
  // Custom hook for handling continue button (validation, errors etc)
  const {register, showGenericError, continueButton} = useStepLogic(formRef);

  return (
    <>
      {/* Show generic error message */}
      {showGenericError}

      <Radios
  name = "TravelAgain"
  label = "Have you started to travel again?"
        radios={[
          { text: 'Yes', value: 'yes' },
          { text: 'No', value: 'no' },
        ]}
        fieldValidation={
    register({
      required : 'Select have you started to travel again',
    })}
      />

      {/* Continue button */}
      {continueButton}
    </>
  );
};

Step4TravelAgain.propTypes = {
  formRef :
      PropTypes
          .oneOfType([
            // Either a function
            PropTypes.func,
            // Or the instance of a DOM native element (see the note about SSR)
            PropTypes.shape({current : PropTypes.instanceOf(Element)}),
          ])
          .isRequired,
};

export default Step4TravelAgain;
