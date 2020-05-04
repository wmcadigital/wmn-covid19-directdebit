import React from 'react';
// Import components
import Input from 'components/shared/FormElements/Input/Input';

const Company = () => {
  return (
    <fieldset className="wmnds-fe-fieldset">
      <legend className="wmnds-fe-fieldset__legend">
        <h3 className="wmnds-fe-question">
          What company or organisation do you work for?
        </h3>
      </legend>
      <Input
        className="wmnds-col-1 wmnds-col-sm-1-2"
        name="CompanyName"
        label="Company or organisation name"
        autocomplete="organization"
      />
    </fieldset>
  );
};

export default Company;
