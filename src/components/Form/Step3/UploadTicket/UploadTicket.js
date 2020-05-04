import React from 'react';
// Import components
import Icon from 'components/shared/Icon/Icon';
import FileUpload from './FileUpload/FileUpload';

const UploadTicket = () => {
  return (
    <>
      <div className="wmnds-msg-summary wmnds-msg-summary--warning wmnds-m-t-xl wmnds-m-b-xl">
        <div className="wmnds-msg-summary__header">
          <Icon
            className="wmnds-msg-summary__icon"
            iconName="general-warning-circle"
          />
          <h3 className="wmnds-msg-summary__title">
            Rip your paper ticket in half
          </h3>
        </div>
      </div>

      <FileUpload />
    </>
  );
};

export default UploadTicket;
