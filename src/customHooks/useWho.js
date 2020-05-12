import { useContext } from 'react';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';

const useWho = () => {
  const [formDataState] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext

  const { TicketHolder } = formDataState.formData;

  const person = TicketHolder === 'yes' ? 'your' : 'their';

  return { person };
};

export default useWho;
