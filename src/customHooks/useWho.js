import { useContext } from 'react';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';

const useWho = () => {
  const [formDataState] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const { TicketHolder } = formDataState.formData; // Destructure ticketHolder field from form state

  const ticketHolder = TicketHolder === 'no'; // Set up a statemtnt to check if the user is ticketholder

  // Set to relevant word based on if the person filling in the form is the ticket holder or not
  const yourTheir = ticketHolder ? 'their' : 'your';
  const youThey = ticketHolder ? 'they' : 'you';
  const youThem = ticketHolder ? 'them' : 'you';
  const iThey = ticketHolder ? 'they' : 'I';
  const myTheir = ticketHolder ? 'their' : 'my';

  // Return the values out of the hook so they can be used elsewhere
  return { yourTheir, youThey, youThem, iThey, myTheir };
};

export default useWho;
