import React, { useContext, useRef } from 'react';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
import useWho from 'customHooks/useWho';
// Import components
import DateEle from 'components/shared/FormElements/Date/Date';
import TooltipMessage from 'components/shared/TooltipMessage/TooltipMessage';

const Step5TravelDate = () => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const {
    register,
    handleSubmit,
    showGenericError,
    continueButton,
  } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)
  const [formDataState] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const { TravelAgain } = formDataState.formData; // Destructure TravelAgain val from formData
  const { yourTheir, youThey } = useWho(); // Use custom hook which changes your/their based on what user selected in step 1
  const willDid = TravelAgain === 'yes' ? 'did' : 'will'; // Set to relevant word based on if the person has started travelling again (set in step 4)

  const travelLabel = 'Travel date'; // Label used on input and for validation

  // Logic used to validate the field
  const dateRegex = /^((((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[13578]|10|12)([-])(0[1-9]|[12][0-9]|3[01]))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[469]|11)([-])([0][1-9]|[12][0-9]|30))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(02)([-])(0[1-9]|1[0-9]|2[0-8]))|(([02468][048]00)([-])(02)([-])(29))|(([13579][26]00)([-])(02)([-])(29))|(([0-9][0-9][0][48])([-])(02)([-])(29))|(([0-9][0-9][2468][048])([-])(02)([-])(29))|(([0-9][0-9][13579][26])([-])(02)([-])(29)))$/; // Date regex http://regexlib.com/REDetails.aspx?regexp_id=1850

  // This function is used to validate if the date should be in future or past based on if the person has started travelling again (set in step 4). "val" is auto injected from the react hook form register/validate method below.
  const dateFuturePastValidation = (val) => {
    const d = new Date().toISOString().slice(0, 10); // Set todays date as yyyy-mm-dd
    let validation; // Create placeholder var

    // If user has started travelling again, then date should be today or in past
    if (TravelAgain === 'yes') {
      validation =
        (val.length > 5 && val <= d) ||
        `${travelLabel} must be today or in the past`;
    }
    // Else date must be today or in future
    else {
      validation =
        (val.length > 5 && val >= d) ||
        `${travelLabel} must be today or in the future`;
    }

    return validation; // Return correct validation rule
  };

  const fieldValidation = register({
    required: `${travelLabel} is required`,
    pattern: {
      value: dateRegex,
      message: `Enter ${travelLabel.toLowerCase()} in the correct format, for example 1 6 2020`,
    },
    validate: {
      dateFuturePastValidation,
      correctFormat: (val) =>
        dateRegex.test(val) ||
        `Enter ${travelLabel.toLowerCase()} in the correct format, for example 1 6 2020`,
    },
  });

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      <div>
        Section 1 of 3 <h4>About {yourTheir} ticket</h4>
      </div>

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2>
            When {willDid} {youThey} start to use {yourTheir} ticket to travel
            again?
          </h2>
        </legend>
        <p>For example, 2 5 2020</p>
        <DateEle
          name="TravelResumptionDate"
          label={travelLabel}
          fieldValidation={fieldValidation}
        />

        {/* Only show tootlip if user hasn't started travelling again */}
        {TravelAgain === 'no' && (
          <TooltipMessage
            text={`${
              youThey.charAt(0).toUpperCase() + youThey.slice(1)
            } can start to
            use ${yourTheir} Swift card again from this date`}
          />
        )}
      </fieldset>

      {/* Continue button */}
      {continueButton}
    </form>
  );
};

export default Step5TravelDate;
