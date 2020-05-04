import React from 'react';
import PropTypes from 'prop-types';

import useDateValidation from './useDateValidation';
import DateInput from './DateInput.js/DateInput';

const Date = ({ name, label, customValidation, autoCompletPrefix }) => {
  // Use custom hook for validating inputs (this controls ALL inputs validation)
  const { error, handleChange, handleBlur } = useDateValidation(
    name,
    label,
    customValidation
  );

  return (
    <>
      {/* If there is an error, show here */}
      {error && <span className="wmnds-fe-error-message">{error}</span>}

      <div className={`wmnds-fe-group ${error ? 'wmnds-fe-group--error' : ''}`}>
        <div className="wmnds-col-1-2 wmnds-col-sm-1-12 wmnds-m-r-md">
          <DateInput
            name={name}
            label={label}
            dateType="Day"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={error}
            autoComplete={autoCompletPrefix ? `${autoCompletPrefix}day` : null}
          />
        </div>
        <div className="wmnds-col-1-2 wmnds-col-sm-1-12 wmnds-m-r-md">
          <DateInput
            name={name}
            label={label}
            dateType="Month"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={error}
            autoComplete={
              autoCompletPrefix ? `${autoCompletPrefix}month` : null
            }
          />
        </div>
        <div className="wmnds-col-1-2 wmnds-col-sm-1-8">
          <DateInput
            name={name}
            label={label}
            dateType="Year"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={error}
            autoComplete={autoCompletPrefix ? `${autoCompletPrefix}year` : null}
          />
        </div>
      </div>
    </>
  );
};

Date.propTypes = {
  autoCompletPrefix: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  customValidation: PropTypes.func,
};

Date.defaultProps = {
  autoCompletPrefix: null,
  customValidation: null,
};

export default Date;
