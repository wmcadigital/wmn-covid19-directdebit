import React from 'react';
// Import components
import Icon from 'components/shared/Icon/Icon';
// Import custom hooks
import useFileUploadValidation from './useFileUploadValidation';
// Import styles
import s from './FileUpload.module.scss';

const FileUpload = () => {
  // Use custom hook for validating fileUpload inputs
  const {
    handleChange,
    handleBlur,
    handleFocus,
    isFileInputFocused,
    fileName,
    error,
  } = useFileUploadValidation();

  return (
    <div className={`wmnds-fe-group ${error ? 'wmnds-fe-group--error' : ''}`}>
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h3 className="wmnds-fe-question">
            Upload a photo of the front of the ripped ticket
          </h3>
          <p>
            We need to be able to read the ticket type and expiry date to
            process the refund
          </p>
        </legend>
        {/* If there is an error, show here */}
        {error && <span className="wmnds-fe-error-message">{error}</span>}
        <label
          htmlFor="fileUpload"
          className={`wmnds-btn wmnds-btn--primary ${
            isFileInputFocused ? s.fileUploadLabelFocused : ''
          }`}
        >
          {fileName}
          <Icon
            className="wmnds-btn__icon wmnds-btn__icon--right"
            iconName="general-paperclip"
          />
          <input
            type="file"
            name="fileUpload"
            id="fileUpload"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            className={s.fileUpload}
          />
        </label>
      </fieldset>
    </div>
  );
};

export default FileUpload;
