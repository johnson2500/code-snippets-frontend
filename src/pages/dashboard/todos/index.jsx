/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Todo from "../../../components/todo/todo";
import TodoNavBar from "./todosNavBar";
import PreviewTodo from "../../../components/previewTodo";
import mockTodos from "../../../data/mockTodos";

function Todos() {
  const [todoListsState, setTodoListState] = React.useState(mockTodos);
  const [inFocusTodoState, setInFocusTodoState] = React.useState(mockTodos[0]);
  const [inFocusTodoItemState, setInFocusTodoItemState] = React.useState(mockTodos[0].todoItems[0]);

  const handleNavClick = (todoList) => {
    setInFocusTodoState(todoList);
    setInFocusTodoItemState(todoList.todoItems[0]);
  };

  if (false) {
    setTodoListState();
  }

  return (
    <>
      <TodoNavBar
        todoLists={todoListsState}
        navClickHandler={handleNavClick}
      />
      <Container>
        <Row className="p-4">
          <Col sm={6}>
            <Todo
              todoList={inFocusTodoState}
              onItemClickHandler={setInFocusTodoItemState}
            />
          </Col>
          <Col sm={6} className="border-start">
            <PreviewTodo
              todoItemInFocus={inFocusTodoItemState}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

Todos.propTypes = { };

Todos.defaultProps = { };

export default Todos;
