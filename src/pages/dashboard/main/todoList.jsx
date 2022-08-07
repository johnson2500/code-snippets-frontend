/* eslint-disable react/prop-types */
import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import { AccordionTodoList } from './dragAndDrop/AccordianTodoList';

export default function TodoList(props) {
  const { taskList = {} } = props;
  const { taskItems = [] } = taskList;

  const [taskItemsState, setTaskItems] = React.useState(taskItems);
  const [newTaskState, setNewTaskState] = React.useState('');

  const addTask = () => {
    setTaskItems([...taskItems, { title: newTaskState, id: Date.now() }]);
    setNewTaskState('');
  };

  React.useEffect(() => {
    setTaskItems(taskItems);
  }, [taskItems]);

  return (
    <>
      <h6 className="display-6">
        Today&apos;s Tasks
      </h6>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Add a new Task"
          aria-label="Add a new Task"
          aria-describedby="basic-addon2"
          onChange={(e) => setNewTaskState(e.target.value)}
          value={newTaskState}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={addTask}
        >
          Button
        </Button>
      </InputGroup>
      <DndProvider debugMode backend={HTML5Backend}>
        <AccordionTodoList
          tasks={taskItemsState}
          setTasks={setTaskItems}
        />
      </DndProvider>
    </>
  );
}

TodoList.propTypes = {
  taskList: PropTypes.shape({
    taskItems: PropTypes.shape([]),
  }),
};

TodoList.defaultProps = {
  taskList: {},
};
