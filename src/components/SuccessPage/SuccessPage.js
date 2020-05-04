import React, { useContext } from 'react';
// Import contexts
import { FormContext } from 'globalState/FormContext';

// Import components
import Icon from 'components/shared/Icon/Icon';
import Title from 'components/shared/Title/Title';

const SuccessPage = () => {
  const [formState] = useContext(FormContext); // Get the state of form data from FormContext

  return (
    <>
      <Title />
      <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-1-2">
        {/* Success message */}
        <div className="wmnds-msg-summary wmnds-msg-summary--success-fill wmnds-m-b-xl">
          <div className="wmnds-msg-summary__header">
            <Icon
              iconName="general-success"
              className="wmnds-msg-summary__icon"
            />
            <h3 className="wmnds-msg-summary__title">Application complete</h3>
          </div>

          <div className="wmnds-msg-summary__info">
            Your reference number is <strong>{formState.FormRef}</strong>
          </div>
        </div>

        {/* Success copy */}
        <h3>What happens next</h3>

        {/* If user is scratchcard or classpass show info */}
        {formState.CustomerType === 'Scratchcard' ||
        formState.CustomerType === 'ClassPass' ? (
          <>
            {/*  <p>We have sent you an email to acknowledge your application.</p>  */}
            <p>
              We will send you an email within the next 24 hours to acknowledge
              your application.
            </p>
            <p>
              Unfortunately, due to logistics, we are unable to process
              applications for scratchcards and class passes remotely.
            </p>
            <p>
              As soon as the Government advises it is okay to return to the
              office, we will process your application as a priority.
            </p>
          </>
        ) : (
          <>
            {/*  If user is not scratchcard or classpass show info */}
            {/* <p>
              We have sent you an email to acknowledge your application. The
              email also contains more details about how we will process your
              refund.
            </p> */}

            <p>
              We will send you an email within the next 24 hours to acknowledge
              your application. The email also contains more details about how
              we will process your refund.
            </p>
            <p>
              If we need any more information to process your refund, we will be
              in touch.
            </p>
            <p>
              If you have any questions regarding your refund, or you would like
              to know how we will calculate your refund, there is{' '}
              <a
                href="https://wmnetwork.co.uk/coronavirus"
                title="Guidance about how we will calculate your refund"
                target="_blank"
                rel="noopener noreferrer"
                className="wmnds-link"
              >
                guidance
              </a>{' '}
              available on our website.
            </p>
          </>
        )}

        <br />
        <p>
          <a
            href="https://surveys.hotjar.com/s?siteId=264586&surveyId=154279"
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
