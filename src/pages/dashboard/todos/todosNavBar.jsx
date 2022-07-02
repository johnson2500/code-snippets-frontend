/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from 'prop-types';
import Nav from "react-bootstrap/Nav";

function TodoNavBar(props) {
  const { todos, navClickHandler } = props;
  const getTabs = (todoLists = []) => todoLists.map((list) => (
    <Nav.Item key={list.name}>
      <Nav.Link key={`link-${list.name}`} onClick={() => navClickHandler(list)}>{list.name}</Nav.Link>
    </Nav.Item>
  ));

  return (
    <Nav variant="tabs" defaultActiveKey="/home" className="mw-100">
      {getTabs(todos)}
    </Nav>
  );
}

TodoNavBar.propTypes = {
  todos: PropTypes.array,
  navClickHandler: PropTypes.func,
};

TodoNavBar.defaultProps = {
  todos: [],
  navClickHandler: () => {},
};

export default TodoNavBar;
