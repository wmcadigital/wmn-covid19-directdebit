import React from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { useFormContext } from 'react-hook-form';

import DateInput from './DateInput.js/DateInput';

const Date = ({ autoCompletPrefix, fieldValidation, name, label }) => {
  const { errors } = useFormContext();

  return (
    <>
      {/* If there is an error, show here */}
      {errors[name] && (
        <span className="wmnds-fe-error-message">{errors[name]}</span>
      )}

      <div
        className={`wmnds-fe-group ${
          errors[name] ? 'wmnds-fe-group--error' : ''
        }`}
      >
        <div className="wmnds-col-1-2 wmnds-col-sm-1-12 wmnds-m-r-md">
          <DateInput
            name={name}
            label={label}
            dateType="Day"
            error={errors[name]}
            autoComplete={autoCompletPrefix ? `${autoCompletPrefix}day` : null}
            fieldValidation={fieldValidation}
          />
        </div>
        <div className="wmnds-col-1-2 wmnds-col-sm-1-12 wmnds-m-r-md">
          <DateInput
            name={name}
            label={label}
            dateType="Month"
            error={errors[name]}
            autoComplete={
              autoCompletPrefix ? `${autoCompletPrefix}month` : null
            }
            fieldValidation={fieldValidation}
          />
        </div>
        <div className="wmnds-col-1-2 wmnds-col-sm-1-8">
          <DateInput
            name={name}
            label={label}
            dateType="Year"
            error={errors[name]}
            autoComplete={autoCompletPrefix ? `${autoCompletPrefix}year` : null}
            fieldValidation={fieldValidation}
          />
        </div>
      </div>
    </>
  );
};

Date.propTypes = {
  autoCompletPrefix: PropTypes.string,
  fieldValidation: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

Date.defaultProps = {
  autoCompletPrefix: null,
  fieldValidation: null,
};

export default Date;
