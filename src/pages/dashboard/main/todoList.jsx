import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AccordionTodoList } from './dragAndDrop/AccordianTodoList';
import mockTodos from '../../../data/mockTodos';

export default function TodoList({
  // eslint-disable-next-line react/prop-types
  todoList = mockTodos,
}) {
  const [tasksState, setTasksState] = React.useState(todoList.todoItems || []);
  const [newTaskState, setNewTaskState] = React.useState('');

  const addTask = () => {
    // add task to list of tasks
    setTasksState([...tasksState, { title: newTaskState, id: Date.now() }]);
    // clear state on button click
    setNewTaskState('');
  };

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
          tasks={tasksState}
          setTasks={setTasksState}
        />
      </DndProvider>
    </>
  );
}
