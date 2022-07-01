/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import Nav from "react-bootstrap/Nav";

function MainNavBar(props) {
  console.log(props);
  return (
    <Nav variant="" defaultActiveKey="/home" className="mw-100">
      <Nav.Item>
        <Nav.Link eventKey="">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="">Option 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="">Disabled</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

MainNavBar.propTypes = {};

MainNavBar.defaultProps = {};

export default MainNavBar;
