// Import components
import GenericError from 'components/shared/Errors/GenericError';
import Input from 'components/shared/FormElements/Input/Input';
// Import contexts
import { FormErrorContext } from 'globalState/FormErrorContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

const Step10DDBankDetails = ({ setCurrentStep, formRef }) => {
  const [errorState, errorDispatch] = useContext(FormErrorContext); // Get the error state of form data from
  // FormErrorContext  // Goto next step on continue
  const handleContinue = () => {
    // If errors, then don't progress and set continue button to true(halt form
    // and show errors)
    if (errorState.errors.length) {
      window.scrollTo(0, formRef.current.offsetTop); // Scroll to top of form
      errorDispatch({
        type: 'CONTINUE_PRESSED',
        payload: true,
      }); // set continue button pressed to true so errors can show
    } else {
      errorDispatch({
        type: 'CONTINUE_PRESSED',
        payload: false,
      }); // Reset submit button pressed before going to next step
      setCurrentStep((c) => c + 1); // Set to next step in form
      window.scrollTo(0, 0); // Scroll to top of page
    }
  };

  return (
    <>
      <p>
        Section 3 of 3 <h4>Direct Debit</h4>
      </p>
      {errorState.errors.length > 0 && errorState.continuePressed && (
        <GenericError />
      )}
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
          bank or building society.Written confirmation may be required.Please
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
          label="Name on the account"
          autocomplete="given-name"
        />{' '}
        <Input
          className="wmnds-col-1-2 wmnds-col-md-1-4"
          name="BankAccountSortCode"
          label="Sort code"
          inputmode="numeric"
        />{' '}
        <Input
          className="wmnds-col-1-2 wmnds-col-md-1-4"
          name="BankAccountNumber"
          label="Account number"
          inputmode="numeric"
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
      <button
        type="button"
        className="wmnds-btn wmnds-btn--disabled wmnds-col-1 wmnds-m-t-md"
        onClick={() => handleContinue()}
      >
        Continue
      </button>
    </>
  );
};

Step10DDBankDetails.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step10DDBankDetails;
