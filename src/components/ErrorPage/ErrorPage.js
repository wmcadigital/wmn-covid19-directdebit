import React from 'react';
import Title from 'components/shared/Title/Title';

const ErrorPage = () => {
  return (
    <>
      <Title />
      <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-1-2">
        {/* Error message */}
        <h3>Sorry, there is a problem with this service</h3>

        <p>Try again later.</p>

        <p>
          We have not saved your answers. When the service is available, you
          will have to start again.
        </p>

        <p>
          Contact the{' '}
          <a
            href="https://www.wmnetwork.co.uk/get-in-touch/contact-us/"
            title="Customer Services Team Contact Details"
            target="_self"
            class="wmnds-link"
          >
            Customer Services team, this is going to be a really long line to try and upset prettier via eslint, hopefully it is long enough. I'm also going to miss tpye samething nework is this spelling corect?
          </a>{' '}
          if you continue to have problems.
        </p>
      </div>
    </>
  );
};

export default ErrorPage;
