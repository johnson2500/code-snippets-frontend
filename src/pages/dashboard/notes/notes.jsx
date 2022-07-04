/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";

function Notes() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="home">
      <Row className="vh-100">
        <Col sm={2} className="border border-right">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link className="rounded-0" eventKey="home">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="rounded-0" eventKey="notes">
                Notes
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="rounded-0" eventKey="notes">
                Notes
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10} className="p-0 m-0">
          <Tab.Content>
            <Tab.Pane eventKey="notes">
              <div>Hello</div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

Notes.propTypes = {};

Notes.defaultProps = {};

export default Notes;
