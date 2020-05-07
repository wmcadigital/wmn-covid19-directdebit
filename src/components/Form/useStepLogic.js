import React, { useState } from 'react';
// Import contexts
import { useFormContext } from 'react-hook-form';
import GenericError from 'components/shared/Errors/GenericError';

const useStepLogic = (setCurrentStep, formRef) => {
  const { register, errors, triggerValidation } = useFormContext(); // Get useForm methods
  const [isContinuePressed, setIsContinuePressed] = useState(false); // State for tracking if continue has been pressed
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

  // If errors object has any keys and continue button is pressed then we should show generic error component
  const showGenericError = Object.keys(errors).length > 0 &&
    isContinuePressed && <GenericError />;

  return {
    register,
    showGenericError,
    handleContinue,
  };
};

export default useStepLogic;
