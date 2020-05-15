import React, { useContext } from 'react';
import { format } from 'fecha';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';

// Import components
import Title from 'components/shared/Title/Title';

// Import styles
import './SuccessPage.scss';

const SuccessPage = () => {
  const [formDataState] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const d = new Date().toISOString().slice(0, 10); // Set todays date as yyyy-mm-dd

  // If date is in future, show message that says you can start using from x date
  const useFromMessage =
    formDataState.formData.TravelResumptionDate > d
      ? `You can start using your Swift card from ${format(
          new Date(formDataState.formData.TravelResumptionDate),
          'D MMMM YYYY'
        )}`
      : 'You can now start using your Swift card';

  return (
    <>
      <Title />
      <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-1-2">
        {/* Success message */}
        <div className="wmnds-msg-summary wmnds-msg-summary--success-fill wmnds-m-b-xl">
          <div className="wmnds-msg-summary__header">
            <h3 className="wmnds-msg-summary__title">Request complete</h3>
            <h3 className="print-text">{useFromMessage}</h3>
          </div>

          <p>
            Your reference number is <strong>{formDataState.formRef}</strong>
          </p>
        </div>

        {/* Success copy */}
        <h3>What happens next</h3>

        <p>We’ve sent your request to our Ticketing Services team.</p>
        <p>
          They will contact you to confirm how much money will be taken on your
          next Direct Debit payment date, or to ask for more information.
        </p>

        <br />
        <p className="print-hide">
          <a
            href="https://surveys.hotjar.com/s?siteId=264586&surveyId=156448"
            title="Service feedback survey"
            target="_blank"
            rel="noopener noreferrer"
            className="wmnds-link"
          >
            What did you think of this service?
          </a>{' '}
          (takes 30 seconds)
        </p>
      </div>
    </>
  );
};

export default SuccessPage;
