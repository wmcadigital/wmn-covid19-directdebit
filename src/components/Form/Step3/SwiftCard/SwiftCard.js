import React, { useContext } from 'react';
// Import contexts
import { FormContext } from 'globalState/FormContext';
// Import components
import Input from 'components/shared/FormElements/Input/Input';

const SwiftCard = () => {
  const [formState] = useContext(FormContext); // Get the state of form data from FormContext
  const label = 'Swift card number';

  const customValidation = () => {
    let error;
    const swiftNum = formState.Application.CardNumber; // get swiftcard number from state
    const firstTen = swiftNum.substr(0, 10); // Get first ten chars of input

    // If card number starts with 6335970112 then user has NX card and needs to go to NX for refund
    if (firstTen === '6335970112') {
      error = `${label} is managed by National Express West Midlands and there is a
            <a
              href="https://nxbus.co.uk/west-midlands/news/ticket-refunds-due-to-covid19"
              title="National Express West Midlands ticket refund process"
              target="_blank"
              className="wmnds-link"
            >
              separate refund process
            </a>`;
    }
    // If swift card doesn't start with the below numbers then it's not valid
    else if (firstTen !== '6335970107' && firstTen !== '6335970319') {
      error = `Your ${label} is the long number on the front of the card`;
    }
    // Must be 18 digits long
    else if (swiftNum.length !== 18) {
      error = `Your ${label} is 18 digits long and begins with 633597`;
    }

    return error;
  };

  return (
    <fieldset className="wmnds-fe-fieldset">
      <legend className="wmnds-fe-fieldset__legend">
        <h3 className="wmnds-fe-question">What is your Swift card number?</h3>
        <p>
          This is the long number on the front of the card and begins with{' '}
          <strong>633597</strong>
        </p>
        <p>Enter the number without spaces</p>
      </legend>
      <Input
        className="wmnds-col-1 wmnds-col-sm-3-4 wmnds-col-md-1-2"
        name="CardNumber"
        label={label}
        inputmode="numeric"
        customValidation={customValidation}
      />
    </fieldset>
  );
};

export default SwiftCard;
