import React, { useState } from 'react';
// Import contexts
import { FormProvider } from 'globalState/FormDataContext';
import { FormErrorProvider } from 'globalState/FormErrorContext';
// Import components
import Form from 'components/Form/Form';
import Introduction from 'components/Introduction/Introduction';
import SuccessPage from 'components/SuccessPage/SuccessPage';
import ErrorPage from 'components/ErrorPage/ErrorPage';

function App() {
  const [isFormStarted, setIsFormStarted] = useState(false);
  const [formSubmitStatus, setFormSubmitStatus] = useState(null);

  return (
    <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg wmnds-grid">
      {/* If form isn't started, show intro...else show form */}
      {!isFormStarted && <Introduction setIsFormStarted={setIsFormStarted} />}

      <FormProvider>
        {isFormStarted && formSubmitStatus === null && (
          <FormErrorProvider>
            <Form
              formSubmitStatus={formSubmitStatus}
              setFormSubmitStatus={setFormSubmitStatus}
            />
          </FormErrorProvider>
        )}

        {formSubmitStatus && <SuccessPage />}

        {formSubmitStatus === false && <ErrorPage />}
      </FormProvider>
    </div>
  );
}

export default App;
