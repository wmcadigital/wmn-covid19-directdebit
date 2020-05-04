import { useState, useContext, useEffect } from 'react';
// Import contexts
import { FormContext } from 'globalState/FormContext';
import { FormErrorContext } from 'globalState/FormErrorContext';

const useFileUploadValidation = () => {
  const [formState, formDispatch] = useContext(FormContext); // Get the state of form data from FormContext
  const [errorState, errorDispatch] = useContext(FormErrorContext); // Get the state of form data from FormContext

  // Local state for controlling file upload
  const [isFileInputFocused, setIsFileInputFocused] = useState(false); // This is used to emulate the input focus class on the label
  const [fileName, setFileName] = useState('Upload photo'); // Used to change the name of the input/label button to the users file name

  // set up state for the inputs error prop
  const [error, setError] = useState(null);
  const [isTouched, setIsTouched] = useState(false);
  const [fileSize, setFileSize] = useState(0);

  const value = formState.Application.PhotoBase64Extension || ''; // Get value from state

  const handleChange = (e) => {
    const file = e.target.files[0];

    // If a file exists (user hasn't clicked cancel button or something)
    if (file) {
      setFileName(file.name); // Set file name that the user has chosen (this will display in our label)
      setFileSize(file.size); // Set file size of the file

      const PhotoBase64Extension = file.type.split('/')[1]; // => image/png (split at '/' and grab second part 'png')
      // Start base64'n our uploaded image
      const reader = new FileReader(); // Start new file reader
      reader.readAsDataURL(file); // Read file as dataURL
      // When loaded
      reader.onloadend = () => {
        // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
        const PhotoBase64 = reader.result.replace(/^data:.+;base64,/, '');

        // Update our formData with the base64Extension and Base64 photo
        formDispatch({
          type: 'UPDATE_FORM_DATA',
          payload: { PhotoBase64Extension, PhotoBase64 },
        });
      };
    }
  };

  // HandleFocus (when user joins input)
  const handleFocus = () => {
    setIsTouched(true); // Set touched as the input has been touched by user (used below to determine whether to show errors)
    setIsFileInputFocused(true); // Set input to focus
  };

  // Handleblur (when user leaves input), set input to unfocus
  const handleBlur = () => setIsFileInputFocused(false);

  // Handle validation
  // Re-use this logic everytime state is updated
  useEffect(() => {
    // If the user has touched the input then we can show errors / OR / If user has clicked continue/submit button
    if (isTouched || errorState.continuePressed) {
      if (!value) {
        setError('Select a photo');
      } else if (value !== 'png' && value !== 'jpg' && value !== 'jpeg') {
        setError('The selected file must be a JPG, JPEG, or PNG');
      } else if (fileSize > 4194304) {
        setError('The selected file must be smaller than 4MB');
      }
      // Else all is good, so reset error
      else {
        setError(null);
      }
    }
  }, [fileSize, value, isTouched, errorState.continuePressed]);

  // UseEffect to control global error state (this is used to halt the continue/submit button)
  useEffect(() => {
    // If there is an error or there is no value in the input
    if (error || !value.length) {
      errorDispatch({ type: 'ADD_ERROR', payload: 'fileUpload' }); // Then add this error to global error state
    } else {
      errorDispatch({ type: 'REMOVE_ERROR', payload: 'fileUpload' }); // Else remove from global error state
    }
  }, [error, errorDispatch, value.length]);

  // return object
  return {
    handleBlur,
    handleChange,
    handleFocus,
    isFileInputFocused,
    fileName,
    error,
  };
};

export default useFileUploadValidation;
