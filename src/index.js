// Helpers
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import * as Sentry from '@sentry/browser';
// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

// If not production build (based on envs) then don't log using Sentry and Log Rocket
if (process.env.NODE_ENV === 'production') {
  // LOG ROCKET
  // Used to log/track console errors with LogRocket
  LogRocket.init('brya8q/wmn-covid19-directdebbit', {
    // Sanitizer to stop the tracking of user input/text fields
    dom: {
      inputSanitizer: true,
    },
    // Hide sensitive network requests (calling API with form data)
    network: {
      requestSanitizer: (request) => {
        // if the url contains API URL
        if (
          request.url
            .toLowerCase()
            .indexOf(process.env.REACT_APP_API_HOST.toLowerCase()) !== -1
        ) {
          // Null the body as it/ignore it as it contains user data
          request.body = null;
        }
        // make sure you return the modified request
        return request;
      },
    },
  });
  // after calling LogRocket.init()
  setupLogRocketReact(LogRocket); // Set-up Log Rocket React integration

  // Used to log/track console errors
  Sentry.init({
    dsn:
      'https://db6b95e2f02e4d948fd49fd200bac01d@o378798.ingest.sentry.io/5237839',
  });

  // Link Log Rocket and Sentry together
  LogRocket.getSessionURL((sessionURL) => {
    Sentry.configureScope((scope) => {
      scope.setExtra('sessionURL', sessionURL);
    });
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('wmn-direct-debit-form-app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
