import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';
import Title from 'components/shared/Title/Title';

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
            Apply for a refund of your Swift card, paper ticket or Swift on
            Mobile ticket if you have been unable to travel due to the
            Coronavirus outbreak
          </li>
          <li>
            Let us know that you would like to exchange your Class pass or
            Scratchcards
          </li>
        </ul>
        <p>This process takes around 5 minutes.</p>
        <h2>Before you start</h2>
        <ul>
          <li>
            You will need your Swift card, paper ticket or your Swift on Mobile
            device
          </li>
          <li>
            If the long number on your Swift card begins with{' '}
            <strong>633597 0112</strong>, it is managed by National Express West
            Midlands and there is a{' '}
            <a
              href="https://nxbus.co.uk/west-midlands/news/ticket-refunds-due-to-covid19"
              title="National Express West Midlands ticket refund process"
              target="_self"
              className="wmnds-link"
            >
              separate refund process
            </a>
          </li>
          <li>
            If you pay by Direct Debit, you will need your Direct Debit
            reference number. This begins with <strong>6</strong> and is shown
            next to every payment to WMCA on your bank statement
          </li>
        </ul>
        <br />
        <p>
          There is guidance available to show{' '}
          <a
            href="https://wmnetwork.co.uk/coronavirus/"
            title="How we will work out your refund"
            target="_self"
            className="wmnds-link"
          >
            how we will work out your refund
          </a>
          .
        </p>
        <br />
        <br />
        <button
          type="button"
          className="wmnds-btn wmnds-btn--start"
          onClick={handleClick}
        >
          Start now
          <Icon
            className="wmnds-btn__icon wmnds-btn__icon--right"
            iconName="general-chevron-right"
          />
        </button>
      </div>
    </>
  );
};

Introduction.propTypes = {
  setIsFormStarted: PropTypes.func.isRequired,
};

export default Introduction;
