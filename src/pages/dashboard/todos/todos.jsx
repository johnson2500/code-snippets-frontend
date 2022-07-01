/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Todo from "../../../components/todo/todo";
import TodoNavBar from "./todosNavBar";
import AddTodoList from "./addTodoList";

function Todos() {
  return (
    <>
      <TodoNavBar />
      <Container>
        <Row className="p-4">
          <Col sm={4}>
            {" "}
            <Todo todo={{}} />
          </Col>
          <Col sm={4}>
            <Todo todo={{}} />
          </Col>
          <Col sm={4}>
            <Todo todo={{}} />
          </Col>
        </Row>
        <Row className="p-4">
          <Col sm={4}>
            {" "}
            <Todo todo={{}} />
          </Col>
          <Col sm={4}>
            <Todo todo={{}} />
          </Col>
          <Col sm={4}>
            <AddTodoList />
          </Col>
        </Row>
      </Container>
    </>
  );
}

Todos.propTypes = {};

Todos.defaultProps = {};

export default Todos;
