import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';

const ProgressIndicatorStep = ({ title, stepNumber, currentStep }) => {
  // Placeholders for correct icons and classes
  let currentClass;
  let iconName;

  // if completed
  if (stepNumber < currentStep) {
    currentClass = 'wmnds-progress-indicator__item--success';
    iconName = 'general-success';
  }
  // Else if current step
  else if (stepNumber === currentStep) {
    currentClass = 'wmnds-progress-indicator__item--current';
    iconName = 'general-circle-solid';
  }
  // Else must not be completed or current
  else {
    currentClass = '';
    iconName = 'general-circle-hollow';
  }

  return (
    <li className="wmnds-col-1 wmnds-col-md-1-5">
      <div className={`wmnds-progress-indicator__item ${currentClass}`}>
        <Icon className="wmnds-progress-indicator__icon" iconName={iconName} />
        <span className="wmnds-progress-indicator__title">{title}</span>
      </div>
    </li>
  );
};

ProgressIndicatorStep.propTypes = {
  title: PropTypes.string.isRequired,
  stepNumber: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default ProgressIndicatorStep;
