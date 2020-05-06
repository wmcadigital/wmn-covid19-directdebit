/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
import { useFormContext } from 'react-hook-form';

const { sanitize } = dompurify;

const Radio = ({ name, onChange, onBlur, text, value }) => {
  const { register, errors, formState } = useFormContext();

  return (
    <>
      <label className="wmnds-fe-radios__container">
        {JSON.stringify(errors, null, 2)}
        {errors[name]}
        <div dangerouslySetInnerHTML={{ __html: sanitize(text) }} />
        <input
          className="wmnds-fe-radios__input"
          value={value}
          name={name}
          type="radio"
          onChange={onChange}
          onBlur={onBlur}
          ref={register({ required: true })}
        />
        <span className="wmnds-fe-radios__checkmark" />
      </label>
    </>
  );
};

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

Radio.defaultProps = {
  onChange: null,
  onBlur: null,
};

export default Radio;
