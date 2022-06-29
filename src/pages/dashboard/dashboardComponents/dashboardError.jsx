import React from "react";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

const DashboardError = (props) => {
  const { errorMsg } = props;
  const [show, setShow] = React.useState(!!errorMsg);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{errorMsg}</p>
      </Alert>
    );
  }

  return <></>;
};

export default DashboardError;

DashboardError.propTypes = {
  errorMsg: PropTypes.string,
};

DashboardError.defaultProps = {
  errorMsg: "",
};
