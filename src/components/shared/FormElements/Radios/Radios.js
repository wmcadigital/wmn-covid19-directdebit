import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';

import Radio from './Radio/Radio';
import useRadioValidation from './useRadiosValidation';

const { sanitize } = dompurify;

const Radios = ({ name, label, radios, onChange }) => {
  const { handleBlur, error } = useRadioValidation(name, label); // Use custom hook for validating radios (this controls ALL radios validation)

  return (
    <div className={`wmnds-fe-group ${error ? 'wmnds-fe-group--error' : ''}`}>
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h3 className="wmnds-fe-question">{label}</h3>
          {/* If there is an error, show here */}
          {error && (
            <span
              className="wmnds-fe-error-message"
              dangerouslySetInnerHTML={{ __html: sanitize(error) }}
            />
          )}
        </legend>
        <div className="wmnds-fe-radios">
          {/* Loop through radios and display each radio button */}
          {radios.map((radio) => (
            <Radio
              key={radio.text}
              name={name}
              text={radio.text}
              value={radio.value}
              onBlur={handleBlur}
              onChange={onChange}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

Radios.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  radios: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string, PropTypes.string)
  ).isRequired,
  onChange: PropTypes.func,
};

Radios.defaultProps = {
  onChange: null,
};

export default Radios;
