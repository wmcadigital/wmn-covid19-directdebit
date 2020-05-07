import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
// Import contexts
import { useFormContext } from 'react-hook-form';

const { sanitize } = dompurify;

const Input = ({
  autocomplete,
  className,
  fieldRef,
  inputmode,
  label,
  name,
  spellcheck,
  type,
}) => {
  const { errors } = useFormContext();
  // Set input to render below
  const input = (
    <>
      <input
        className={`wmnds-fe-input ${
          errors[name] ? 'wmnds-fe-input--error' : ''
        }`}
        id={name}
        name={name}
        type={type}
        inputMode={inputmode}
        spellCheck={spellcheck}
        autoComplete={autocomplete}
        ref={fieldRef}
      />
    </>
  );

  return (
    <div
      className={`wmnds-fe-group ${
        errors[name] ? 'wmnds-fe-group--error' : ''
      }`}
    >
      {label && (
        <label className="wmnds-fe-label" htmlFor={name}>
          {label}
        </label>
      )}

      {/* If there is an error, show here */}
      {errors[name] && (
        <span
          className="wmnds-fe-error-message"
          dangerouslySetInnerHTML={{ __html: sanitize(errors[name].message) }}
        />
      )}

      {/* If className then wrap just input with the className else, just show input as usual */}
      {className ? <div className={className}>{input}</div> : input}
    </div>
  );
};

Input.propTypes = {
  autocomplete: PropTypes.string,
  className: PropTypes.string,
  fieldRef: PropTypes.func,
  inputmode: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  spellcheck: PropTypes.bool,
  type: PropTypes.string,
};

Input.defaultProps = {
  autocomplete: null,
  className: '',
  fieldRef: null,
  inputmode: 'text',
  spellcheck: false,
  type: 'text',
};

export default Input;
