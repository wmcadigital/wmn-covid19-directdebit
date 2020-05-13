import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { format } from 'fecha';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';
// Import custom hooks
import useWho from 'customHooks/useWho';
// Import components
import Button from 'components/shared/Button/Button';
import DataRow from './DataRow/DataRow';

const Step11CheckAnswers = ({ isFetching, errorMessage }) => {
  const [formDataState] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const { formData } = formDataState;
  const { yourTheir } = useWho(); // Use custom hook which changes your/their based on what user selected in step 1

  return (
    <>
      <h2>Check your answers before reinstating {yourTheir} Direct Debit</h2>
      {/* Ticket details */}
      <h3>Ticket details</h3>
      <div className="wmnds-grid">
        <DataRow
          label="I am the ticket holder"
          value={formData.TicketHolder}
          goToStep={1}
        />
        <DataRow
          label="Swift card details"
          value={formData.SwiftCardNumber}
          goToStep={3}
        />
        <DataRow
          label="Started travelling again"
          value={formData.TravelAgain}
          goToStep={4}
        />
        <DataRow
          label="Resuming Travel"
          value={
            formData.TravelResumptionDate &&
            format(new Date(formData.TravelResumptionDate), 'D MMMM YYYY')
          }
          goToStep={5}
        />
      </div>

      {/* Personal details */}
      <h3>Personal details</h3>
      <div className="wmnds-grid">
        <DataRow
          label="Name"
          value={`${formData.Firstname} ${formData.Lastname}`}
          goToStep={6}
        />
        <DataRow
          label="Date of birth"
          value={
            formData.DateOfBirth &&
            format(new Date(formData.DateOfBirth), 'D MMMM YYYY')
          }
          goToStep={7}
        />
        <DataRow
          label="Contact details"
          value={`${formData.PhoneNumber}<br/> ${formData.Email}`}
          goToStep={8}
        />
      </div>

      {/* Direct Debit */}
      <h3>Direct Debit</h3>
      <div className="wmnds-grid">
        <DataRow
          label="Direct Debit reference"
          value={formData.DirectDebitNumber}
          goToStep={2}
        />
        <DataRow
          label="Account holder"
          value={formData.BankAccountName}
          goToStep={10}
        />
        <DataRow
          label="Bank or building society account number"
          value={formData.BankAccountNumber}
          goToStep={10}
        />
        <DataRow
          label="Branch sort code"
          value={formData.BankAccountSortCode}
          goToStep={10}
        />
      </div>

      <h3>Now send {yourTheir} request</h3>
      <div className="wmnds-col-md-3-4">
        <p>
          By submitting this request you are confirming that, to the best of
          your knowledge, the details you are providing are correct.
        </p>
        <p>
          You consent to West Midlands Combined Authority possibly changing{' '}
          {yourTheir}
          Direct Debit date if it usually would occur in the next 10 days.
        </p>
        <p>
          You also consent to West Midlands Combined Authority reinstating{' '}
          {yourTheir}
          Direct Debit instruction.
        </p>
      </div>

      {/* If we get any errors back from the server, show here */}
      {errorMessage && (
        <span className="wmnds-fe-error-message">{errorMessage}</span>
      )}

      <div className="wmnds-col-1">
        {/* If API is fetching */}
        {isFetching && (
          <div
            className="wmnds-loader wmnds-loader--btn wmnds-btn__icon wmnds-btn__icon--right"
            role="alert"
            aria-live="assertive"
          >
            <p className="wmnds-loader__content">Content is loading...</p>
          </div>
        )}

        <Button
          disabled={isFetching}
          iconRight="general-chevron-right"
          isFetching={isFetching}
          type="submit"
          text="Accept and send"
        />
      </div>
    </>
  );
};

Step11CheckAnswers.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

Step11CheckAnswers.defaultProps = {
  errorMessage: null,
};

export default Step11CheckAnswers;
