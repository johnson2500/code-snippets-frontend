/* eslint-disable react/forbid-prop-types */
import React from 'react';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { Accordion } from 'react-bootstrap';
import { AccordionTodoItem } from './AccordianTodoItem';
import ItemTypes from './ItemTypes';

export const style = {
  width: 400,
};

export const AccordionTodoList = ({ tasks, setTasks }) => {
  const findTask = (id) => {
    const task = tasks.filter((c) => `${c.id}` === id)[0];
    return {
      task,
      index: tasks.indexOf(task),
    };
  };

  const moveTask = (id, atIndex) => {
    const { task, index } = findTask(id);
    setTasks(update(tasks, {
      $splice: [
        [index, 1],
        [atIndex, 0, task],
      ],
    }));
  };

  const [, drop] = useDrop({ accept: ItemTypes.TASK });
  return (
    <Accordion ref={drop}>
      {tasks.map((task) => (
        <AccordionTodoItem
          key={task.id}
          eventKey={task.id}
          id={`${task.id}`}
          moveTask={moveTask}
          findTask={findTask}
          item={task}
        />
      ))}
    </Accordion>
  );
};

AccordionTodoList.propTypes = {
  tasks: PropTypes.array,
  setTasks: PropTypes.func,
};

AccordionTodoList.defaultProps = {
  tasks: [],
  setTasks: () => {},
};
