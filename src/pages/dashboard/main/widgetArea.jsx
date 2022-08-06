import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TodoList from "./todoList";
import MainNavBar from "./mainNavBar";

function Main() {
  return (
    <>
      <MainNavBar />
      <Row className="m-0">
        <Col
          className="overflow-scroll border-end"
          xs={12}
          style={{ maxHeight: 'calc(100vh - 42px)' }}
        >
          <TodoList />
        </Col>
      </Row>
    </>
  );
}

export default Main;
