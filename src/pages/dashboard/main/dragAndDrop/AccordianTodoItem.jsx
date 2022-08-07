/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Accordion from 'react-bootstrap/Accordion';
import ItemTypes from './ItemTypes';

export const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

export const AccordionTodoItem = ({
  onCompleteHandler,
  setActiveKey,
  moveTask,
  findTask,
  item = {},
}) => {
  const { id, title = '', dueDate = '', description = '', tags = [], completed = false } = item;
  const { index: originalIndex } = findTask(id);

  const [completedState, setCompletedState] = React.useState(completed);

  const [, drag] = useDrag({
    item: {
      type: ItemTypes.TASK,
      id,
      originalIndex,
    },
    end: (_dropResult, monitor) => {
      const { id: droppedId, originalIndex: _originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveTask(droppedId, _originalIndex);
      }
    },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findTask(id);
        moveTask(draggedId, overIndex);
      }
    },
  });

  const handleOnComplete = () => {
    onCompleteHandler({ taskId: id, completed: !completedState });
    setCompletedState(!completedState);
  };

  const overRide = (e) => {
    // only expand if that header is clicked
    if (`input-${id}` === e.target.id) {
      return;
    }
    setActiveKey(id);
  };

  return (
    <Accordion.Item
      eventKey={id}
      ref={(node) => drag(drop(node))}
    >
      <Accordion.Header onClick={overRide}>
        <input id={`input-${id}`} onClick={handleOnComplete} checked={completedState} type="checkbox" className="me-2 ms-2" />
        {
          completedState ? (
            <del className="me-2 ms-2">{title}</del>
          ) : (
            <b className="me-2 ms-2">{title}</b>
          )
        }
      </Accordion.Header>
      <Accordion.Body>
        <b>Due Date</b>
        <br />
        {dueDate}
        <br />
        <b>description</b>
        <br />
        {description}
        <br />
        <b>Tags</b>
        <br />
        {tags}
      </Accordion.Body>
    </Accordion.Item>
  );
};
