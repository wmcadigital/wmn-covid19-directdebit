import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';

const DataRow = ({ value, goToStep }) => {
  const [, formDataDispatch] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext

  return (
    <div className="wmnds-col-1">
      <strong className="wmnds-col-1 wmnds-col-sm-1-3">Name</strong>
      <span className="wmnds-col-1-3">{value}</span>
      <button
        type="button"
        className="wmnds-link"
        onClick={() =>
          formDataDispatch({
            type: 'UPDATE_STEP',
            payload: goToStep,
          })
        }
      >
        Change
      </button>
    </div>
  );
};

DataRow.propTypes = {
  value: PropTypes.string.isRequired,
  goToStep: PropTypes.number.isRequired,
};

export default DataRow;
