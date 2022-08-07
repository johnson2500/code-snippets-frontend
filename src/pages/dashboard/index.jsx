import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DashboardError from "./dashboardComponents/dashboardError";
import Notes from "./notes/notes";
import Main from "./main/main";

function Dashboard(props) {
  const { projects = [{}], auth = {}, dispatch } = props;
  const [errorMsgState, setErrorMsgState] = React.useState(null);
  const projectInFocus = projects[0];

  React.useEffect(() => {
    setErrorMsgState(null);
  }, []);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="/dashboard/main">
      <Row className="vh-100">
        <Col sm={2} className="bg-dark p-0">
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
        <Col sm={10} className="p-0 m-0">
          <Tab.Content>
            <DashboardError errorMsg={errorMsgState} />
            <Tab.Pane eventKey="/dashboard/main">
              <Main
                dispatch={dispatch}
                auth={auth}
                project={projectInFocus}
              />
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

Dashboard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  projects: PropTypes.array,
  auth: PropTypes.shape({}),
  dispatch: PropTypes.func,
};

Dashboard.defaultProps = {
  projects: [],
  auth: {},
  dispatch: () => {},
};

const mapStateToProps = (state) => ({ projects: state.projectsReducer, auth: state.authReducer });

export default connect(mapStateToProps)(Dashboard);
