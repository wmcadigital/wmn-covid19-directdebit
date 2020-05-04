import React from 'react';
// Import contexts
// Import components
import Input from 'components/shared/FormElements/Input/Input';

const Name = () => {
  return (
    <fieldset className="wmnds-fe-fieldset">
      <legend className="wmnds-fe-fieldset__legend">
        <h3 className="wmnds-fe-question">What is your name?</h3>
      </legend>
      <Input
        className="wmnds-col-1-2 wmnds-col-sm-2-3"
        name="Firstname"
        label="First name"
        autocomplete="given-name"
      />
      <Input
        className="wmnds-col-1-2 wmnds-col-sm-2-3"
        name="Lastname"
        label="Last name"
        autocomplete="family-name"
      />
    </fieldset>
  );
};

export default Name;
