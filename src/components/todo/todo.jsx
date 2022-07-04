/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import ListGroup from "react-bootstrap/ListGroup";
import { makeRequest } from "../../helpers";
import { ADD_TODO } from "../../redux/reducers/todoReducers";
import store from "../../redux/store";

export default function Todo(props) {
  const { todoList = {}, onItemClickHandler } = props;

  const getTodoItems = (todos, onClickHandler) => todos.map((item) => (
    <ListGroup.Item key={item.title} onClick={() => onClickHandler(item)}>
      {item.title}
    </ListGroup.Item>
  ));

  const [todoItemState, setTodoItemState] = useState("");

  const handleAdd = async () => {
    const todoResponse = await makeRequest({
      url: "/todo",
      method: "post",
      data: {
        content: todoItemState,
      },
      token: "",
    });

    const todoItem = todoResponse.data;

    store.dispatch({
      type: ADD_TODO,
      payload: todoItem,
    });

    setTodoItemState("");
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            {todoList.name || "Todo"}
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={handleAdd}
              >
                <PlusCircle />
              </Button>
            </InputGroup>
          </Card.Title>
          <ListGroup variant="flush">
            {getTodoItems(todoList.todoItems, onItemClickHandler)}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

Todo.propTypes = {
  todoList: PropTypes.shape({}),
  onItemClickHandler: PropTypes.func,
};

Todo.defaultProps = {
  todoList: {},
  onItemClickHandler: () => {},
};
