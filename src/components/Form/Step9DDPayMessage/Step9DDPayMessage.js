import React from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
import useWho from 'customHooks/useWho';

const Step9DDPayMessage = ({ formRef }) => {
  const { handleContinue } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)
  const { yourTheir, youThey } = useWho(); // Use custom hook which changes your/their based on what user selected in step 1

  return (
    <>
      <div>
        Section 3 of 3 <h4>Direct Debit</h4>
      </div>
      <div className="wmnds-col-1 wmnds-col-sm-3-4 wmnds-col-lg-2-3">
        <h2>
          Paying for travel until {yourTheir} next usual Direct Debit payment
          date
        </h2>
        <p>
          We will work out how much {youThey} owe from 11 May 2020 until{' '}
          {yourTheir} next Direct Debit date.
        </p>
        <p>
          This will be taken from {yourTheir} account at the same time as{' '}
          {yourTheir} next Direct Debit payment.
        </p>
        <p>
          If {yourTheir} next payment date is before 14 May, {yourTheir} one-off
          payment will be taken less than 10 days after {yourTheir} usual date.
        </p>
      </div>

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

Step9DDPayMessage.propTypes = {
  formRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Step9DDPayMessage;
