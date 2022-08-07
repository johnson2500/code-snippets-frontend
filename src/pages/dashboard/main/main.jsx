import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import TodoList from "./todoList";
import MainNavBar from "./mainNavBar";

function Main(props) {
  const { project, auth } = props;
  const { taskList } = project;
  return (
    <>
      <MainNavBar />
      <Row className="m-0">
        <Col
          className="overflow-scroll border-end"
          xs={12}
          style={{ maxHeight: 'calc(100vh - 42px)' }}
        >
          <TodoList
            auth={auth}
            projectId={project.id}
            taskList={taskList}
          />
        </Col>
      </Row>
    </>
  );
}

Main.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string,
    taskList: PropTypes.shape({}),
  }),
  auth: PropTypes.shape({}),
};

Main.defaultProps = {
  project: {},
  auth: {},
};
export default Main;
