// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Input from 'components/shared/FormElements/Input/Input';
import PropTypes from 'prop-types';
import React from 'react';

const Step10DDBankDetails = ({formRef}) => {
  // Custom hook for handling continue button (validation, errors etc)
  const { register, showGenericError, handleContinue } = useStepLogic(formRef);

  // Labels used on inputs and for validation
  const ddNameLabel = 'Name on the account';
  const ddSortCodeLabel = 'Sort code';
  const ddAccountLabel = 'Account number';

  // Logic used to validate the account name field
  const ddNameValidation = register({
    required: `${ddNameLabel} is required`,
  });

  // Logic used to validate the sort code field
  const sortCodeRegex = /^(?!(?:0{6}|00-00-00))(?:\d{6}|\d\d-\d\d-\d\d)$/; // Got from https://stackoverflow.com/questions/11341957/uk-bank-sort-code-javascript-regular-expression#answer-11342244
  const ddSortCodeValidation = register({
    required: `${ddSortCodeLabel} is required`,
    pattern: {
      value: sortCodeRegex,
      message: `Enter a valid ${ddSortCodeLabel.toLowerCase()} like 309430`,
    },
  });

  // Logic used to validate the account number field
  const ddAccountValidation = register({
    required: `${ddAccountLabel} is required`,
  });

  return (
    <>
      {/* Subsection */}
      <div>
        Section 3 of 3 <h4>Direct Debit</h4>
      </div>

      {/* Show generic error message */}
      {showGenericError}

      <h2>
        Instruction to your bank or building society to pay by Direct Debit
      </h2>
      <h3>The Direct Debit Guarantee</h3>
      <ul>
        <li>
          This Guarantee is offered by all banks and building societies that
          accept instructions to pay Direct Debits.
        </li>
        <li>
          If there are any changes to the amount, date or interval of your
          Direct Debit West Midlands Combined Authority will notify you 20
          working days in advance of your account being debited or as otherwise
          agreed. If you request West Midlands Combined Authority to collect a
          payment, confirmation of amount and date will be given to you at the
          time of the request.
        </li>
        <li>
          If an error is made in the payment of your Direct Debit, by West
          Midlands Combined Authority or your bank or building society, you are
          entitled to a full and immediate refund of the amount paid from you
          bank or building society
        </li>
        <li>
          If you receive a refund you are not entitled to, you must pay it back
          when West Midlands Combined Authority asks you to.
        </li>
        <li>
          You can cancel a Direct Debit at any time by simply contacting your
          bank or building society. Written confirmation may be required. Please
          also notify us.
        </li>
      </ul>
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h3 className="wmnds-fe-question">
            Bank or building society account details
          </h3>
        </legend>

        <Input
          className="wmnds-col-1 wmnds-col-sm-2-3 wmnds-col-lg-1-2"
          name="BankAccountName"
          label={ddNameLabel}
          autocomplete="given-name"
          fieldValidation={ddNameValidation}
        />
        <Input
          className="wmnds-col-1-2 wmnds-col-md-1-4"
          name="BankAccountSortCode"
          label={`${ddSortCodeLabel}<br/>Must be 6 digits long`}
          inputmode="numeric"
          fieldValidation={ddSortCodeValidation}
        />
        <Input
          className="wmnds-col-1-2 wmnds-col-md-1-4"
          name="BankAccountNumber"
          label={`${ddAccountLabel}<br/>Must be between 6 and 8 digits long`}
          inputmode="numeric"
          fieldValidation={ddAccountValidation}
        />
        <p>
          Please pay West Midlands Combined Authority Direct Debits from the
          account detailed in this Instruction subjected to the safeguards
          assured by the Direct Debit Guarantee.
        </p>
        <p>
          I understand that this Instruction may remain with West Midlands
          Combined Authority and, if so, details will be passed electronically
          to my bank/building society.
        </p>
      </fieldset>

      {/* Continue button */}
      <button
        type="button"
        className="wmnds-btn wmnds-btn--disabled wmnds-col-1 wmnds-m-t-md"
        onClick={handleContinue}
      >
        Continue
      </button>
    </>
  );
};

Step10DDBankDetails.propTypes = {
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step10DDBankDetails;
