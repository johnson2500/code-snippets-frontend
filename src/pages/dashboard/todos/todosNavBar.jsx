/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from 'prop-types';
import Nav from "react-bootstrap/Nav";

function TodoNavItems(props) {
  const { todoLists, navClickHandler } = props;

  return todoLists.map((list) => {
    const { todoList } = list;
    console.log(todoList);
    return (
      <Nav.Item key={todoList.name}>
        <Nav.Link key={`link-${todoList.name}`} onClick={() => navClickHandler(todoList)}>{todoList.name}</Nav.Link>
      </Nav.Item>
    );
  });
}

function TodoNavBar(props) {
  const { todoLists, navClickHandler } = props;
  console.log("TodoListNavBar", props);
  return (
    <Nav variant="tabs" defaultActiveKey="/home" className="mw-100">
      <TodoNavItems
        todoLists={todoLists}
        navClickHandler={navClickHandler}
      />
    </Nav>
  );
}

TodoNavBar.propTypes = {
  todoLists: PropTypes.array,
  navClickHandler: PropTypes.func,
};

TodoNavBar.defaultProps = {
  todoLists: [],
  navClickHandler: () => {},
};

export default TodoNavBar;
