/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import PropsTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import EditPreiveiw from './editPreviewTodo';
import ViewPreview from './viewPreviewTodo';

function PreviewTodo(props) {
  const { todoItemInFocus = {} } = props;
  const [editingState, setEditingState] = React.useState(false);

  return (
    <>
      <Button onClick={() => setEditingState(!editingState)}>Edit</Button>
      {editingState ? (
        <EditPreiveiw
          todoItemInFocus={todoItemInFocus}
        />
      ) : (
        <ViewPreview
          todoItemInFocus={todoItemInFocus}
        />
      )}
    </>
  );
}

PreviewTodo.propTypes = {
  todoItemInFocus: PropsTypes.shape({
    title: PropsTypes.string,
    dueDate: PropsTypes.instanceOf(Date),
    description: PropsTypes.string,

  }),
};

PreviewTodo.defaultProps = {
  todoItemInFocus: {
    title: '',
    dueDate: Date.now(),
    description: '',
  },
};

export default PreviewTodo;
