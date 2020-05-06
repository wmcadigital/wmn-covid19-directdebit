/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';

const { sanitize } = dompurify;

const Radio = ({ name, onChange, onBlur, fieldRef, text, value }) => {
  return (
    <>
      <label className="wmnds-fe-radios__container">
        <div dangerouslySetInnerHTML={{ __html: sanitize(text) }} />
        <input
          className="wmnds-fe-radios__input"
          value={value}
          name={name}
          type="radio"
          onChange={onChange}
          onBlur={onBlur}
          ref={fieldRef}
        />
        <span className="wmnds-fe-radios__checkmark" />
      </label>
    </>
  );
};

// PropTypes
Radio.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  fieldRef: PropTypes.func,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

Radio.defaultProps = {
  onChange: null,
  onBlur: null,
  fieldRef: null,
};

export default Radio;
