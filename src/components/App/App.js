import ErrorPage from 'components/ErrorPage/ErrorPage';
// Import components
import Form from 'components/Form/Form';
import Introduction from 'components/Introduction/Introduction';
import SuccessPage from 'components/SuccessPage/SuccessPage';
// Import contexts
import {FormDataProvider} from 'globalState/FormDataContext';
import {FormErrorProvider} from 'globalState/FormErrorContext';
import React, {useState} from 'react';

function App() {
  const [isFormStarted, setIsFormStarted] = useState(false);
  const [formSubmitStatus, setFormSubmitStatus] = useState(null);

  return (<div className =
               "wmnds-container wmnds-p-t-lg wmnds-p-b-lg wmnds-grid">{
      /* If form isn't started, show intro...else show form */} {
    !isFormStarted &&
    <Introduction setIsFormStarted =
     {
       setIsFormStarted
     } />}

      <FormDataProvider>
        {isFormStarted && formSubmitStatus === null && (
          <FormErrorProvider>
            <Form setFormSubmitStatus={setFormSubmitStatus} />
    </FormErrorProvider>
        )}

        {formSubmitStatus && <SuccessPage />
  }

          {formSubmitStatus === false &&
           <ErrorPage />}</FormDataProvider>
    </div>);
}

export default App;
