import React from 'react';
import PropTypes from 'prop-types';
// Import components
import Title from 'components/shared/Title/Title';
import Button from 'components/shared/Button/Button';

const Introduction = ({ setIsFormStarted }) => {
  const handleClick = () => {
    setIsFormStarted(true);
  };

  return (
    <>
      <Title />
      <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-1-2">
        <h2>Use this service to:</h2>
        <ul>
          <li>
            Let us know you are about to start using, or have already started to
            use your Swift card
          </li>
          <li>Test Reinstate your Direct Debit for your Swift card</li>
        </ul>
        <p>This process takes around 5 to 10 minutes.</p>

        <h2>Before you start</h2>
        <ul>
          <li>
            You may have received your Direct Debit reference number in an email
            telling you about this process
          </li>
          <li>
            If you did not receive this email, you can find this reference on
            your bank statement shown next to payments made to WMCA and begins
            with a <strong>6</strong>
          </li>
          <li>
            You will need your Swift card number which begins with{' '}
            <strong>633597</strong>
          </li>
          <li>
            If your Swift card number begins with <strong>633597 0112</strong>,
            it is managed by
            <a
              href="//nxbus.co.uk"
              title="National Express West Midlands"
              target="_self"
              className="wmnds-link"
            >
              National Express West Midlands
            </a>{' '}
            and there is a separate process
          </li>
          <li>You will need the bank details to set up a new Direct Debit</li>
          <li>
            You must have been a customer before lockdown measures began,
            otherwise you will need to{' '}
            <a
              href="//www.wmnetwork.co.uk/tickets/#/"
              title="Apply for a new ticket"
              target="_self"
              className="wmnds-link"
            >
              apply for a new ticket
            </a>
            .
          </li>
        </ul>
        <br />
        <br />
        <Button
          btnClass="wmnds-btn--start"
          iconRight="general-chevron-right"
          onClick={handleClick}
          type="button"
          text="Start now"
        />
      </div>
    </>
  );
};

Introduction.propTypes = {
  setIsFormStarted: PropTypes.func.isRequired,
};

export default Introduction;
