import { useEffect } from 'react';
import LogRocket from 'logrocket';

const useLogRocketTracking = (formState, isPaperTicket, isSwiftOnMobile) => {
  // Used to update log rocket with the users customerType
  useEffect(() => {
    LogRocket.identify({
      CustomerType: formState.CustomerType,
      isPaperTicket,
      isSwiftOnMobile,
    });
  }, [formState.CustomerType, isPaperTicket, isSwiftOnMobile]);
};

export default useLogRocketTracking;
