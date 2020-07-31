import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
// Import styling
import s from './TooltipMessage.module.scss';

const { sanitize } = dompurify;

const TooltipMessage = ({ text }) => {
  return (
    <div
      className={`wmnds-col-1 wmnds-p-md wmnds-m-b-md ${s.tooltipMessage}`}
      dangerouslySetInnerHTML={{ __html: sanitize(text) }}
    />
  );
};

TooltipMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TooltipMessage;
