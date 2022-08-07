/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import { AccordionTodoList } from './dragAndDrop/AccordianTodoList';
import { makeRequest } from '../../../helpers';

export default function TodoList(props) {
  const { taskList = {}, projectId = '', auth = {}, dispatch } = props;
  const { taskItems = [] } = taskList;

  const [taskItemsState, setTaskItems] = React.useState(taskItems);
  const [newTaskState, setNewTaskState] = React.useState('');

  const addTask = () => {
    makeRequest({
      url: "/task-item",
      token: auth.accessToken,
      method: "POST",
      data: {
        projectId,
        title: newTaskState,
      },
    })
      .then((repsonse) => repsonse.data)
      .then((data) => {
        const { id } = data;
        setTaskItems([...taskItemsState, { title: newTaskState, id }]);
        setNewTaskState('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCompleteHandler = ({ completed, taskId }) => {
    makeRequest({
      method: "POST",
      url: '/task-item/update-complete',
      token: auth.accessToken,
      data: {
        taskId,
        projectId,
        completed,
      },
    }).then(() => {
      dispatch({ type: "SET_COMPLETE_TASK", payload: { taskId, completed } });
    });
  };

  React.useEffect(() => {
    setTaskItems(taskItems);
  }, [taskList]);

  const progress = taskItems
    ? taskItemsState.filter((task) => task.completed === true).length
    : 0;

  const taskLength = taskItems.length;

  const getProgressFeedBack = () => {
    const percentComplete = parseInt((progress / taskLength) * 100, 10);

    if (percentComplete < 20) {
      return 'danger';
    }

    if (percentComplete > 20 && percentComplete < 50) {
      return 'warning';
    }
    return 'success';
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
      <ProgressBar variant={getProgressFeedBack()} label={`${progress}/${taskLength} Complete`} now={progress} max={taskLength} className="mb-2" />
      <DndProvider debugMode backend={HTML5Backend}>
        <AccordionTodoList
          tasks={taskItemsState}
          setTasks={setTaskItems}
          onCompleteHandler={onCompleteHandler}
        />
      </DndProvider>
    </>
  );
}

TodoList.propTypes = {
  taskList: PropTypes.shape({
    taskItems: PropTypes.array,
  }),
  projectId: PropTypes.string,
  auth: PropTypes.shape({}),
  dispatch: PropTypes.func,
};

TodoList.defaultProps = {
  taskList: {},
  auth: {},
  projectId: '',
  dispatch: () => {},
};
