import React from 'react';
import PropTypes from 'prop-types';

const DateInput = ({
  autoComplete,
  fieldValidation,
  name,
  dateType,
  error,
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
        ref={fieldValidation}
        type="text"
        inputMode="numeric"
        autoComplete={autoComplete}
      />
    </>
  );
};

DateInput.propTypes = {
  autoComplete: PropTypes.string,
  fieldValidation: PropTypes.func,
  name: PropTypes.string.isRequired,
  dateType: PropTypes.string.isRequired,
  error: PropTypes.string,
};

DateInput.defaultProps = {
  autoComplete: null,
  fieldValidation: null,
  error: null,
};

export default DateInput;
