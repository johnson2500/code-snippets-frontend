/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import PropsTypes from 'prop-types';
import EditPreview from './editPreviewTodo';
import ViewPreview from './viewPreviewTodo';

function PreviewTodo(props) {
  const { todoItemInFocus = {} } = props;
  const [editingState, setEditingState] = React.useState(false);

  const onEditButtonClick = () => {
    setEditingState(!editingState);
  };

  return (
    <>
      {editingState ? (
        <EditPreview
          todoItemInFocus={todoItemInFocus}
          onEditButtonClick={onEditButtonClick}
        />
      ) : (
        <ViewPreview
          todoItemInFocus={todoItemInFocus}
          onEditButtonClick={onEditButtonClick}
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
