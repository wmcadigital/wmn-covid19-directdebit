import PropTypes from 'prop-types';
import React from 'react';
// Import contexts
import { useFormContext } from 'react-hook-form';

const DateInput = ({
  autoComplete,
  dateType,
  defaultValue,
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
        autoComplete={autoComplete}
        className={`wmnds-fe-input ${
          errors[name] ? 'wmnds-fe-input--error' : ''
        }`}
        defaultValue={defaultValue}
        id={inputName}
        inputMode="numeric"
        onChange={onChange}
        name={inputName}
        ref={fieldValidation}
        type="text"
      />
    </>
  );
};

DateInput.propTypes = {
  autoComplete: PropTypes.string,
  dateType: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  fieldValidation: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

DateInput.defaultProps = {
  autoComplete: null,
  fieldValidation: null,
};

export default DateInput;
