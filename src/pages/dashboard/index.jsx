/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import { connect } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
// import {
//   Calendar2CheckFill,
//   CardChecklist,
//   JournalText,
//   PersonFill,
// } from "react-bootstrap-icons";
import Dropdown from "react-bootstrap/Dropdown";
import DashboardError from "./dashboardComponents/dashboardError";
import Notes from "./notes/notes";
import Main from "./main/main";

function Dashboard() {
  const [errorMsgState, setErrorMsgState] = React.useState(null);

  React.useEffect(() => {
    setErrorMsgState(null);
  }, []);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="/dashboard/main">
      <Row className="vh-100">
        <Col sm={1} className="bg-dark p-0">
          <Nav
            variant="pills"
            className="nav-fill flex-column navbar navbar-dark bg-dark"
          >
            <Nav.Item className="w-100">
              <Dropdown>
                <Dropdown.Toggle className="w-100 text-white" variant="none">
                  Project
                </Dropdown.Toggle>
              </Dropdown>
            </Nav.Item>
            <Nav.Item className="w-100">
              <Nav.Link className="rounded-0 " eventKey="/dashboard/main">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="w-100">
              <Nav.Link className="rounded-0" eventKey="/dashboard/todos">
                Todos
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="w-100">
              <Nav.Link className="rounded-0" eventKey="/dashboard/notes">
                Notes
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={11} className="p-0 m-0">
          <Tab.Content>
            <DashboardError errorMsg={errorMsgState} />
            <Tab.Pane eventKey="/dashboard/main">
              <Main />
            </Tab.Pane>
            {/* <Tab.Pane eventKey="/dashboard/todos">
              <Todos />
            </Tab.Pane> */}
            <Tab.Pane eventKey="/dashboard/notes">
              <Notes />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Dashboard);
