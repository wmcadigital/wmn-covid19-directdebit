import React, { useContext } from 'react';
// Import contexts
import { FormContext } from 'globalState/FormContext';
// Import components
import Radios from 'components/shared/FormElements/Radios/Radios';

const HowProcess = () => {
  const [, formDispatch] = useContext(FormContext); // Get the state of form data from FormContext

  // Update customerType on radio button change
  const handleRadioChange = (e) =>
    formDispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { ActionType: e.target.value },
    });

  return (
    <Radios
      name="ActionType"
      label="Choose how we process your application"
      radios={[
        {
          text:
            '<strong>Cancel</strong> your ticket and get a refund for the period you have not travelled. We will process your refund from the date you last travelled up to the ticket expiry date and you will no longer be able to travel using this ticket.',
          value: 'CancelTicket',
        },
        {
          text: `<strong>Suspend</strong> your ticket. Complete the refund form and let us know when you go back to work. We will calculate your refund from the the date you last travelled up to the day before you use your Swift card again.
          <br /><br />
          By suspending your ticket, you will continue to pay monthly deductions from your salary and you can use the same Swift card on your first day back at work. The refund will be sent directly to you.`,
          value: 'NotTravelling',
        },
      ]}
      onChange={handleRadioChange}
    />
  );
};

export default HowProcess;
