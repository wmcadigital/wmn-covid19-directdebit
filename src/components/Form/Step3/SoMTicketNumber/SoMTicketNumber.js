import React from 'react';

// Import components
import Input from 'components/shared/FormElements/Input/Input';

const SoMTicketNumber = () => {
  return (
    <fieldset className="wmnds-fe-fieldset">
      <legend className="wmnds-fe-fieldset__legend">
        <h3 className="wmnds-fe-question">What is your ticket number?</h3>
        <p>This is the number in the history tab of the Swift on Mobile app</p>
      </legend>
      <Input
        className="wmnds-col-1-2 wmnds-col-sm-1-5"
        name="TicketNumber"
        label="Ticket number"
        inputmode="numeric"
      />
    </fieldset>
  );
};

export default SoMTicketNumber;
