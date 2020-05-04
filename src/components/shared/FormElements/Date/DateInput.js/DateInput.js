import React from 'react';
import PropTypes from 'prop-types';

const DateInput = ({
  autoComplete,
  name,
  dateType,
  error,
  handleChange,
  handleBlur,
}) => {
  const inputName = name + dateType;

  return (
    <>
      <label className="wmnds-fe-label" htmlFor={inputName}>
        {dateType}
      </label>
      <input
        className={`wmnds-fe-input ${error ? 'wmnds-fe-input--error' : ''}`}
        id={inputName}
        name={inputName}
        type="text"
        inputMode="numeric"
        autoComplete={autoComplete}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  );
};

DateInput.propTypes = {
  autoComplete: PropTypes.string,
  name: PropTypes.string.isRequired,
  dateType: PropTypes.string.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

DateInput.defaultProps = {
  autoComplete: null,
  error: null,
};

export default DateInput;
