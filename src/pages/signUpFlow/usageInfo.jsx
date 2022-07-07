/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { CARREERS } from "./singUpdata";

function UsageInfo(props) {
  const { setSignUpInfoState, signUpInfoState } = props;

  const setInputValue = (value, key) => {
    setSignUpInfoState({ ...signUpInfoState, [key]: value });
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>What do you intend to use TODOH for?</Form.Label>
        <Form.Select placeholder="N/A" onChange={(e) => setInputValue(e.target.value, 'usage')}>
          <option>{signUpInfoState.usage || '-'}</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Other</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>What do you do for work?</Form.Label>
        <Form.Select placeholder="N/A" onChange={(e) => setInputValue(e.target.value, 'career')}>
          <option>{signUpInfoState.carreer || '-'}</option>
          {CARREERS.sort().map((carreer) => <option key={carreer}>{carreer}</option>)}
        </Form.Select>
      </Form.Group>
    </>
  );
}

UsageInfo.propTypes = {
  setSignUpInfoState: PropTypes.func,
  signUpInfoState: PropTypes.object,
};

UsageInfo.defaultProps = {
  signUpInfoState: {},
  setSignUpInfoState: () => {},
};

export default UsageInfo;
