import React, { useReducer, createContext } from 'react';

export const FormErrorContext = createContext(); // Create when context

export const FormErrorProvider = (props) => {
  const { children } = props || {};

  const initialState = {
    continuePressed: false,
    errors: [],
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the error state depending on action type
    switch (action.type) {
      // Add error to state
      case 'ADD_ERROR':
        return { ...state, errors: [...state.errors, action.payload] };

      // Remove error from statea
      case 'REMOVE_ERROR':
        return {
          ...state,
          errors: state.errors.filter((item) => item !== action.payload),
        };

      // Continue or Submit button pressed logic (toggles between true and false depending on errors in errors array)
      case 'CONTINUE_PRESSED':
        return {
          ...state,
          continuePressed: action.payload,
        };

      // Default should return intial state if error
      default:
        return initialState;
    }
  };
  // Set up reducer using reducer logic and initialState by default
  const [errorState, errorDispatch] = useReducer(reducer, initialState);

  return (
    <FormErrorContext.Provider value={[errorState, errorDispatch]}>
      {children}
    </FormErrorContext.Provider>
  );
};
