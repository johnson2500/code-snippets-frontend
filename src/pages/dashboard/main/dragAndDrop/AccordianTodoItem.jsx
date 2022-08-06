/* eslint-disable react/prop-types */
import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

export const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

export const AccordionTodoItem = ({
  id,
  eventKey,
  moveTask,
  findTask,
  item = {},
}) => {
  const { title = '', dueDate = '', description = '', tags = [] } = item;
  const originalIndex = findTask(id).index;

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.TASK,
      id,
      originalIndex,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_dropResult, monitor) => {
      const { id: droppedId, originalIndex: ind } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveTask(droppedId, ind);
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
  const opacity = isDragging ? 0 : 1;

  return (
    <Accordion.Item
      eventKey={eventKey}
      ref={(node) => drag(drop(node))}
      style={{ opacity }}
    >
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body>
        {dueDate}
        {description}
        {tags}
      </Accordion.Body>
    </Accordion.Item>
  );
};
