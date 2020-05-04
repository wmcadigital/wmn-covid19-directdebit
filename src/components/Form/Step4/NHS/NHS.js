import React, { useContext } from 'react';
// Import contexts
import { FormContext } from 'globalState/FormContext';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';

const NHS = () => {
  const [, formDispatch] = useContext(FormContext); // Get the state of form data from FormContext

  // Update NHS on radio button change
  const handleRadioChange = (e) =>
    formDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { NHS: e.target.value },
    });

  return (
    <Radios
      name="NHS"
      label="Do you work for the NHS?"
      radios={[
        {
          text: 'Yes',
          value: true,
        },
        {
          text: `No`,
          value: false,
        },
      ]}
      onChange={handleRadioChange}
    />
  );
};

export default NHS;
