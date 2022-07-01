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
  const { todo: { todo = {} } = {} } = props;

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
            {todo.title || "Todo"}
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
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({}),
};

Todo.defaultProps = {
  todo: {},
};
