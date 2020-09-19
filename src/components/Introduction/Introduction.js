import React from 'react';
import PropTypes from 'prop-types';
// Import components
// import Title from 'components/shared/Title/Title';
// import Button from 'components/shared/Button/Button';
// import TooltipMessage from 'components/shared/TooltipMessage/TooltipMessage';

const Introduction = ({ setIsFormStarted }) => {
  //  const handleClick = () => {
  //    setIsFormStarted(true);
  //  };

  return (
    <>
      <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-1-2">
        <h2>Sorry, this service is unavailable</h2>
        <p>The reinstate your Direct Debit (COVID-19) service has closed.</p>
        <p>
          If you did not reinstate your Direct Debit, you will need to{' '}
          <a
            href="//wmnetwork.co.uk/tickets/#?utm_source=dd_reinstate&utm_medium=start_page&utm_campaign=adult_closure_redirect"
            title="Apply for a new ticket"
            target="_self"
            className="wmnds-link"
          >
            apply for a new ticket
          </a>
          .
        </p>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

Introduction.propTypes = {
  setIsFormStarted: PropTypes.func.isRequired,
};

export default Introduction;
