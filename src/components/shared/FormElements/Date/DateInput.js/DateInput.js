import React from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { useFormContext } from 'react-hook-form';

const DateInput = ({
  autoComplete,
  dateType,
  fieldValidation,
  onChange,
  name,
}) => {
  const { errors } = useFormContext();
  const inputName = name + dateType;

  return (
    <>
      <label className="wmnds-fe-label" htmlFor={inputName}>
        {dateType}
      </label>
      <input
        className={`wmnds-fe-input ${
          errors[name] ? 'wmnds-fe-input--error' : ''
        }`}
        id={inputName}
        name={inputName}
        ref={fieldValidation}
        type="text"
        inputMode="numeric"
        autoComplete={autoComplete}
        onChange={onChange}
      />
    </>
  );
};

DateInput.propTypes = {
  autoComplete: PropTypes.string,
  dateType: PropTypes.string.isRequired,
  fieldValidation: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

DateInput.defaultProps = {
  autoComplete: null,
  fieldValidation: null,
};

export default DateInput;
