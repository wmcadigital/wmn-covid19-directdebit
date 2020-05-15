import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { format } from 'fecha';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
import useWho from 'customHooks/useWho';

const Step9DDPayMessage = ({ formRef }) => {
  const [formDataState] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const { formData } = formDataState;
  const { register, continueButton } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)
  const { yourTheir, youThey } = useWho(); // Use custom hook which changes your/their based on what user selected in step 1

  return (
    <>
      {/* Subsection */}
      <div>
        Section 3 of 3 <h4>Direct Debit</h4>
      </div>

      <div className="wmnds-col-1 wmnds-col-sm-3-4 wmnds-col-lg-2-3">
        <h2>
          Paying for travel until {yourTheir} next usual Direct Debit payment
          date
        </h2>
        <p>
          We will work out how much {youThey} owe from{' '}
          {formData.TravelResumptionDate &&
            format(new Date(formData.TravelResumptionDate), 'D MMMM YYYY')}{' '}
          until {yourTheir} next Direct Debit date.
        </p>
        <p>
          This will be taken from {yourTheir} account at the same time as{' '}
          {yourTheir} next Direct Debit payment.
        </p>
        <p>
          If {yourTheir} next payment date is before 14 May, {yourTheir} one-off
          payment will be taken less than 10 days after {yourTheir} usual date.
        </p>

        {/* Hidden consent field (true when continue pressed) */}
        <input
          type="hidden"
          value
          name="OneOffPaymentConsent"
          ref={register}
          readOnly
        />
      </div>

      {/* Continue button */}
      {continueButton}
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
