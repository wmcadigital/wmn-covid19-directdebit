import React, { useState } from 'react';
// Import contexts
import { FormDataProvider } from 'globalState/FormDataContext';
// Import components
import HeaderAndBreadcrumb from 'components/HeaderAndBreadcrumb/HeaderAndBreadcrumb';
import Introduction from 'components/Introduction/Introduction';
import Form from 'components/Form/Form';
import SuccessPage from 'components/SuccessPage/SuccessPage';
import ErrorPage from 'components/ErrorPage/ErrorPage';

function App() {
  const [isFormStarted, setIsFormStarted] = useState(false);
  const [formSubmitStatus, setFormSubmitStatus] = useState(null);

  return (
    <>
      <HeaderAndBreadcrumb
        isFormStarted={isFormStarted}
        formSubmitStatus={formSubmitStatus}
      />
      <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg wmnds-grid">
        {/* If form isn't started, show intro...else show form */}
        {!isFormStarted && <Introduction setIsFormStarted={setIsFormStarted} />}

        <FormDataProvider>
          {isFormStarted && formSubmitStatus === null && (
            <Form setFormSubmitStatus={setFormSubmitStatus} />
          )}

          {formSubmitStatus && <SuccessPage />}

          {formSubmitStatus === false && <ErrorPage />}
        </FormDataProvider>
      </div>
    </>
  );
}

export default App;
