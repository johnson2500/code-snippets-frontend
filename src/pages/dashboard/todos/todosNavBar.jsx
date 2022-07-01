/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import Nav from "react-bootstrap/Nav";

function TodoNavBar(props) {
  console.log(props);
  return (
    <Nav variant="tabs" defaultActiveKey="/home" className="mw-100">
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Option 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled">Disabled</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

TodoNavBar.propTypes = {};

TodoNavBar.defaultProps = {};

export default TodoNavBar;
