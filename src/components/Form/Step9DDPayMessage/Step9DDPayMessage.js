import React, { useContext, useRef } from 'react';
import { format } from 'fecha';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
import useWho from 'customHooks/useWho';

const Step9DDPayMessage = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const { register, handleSubmit, continueButton } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)
  const [formDataState] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const { formData } = formDataState; // Destrucutre formData from state
  const { yourTheir, youThey } = useWho(); // Use custom hook which changes your/their based on what user selected in step 1

  // Set a date 10 days in future, used to display future payment date in text below
  const today = new Date(); // Get todays date
  const todayPlus10 = new Date(); // create placeholder date
  todayPlus10.setDate(today.getDate() + 10); // Set placeholder date to 10days in future

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
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
          If {yourTheir} next payment date is before{' '}
          {format(todayPlus10, 'D MMMM YYYY')}, {yourTheir} one-off payment will
          be taken less than 10 days after {yourTheir} usual date.
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
    </form>
  );
};

export default Step9DDPayMessage;
