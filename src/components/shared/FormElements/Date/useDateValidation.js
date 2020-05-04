import { useState, useContext, useEffect } from 'react';
// Import contexts
import { FormContext } from 'globalState/FormContext';
import { FormErrorContext } from 'globalState/FormErrorContext';

const useInputValidation = (name, label, customValidation) => {
  const [, formDispatch] = useContext(FormContext); // Get the state of form data from FormContext
  const [errorState, errorDispatch] = useContext(FormErrorContext); // Get the state of form data from FormContext

  // set up state for the inputs error prop

  // State used for capturing date fields onChange below (we use these to validate against below)
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [date, setDate] = useState();

  // set up state for the inputs error prop
  const [error, setError] = useState(null);
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;

    // Switch on the input name, depending on name then update the relevant var
    switch (e.target.name) {
      case `${name}Day`:
        // If value is less than ten and greater than 0 (1-9) and is only 1 in length (so not 08)
        if (value < 10 && value > 0 && value.length === 1) {
          setDay(0 + value); // Then prepend a 0 to it to make it a valid day
        } else {
          setDay(value);
        }
        break;
      case `${name}Month`:
        // If value is less than ten and greater than 0 (1-9) and is only 1 in length (so not 08)
        if (value < 10 && value > 0 && value.length === 1) {
          setMonth(0 + value); // Then prepend a 0 to it to make it a valid month
        } else {
          setMonth(value);
        }
        break;
      default:
        setYear(value);
    }
  };

  // set up event handler for onBlur
  function handleBlur() {
    setIsTouched(true); // Set touched as the input has been touched by user (used below to determine whether to show errors)
  }

  // Whenever the date is changed, then update state
  useEffect(() => {
    // Update state
    formDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { [name]: date },
    });
  }, [date, formDispatch, name]);

  // Handle validation
  // Re-use this logic everytime state is updated
  useEffect(() => {
    setDate(`${year}-${month}-${day}`); // Set date state to current yyyy-mm-dd set by user (would do it in handleChange event but it falls out of sync)

    const dateRegex = /^((((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[13578]|10|12)([-])(0[1-9]|[12][0-9]|3[01]))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[469]|11)([-])([0][1-9]|[12][0-9]|30))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(02)([-])(0[1-9]|1[0-9]|2[0-8]))|(([02468][048]00)([-])(02)([-])(29))|(([13579][26]00)([-])(02)([-])(29))|(([0-9][0-9][0][48])([-])(02)([-])(29))|(([0-9][0-9][2468][048])([-])(02)([-])(29))|(([0-9][0-9][13579][26])([-])(02)([-])(29)))$/; // Date regex http://regexlib.com/REDetails.aspx?regexp_id=1850
    const d = new Date().toISOString().slice(0, 10); // Set todays date as yyyy-mm-dd

    // If the user has touched the input then we can show errors / OR / If user has clicked continue/submit button
    if (isTouched || errorState.continuePressed) {
      // If there is no day
      if (!day) {
        setError(`${label} must include day`);
      }
      // If there is no month
      else if (!month) {
        setError(`${label} must include month`);
      }
      // If there is no year
      else if (!year) {
        setError(`${label} must include year`);
      }
      // If not a valid date (yyyy-mm-dd)
      else if (!dateRegex.test(date)) {
        setError(
          `Enter ${label.toLowerCase()} in the correct format, for example 18 03 2020`
        );
      }
      // Date must be in future
      else if (date > d) {
        setError(`${label} must be today or in the past`);
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
    date,
    day,
    errorState.continuePressed,
    isTouched,
    label,
    month,
    year,
  ]);

  // UseEffect to control global error state (this is used to halt the continue/submit button)
  useEffect(() => {
    // If there is an error or there is no value in the input
    if (error || !day.length || !month.length || !year.length) {
      errorDispatch({ type: 'ADD_ERROR', payload: name }); // Then add this error to global error state
    } else {
      errorDispatch({ type: 'REMOVE_ERROR', payload: name }); // Else remove from global error state
    }
  }, [day.length, error, errorDispatch, month.length, name, year.length]);

  // return object
  return {
    handleChange,
    handleBlur,
    error,
  };
};

export default useInputValidation;
