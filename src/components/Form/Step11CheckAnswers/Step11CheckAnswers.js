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
      {/* Ticket Details */}
      <h3>Ticket details</h3>
      <div className="wmnds-grid">
        <DataRow
          label="Swift card details"
          value={formData.SwiftCardNumber}
          goToStep={3}
        />
        <DataRow
          label="Resuming Travel"
          value={formData.TravelAgain}
          goToStep={4}
        />
      </div>

      {/* Personal Details */}
      <h3>Personal details</h3>
      <div className="wmnds-grid">
        <DataRow
          label="Name"
          value={`${formData.Firstname} ${formData.Lastname}`}
          goToStep={6}
        />
        <DataRow
          label="Date of birth"
          value={formData.DateOfBirth}
          goToStep={7}
        />
        <DataRow
          label="Contact details"
          value={`${formData.PhoneNumber}<br/> ${formData.Email}`}
          goToStep={8}
        />
      </div>
    </>
  );
};

export default Step11CheckAnswers;
