import React, { useReducer, createContext } from 'react';

export const FormDataContext = createContext(); // Create when context

export const FormProvider = (props) => {
  const { children } = props || {};

  // Set intial state of when
  const initialState = {
    currentStep: 1,
    formData: {},
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the point to chosen
    switch (action.type) {
      // Remove the waypoint by the id
      case 'UPDATE_FORM_DATA': {
        return {
          ...state,
          formData: { ...state.form, ...action.payload },
        };
      }

      // Remove the waypoint by the id
      case 'UPDATE_STEP': {
        return {
          ...state,
          currentStep: action.payload,
        };
      }

      // Default should return intial state if error
      default:
        return initialState;
    }
  };

  // Set up reducer using reducer logic and initialState by default
  const [formState, formDispatch] = useReducer(reducer, initialState);

  // Pass state and dispatch in context and make accessible to children it wraps
  return (
    <FormDataContext.Provider value={[formState, formDispatch]}>
      {children}
    </FormDataContext.Provider>
  );
};
