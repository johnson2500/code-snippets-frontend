/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import { connect } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DashboardError from "./dashboardComponents/dashboardError";
import Todos from "./todos";
import Notes from "./notes/notes";
import Main from "./main/main";

function Dashboard() {
  const [errorMsgState, setErrorMsgState] = React.useState(null);

  React.useEffect(() => {
    setErrorMsgState(null);
  }, []);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="/dashboard/todos">
      <Row className="vh-100">
        <Col sm={2}>
          <Dropdown>
            <Dropdown.Toggle className="w-100" variant="none">
              Project
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Project 1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Project 2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Project 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link className="rounded-0" eventKey="/dashboard/main">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="rounded-0" eventKey="/dashboard/todos">
                Todos
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="rounded-0" eventKey="/dashboard/notes">
                Notes
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10} className="p-0 m-0">
          <Tab.Content>
            <DashboardError errorMsg={errorMsgState} />
            <Tab.Pane eventKey="/dashboard/main">
              <Main />
            </Tab.Pane>
            <Tab.Pane eventKey="/dashboard/todos">
              <Todos />
            </Tab.Pane>
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
