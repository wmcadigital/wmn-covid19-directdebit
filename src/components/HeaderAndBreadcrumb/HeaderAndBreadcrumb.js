import React from 'react';
import PropTypes from 'prop-types';

const HeaderAndBreadcrumb = ({ isFormStarted, formSubmitStatus }) => {
  return (
    <>
      {/* <!-- Header --> */}
      <header className="wmnds-header wmnds-header--mobile-app">
        <div className="wmnds-container wmnds-grid wmnds-grid--align-center wmnds-grid--justify-between">
          <div className="wmnds-header__vertical-align wmnds-col-auto">
            {/* <!-- Logo --> */}
            <a
              className="wmnds-header__logo-link"
              href="//wmnetwork.co.uk"
              title="West Midlands Network Home"
            >
              <img
                className="wmnds-header__logo"
                alt="West Midlands Network logo"
                src="//wmnetwork.netlify.com/img/logo.svg"
              />
            </a>
            {/* <!-- Phase indicator --> */}
            <a
              href="//wmnetwork.co.uk"
              target="_self"
              className="wmnds-phase-indicator"
              title="Beta homepage of West Midlands Network Home"
            >
              Beta
            </a>
          </div>
          <h1 className="wmnds-header__title wmnds-col-1 wmnds-col-sm-auto">
            Reinstate your Direct Debit <br />
            (COVID-19)
          </h1>
        </div>
      </header>
      {/* <!-- End header --> */}
      <div className="wmnds-container">
        {/* <!-- Breadcrumb --> */}
        <nav aria-label="Breadcrumb" className="wmnds-breadcrumb">
          <ol className="wmnds-breadcrumb__list">
            <li className="wmnds-breadcrumb__list-item">
              <a href="//wmnetwork.co.uk" className="wmnds-breadcrumb__link">
                Home
              </a>
            </li>
            <li className="wmnds-breadcrumb__list-item">
              <a
                href="//www.wmnetwork.co.uk/tickets-and-passes/"
                className="wmnds-breadcrumb__link"
              >
                Tickets and passes
              </a>
            </li>
            <li className="wmnds-breadcrumb__list-item">
              <a
                href="//www.wmnetwork.co.uk/tickets-and-passes/direct-debit/"
                className="wmnds-breadcrumb__link"
              >
                Direct Debit
              </a>
            </li>
            <li className="wmnds-breadcrumb__list-item">
              <a
                href="/"
                className="wmnds-breadcrumb__link wmnds-breadcrumb__link--current"
                aria-current="page"
              >
                Reinstate your Direct Debit (COVID-19)
              </a>
            </li>
          </ol>
        </nav>
        {/* <!-- End Breadcrumb --> */}
      </div>
    </>
  );
};

HeaderAndBreadcrumb.propTypes = {
  isFormStarted: PropTypes.bool.isRequired,
  formSubmitStatus: PropTypes.bool,
};

HeaderAndBreadcrumb.defaultProps = {
  formSubmitStatus: null,
};

export default HeaderAndBreadcrumb;
