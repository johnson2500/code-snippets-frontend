/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import GeneralInfo from './generalInfo';
import UsageInfo from "./usageInfo";
import { makeRequest } from "../../helpers";

const getSignUpStep = (stepName, props) => {
  const { setSignUpInfoState, signUpInfoState } = props;

  switch (stepName) {
    case 'Genera lInfo':
      return (
        <GeneralInfo
          setSignUpInfoState={setSignUpInfoState}
          signUpInfoState={signUpInfoState}
        />
      );
    case 'Usage Info':
      return (
        <UsageInfo
          setSignUpInfoState={setSignUpInfoState}
          signUpInfoState={signUpInfoState}
        />
      );
    default:
      return (
        <GeneralInfo
          setSignUpInfoState={setSignUpInfoState}
          signUpInfoState={signUpInfoState}
        />
      );
  }
};

function SignUpNewUser() {
  const history = useHistory();
  const STEPS = [
    "General Info",
    "Usage Info",
  ];
  const [signUpInfoState, setSignUpInfoState] = React.useState({});
  const [currentStep, setCurrentStep] = React.useState({ name: STEPS[0], index: 0 });

  const handleComplete = async () => {
    try {
      console.log(document.cookie);
      const userData = await makeRequest({
        url: '/user/sign-up',
        data: signUpInfoState,
        method: "POST",
      });

      if (userData) {
        console.log("Success", userData.data);
        // do something
        history.push('/dashboard/main');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlePreviousStepClick = () => {
    const index = currentStep.index === 0 ? 0 : currentStep.index - 1;
    setCurrentStep({ name: STEPS[index], index });
  };

  const handleNextStep = () => {
    console.log("Next Step");
    console.log(STEPS.length - 1);
    const index = currentStep.index === STEPS.length - 1 ? STEPS.length - 1 : currentStep.index + 1;
    setCurrentStep({ name: STEPS[index], index });
  };

  useEffect(() => {
    console.log(currentStep);
  }, [currentStep]);

  const disablePrevButton = currentStep.index === 0;

  return (
    <>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{currentStep.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {
            getSignUpStep(currentStep.name, { signUpInfoState, setSignUpInfoState })
          }
        </Modal.Body>

        <Modal.Footer>
          <Button
            disabled={disablePrevButton}
            onClick={handlePreviousStepClick}
            variant="primary"
          >
            Prev
          </Button>
          { currentStep.index === STEPS.length - 1 ? (
            <Button
              onClick={handleComplete}
              variant="primary"
            >
              Complete
            </Button>
          ) : (
            <Button
              onClick={handleNextStep}
              variant="primary"
            >
              Next
            </Button>
          )}

        </Modal.Footer>
      </Modal.Dialog>
    </>
  );
}

SignUpNewUser.propTypes = {};

SignUpNewUser.defaultProps = {};

export default SignUpNewUser;
