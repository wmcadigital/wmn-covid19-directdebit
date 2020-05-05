import React from 'react';
import PropTypes from 'prop-types';
// Import components

const Step9DDPayMessage = ({ setCurrentStep }) => {
  // Goto next step on continue
  const handleContinue = () => {
    // If errors, then don't progress and set continue button to true(halt form and show errors)
    setCurrentStep((c) => c + 1); // Set to next step in form
    window.scrollTo(0, 0); // Scroll to top of page
  };

  return (
    <>
      <p>
        Section 3 of 3 <h4>Direct Debit</h4>
      </p>
      <div className="wmnds-col-1 wmnds-col-sm-3-4 wmnds-col-lg-2-3">
        <h2>
          Paying for travel until your next usual Direct Debit payment date
        </h2>
        <p>
          We will work out how much you owe from 11 May 2020 until your next
          Direct Debit date.
        </p>
        <p>
          This will be taken from your account at the same time as your next
          Direct Debit payment.
        </p>
        <p>
          If your next payment date is before 14 May, your one-off payment will
          be taken less than 10 days after your usual date.
        </p>
      </div>

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

Step9DDPayMessage.propTypes = {
  setCurrentStep: PropTypes.func.isRequired,
};

export default Step9DDPayMessage;
