import { useState, useContext, useEffect } from 'react';
// Import contexts
import { FormContext } from 'globalState/FormContext';
import { FormErrorContext } from 'globalState/FormErrorContext';

const useInputValidation = (
  name,
  label,
  inputmode,
  customValidation,
  validation
) => {
  // set up the state for the inputs value prop and set it to the default value
  const [formState, formDispatch] = useContext(FormContext); // Get the state of form data from FormContext
  const [errorState, errorDispatch] = useContext(FormErrorContext); // Get the state of form data from FormContext
  // set up state for the inputs error prop
  const [error, setError] = useState(null);
  const [isTouched, setIsTouched] = useState(false);

  const value = formState.Application[name] || ''; // Get value from state

  // set up the event handler for onChange event
  function handleChange(e) {
    // When input is changed then update state
    let val = e.target.value;
    if (name === 'AddressPostcode') {
      val = val.toUpperCase();
    }
    formDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { [name]: val },
    });
  }

  // set up event handler for onBlur
  function handleBlur() {
    setIsTouched(true); // Set touched as the input has been touched by user (used below to determine whether to show errors)
  }

  // Handle validation
  // Re-use this logic everytime state is updated
  useEffect(() => {
    // If the user has touched the input then we can show errors / OR / If user has clicked continue/submit button && validation is required (this is so we can set validation to false for optional inputs)
    if (
      (isTouched && validation) ||
      (errorState.continuePressed && validation)
    ) {
      // If there is no length
      if (!value.length) {
        setError(`Enter your ${label}`);
      }
      // If input is numeric and isn't a phone number(we handle phone number with custom regex in it's own file) then it should only contain numbers
      else if (
        inputmode === 'numeric' &&
        !/^\d+$/.test(value) &&
        name !== 'PhoneNumber'
      ) {
        setError(`${label} must only include numbers`);
      }
      // Run custom validation logic
      else if (customValidation) {
        setError(customValidation());
      }
      // Else all is good, so reset error
      else {
        setError(null);
      }
    }
  }, [
    customValidation,
    errorState.continuePressed,
    inputmode,
    isTouched,
    label,
    name,
    validation,
    value,
  ]);

  // UseEffect to control global error state (this is used to halt the continue/submit button)
  useEffect(() => {
    // If there is an error or there is no value in the input && validation is required
    if (error || (!value.length && validation)) {
      errorDispatch({ type: 'ADD_ERROR', payload: name }); // Then add this error to global error state
    } else {
      errorDispatch({ type: 'REMOVE_ERROR', payload: name }); // Else remove from global error state
    }
  }, [error, errorDispatch, name, validation, value.length]);

  // return object
  return {
    handleChange,
    handleBlur,
    error,
  };
};

export default useInputValidation;
