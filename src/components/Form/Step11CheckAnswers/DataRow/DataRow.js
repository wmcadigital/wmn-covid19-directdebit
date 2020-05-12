import dompurify from 'dompurify';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

const { sanitize } = dompurify;

const DataRow = ({ label, value, goToStep }) => {
  const [, formDataDispatch] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const formatValue = value && value.includes('undefined') ? '' : value; // If undefined is passed in ,then not correct value so return '' else return the correct val

  return (
    <div className="wmnds-col-1 wmnds-p-t-sm wmnds-p-b-sm">
      <strong className="wmnds-col-1 wmnds-col-sm-1-3">{label}</strong>
      <span
        className="wmnds-col-1-3"
        dangerouslySetInnerHTML={{ __html: sanitize(formatValue) }}
      />
      <button
        type="button"
        className="wmnds-link wmnds-float-right"
        onClick={() =>
          formDataDispatch({
            type: 'UPDATE_STEP',
            payload: goToStep,
          })
        }
      >
        Change
      </button>
      <hr />
    </div>
  );
};

DataRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  goToStep: PropTypes.number.isRequired,
};

DataRow.defaultProps = {
  value: '',
};

export default DataRow;
