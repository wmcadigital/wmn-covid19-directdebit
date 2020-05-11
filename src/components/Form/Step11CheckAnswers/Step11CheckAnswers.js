import React, { useContext } from 'react';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';
import DataRow from './DataRow/DataRow';

const Step11CheckAnswers = () => {
  const [formDataState] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const { formData } = formDataState;

  return (
    <>
      <h2>Check your answers before reinstating their Direct Debit</h2>
      <h3>Personal details</h3>
      <div className="wmnds-grid">
        <DataRow
          value={`${formData.Firstname} ${formData.Lastname}`}
          goToStep={6}
        />
      </div>
    </>
  );
};

export default Step11CheckAnswers;
