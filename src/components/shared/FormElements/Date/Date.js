import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { useFormContext } from 'react-hook-form';

import DateInput from './DateInput.js/DateInput';

const Date = ({ autoCompletPrefix, fieldValidation, name, label }) => {
  const { errors } = useFormContext();
  // State used for capturing date fields onChange below (we use these to validate against below)
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [date, setDate] = useState();

  const handleChange = (e) => {
    const { value } = e.target;

    // Switch on the input name, depending on name then update the relevant var
    switch (e.target.name) {
      case `${name}Day`:
        // If value is less than ten and greater than 0 (1-9) and is only 1 in length (so not 08)
        if (value < 10 && value > 0 && value.length === 1) {
          setDay(0 + value); // Then prepend a 0 to it to make it a valid day
        } else {
          setDay(value);
        }
        break;
      case `${name}Month`:
        // If value is less than ten and greater than 0 (1-9) and is only 1 in length (so not 08)
        if (value < 10 && value > 0 && value.length === 1) {
          setMonth(0 + value); // Then prepend a 0 to it to make it a valid month
        } else {
          setMonth(value);
        }
        break;
      default:
        setYear(value);
    }
  };

  useEffect(() => {
    if (year && month && day) setDate(`${year}-${month}-${day}`); // Set date state to current yyyy-mm-dd set by user (would do it in handleChange event but it falls out of sync)
  }, [day, month, year]);

  return (
    <>
      {/* If there is an error, show here */}
      {errors[name] && (
        <span className="wmnds-fe-error-message">{errors[name].message}</span>
      )}

      <div
        className={`wmnds-fe-group ${
          errors[name] ? 'wmnds-fe-group--error' : ''
        }`}
      >
        <div className="wmnds-col-1-2 wmnds-col-sm-1-12 wmnds-m-r-md">
          <DateInput
            autoComplete={autoCompletPrefix ? `${autoCompletPrefix}day` : null}
            dateType="Day"
            name={name}
            label={label}
            onChange={handleChange}
          />
        </div>
        <div className="wmnds-col-1-2 wmnds-col-sm-1-12 wmnds-m-r-md">
          <DateInput
            autoComplete={
              autoCompletPrefix ? `${autoCompletPrefix}month` : null
            }
            dateType="Month"
            name={name}
            label={label}
            onChange={handleChange}
          />
        </div>
        <div className="wmnds-col-1-2 wmnds-col-sm-1-8">
          <DateInput
            autoComplete={autoCompletPrefix ? `${autoCompletPrefix}year` : null}
            dateType="Year"
            name={name}
            label={label}
            onChange={handleChange}
          />
        </div>
      </div>
      {date}
      <input
        name={name}
        type="hidden"
        ref={fieldValidation}
        value={date || ''}
        readOnly
      />
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
