import { useState, useContext } from 'react';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';

const useSubmitForm = (setFormSubmitStatus) => {
  const [formDataState, formDataDispatch] = useContext(FormDataContext);
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission method
    setIsFetching(true); // Set this so we can put loading state on button

    // Go hit the API with the data
    fetch(process.env.REACT_APP_API_HOST, {
      method: 'post',
      body: JSON.stringify(formDataState),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // If the response is successful(200: OK)
        if (response.status === 200) {
          return response.text(); // Return response (reference number)
        }
        throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
      })
      .then((payload) => {
        console.log({ payload });
        // If formsubmission is successful
        // formDispatch({ type: 'ADD_FORM_REF', payload }); // Update form state with the form ref received from server
        // Log event to analytics/tag manager
        // window.dataLayer.push({
        //   event: 'formAbandonment',
        //   eventCategory: 'Refund form submission: success',
        //   eventAction: `CustomerType:${formState.CustomerType}`,
        // });
        setIsFetching(false); // set to false as we are done fetching now
        setFormSubmitStatus(true); // Set form status to success
        window.scrollTo(0, 0); // Scroll to top of page
      })
      .catch((error) => {
        // If formsubmission errors
        // eslint-disable-next-line no-console
        console.error({ error });
        let errMsg;

        if (error.text) {
          error.text().then((errorMessage) => {
            errMsg = errorMessage;
          });
        } else {
          errMsg = error;
        }

        // Log event to analytics/tag manager
        window.dataLayer.push({
          event: 'formAbandonment',
          eventCategory: 'Refund form submission: error',
          eventAction: errMsg,
        });
        setIsFetching(false); // set to false as we are done fetching now
        setFormSubmitStatus(false); // Set form status to error
        window.scrollTo(0, 0); // Scroll to top of page
      });
  };

  return { handleSubmit, isFetching };
};

export default useSubmitForm;
