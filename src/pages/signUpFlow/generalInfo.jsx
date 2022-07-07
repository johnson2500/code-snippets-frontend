/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

function GeneralInfo(props) {
  const { setSignUpInfoState, signUpInfoState } = props;

  const setInputValue = (value, key) => {
    setSignUpInfoState({ ...signUpInfoState, [key]: value });
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control value={signUpInfoState.firstName} placeholder="First Name" onChange={(e) => setInputValue(e.target.value, 'firstName')} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control value={signUpInfoState.lastName} placeholder="Last Name" onChange={(e) => setInputValue(e.target.value, 'lastName')} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          name="birthDate"
          placeholder="Birthday"
          value={signUpInfoState.birthDay || moment(new Date()).format("YYYY-MM-DD")}
          onChange={(e) => setInputValue(e.target.value, 'birthDay')}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <Form.Select onChange={(e) => setInputValue(e.target.value, 'gender')}>
          <option>{signUpInfoState.gender || '-'}</option>
          <option>Male</option>
          <option>Female</option>
          <option>Non-binary</option>
          <option>Other</option>
        </Form.Select>
      </Form.Group>
    </>
  );
}

GeneralInfo.propTypes = {
  setSignUpInfoState: PropTypes.func,
  signUpInfoState: PropTypes.object,
};

GeneralInfo.defaultProps = {
  signUpInfoState: {},
  setSignUpInfoState: () => {},
};

export default GeneralInfo;
