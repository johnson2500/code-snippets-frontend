/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import PropsTypes from 'prop-types';

function PreviewTodo(props) {
  const { todoItemInFocus = {} } = props;
  return (
    <>
      {JSON.stringify(todoItemInFocus)}
    </>
  );
}

PreviewTodo.propTypes = {
  todoItemInFocus: PropsTypes.shape({}),
};

PreviewTodo.defaultProps = {
  todoItemInFocus: {},
};

export default PreviewTodo;
