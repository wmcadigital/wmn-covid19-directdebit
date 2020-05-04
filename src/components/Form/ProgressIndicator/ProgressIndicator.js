import React from 'react';
import PropTypes from 'prop-types';
import ProgressIndicatorStep from './ProgressIndicatorStep/ProgressIndicatorStep';

const ProgressIndicator = ({ currentStep }) => {
  return (
    <ul className="wmnds-progress-indicator wmnds-grid wmnds-grid--justify-between">
      <ProgressIndicatorStep
        title="What is your ticket type?"
        stepNumber={1}
        currentStep={currentStep}
      />
      <ProgressIndicatorStep
        title="How did you buy your ticket?"
        stepNumber={2}
        currentStep={currentStep}
      />
      <ProgressIndicatorStep
        title="What are your ticket details?"
        stepNumber={3}
        currentStep={currentStep}
      />
      <ProgressIndicatorStep
        title="What are your personal details?"
        stepNumber={4}
        currentStep={currentStep}
      />
    </ul>
  );
};

ProgressIndicator.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default ProgressIndicator;
