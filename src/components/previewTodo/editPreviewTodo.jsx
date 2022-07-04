/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import Form from "react-bootstrap/Form";
import moment from "moment";
import PropsTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';

function EditTodo(props) {
  const { todoItemInFocus = {} } = props;
  const { title, description, dueDate } = todoItemInFocus;

  const [dateState, setDateState] = React.useState(moment(dueDate).format("YYYY-MM-DD"));
  const [descriptionState, setDescriptionState] = React.useState(description);

  return (
    <>
      <Form.Group className="p-1">
        <Form.Control
          value={title}
          onChange={(e) => setDateState(e.target.value)}
        />
      </Form.Group>
      <h6 className="p-1 border">
        <Badge>{todoItemInFocus.tags[0]}</Badge>
      </h6>
      <div>
        <Form.Group className="p-1">
          <Form.Control
            type="date"
            name="duedate"
            placeholder="Due date"
            value={dateState}
            onChange={(e) => setDateState(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="p-1">
          <Form.Control
            as="textarea"
            value={descriptionState}
            rows={5}
            onChange={(e) => { setDescriptionState(e.target.value); }}
          />
        </Form.Group>
      </div>
    </>
  );
}

EditTodo.propTypes = {
  todoItemInFocus: PropsTypes.shape({
    title: PropsTypes.string,
    dueDate: PropsTypes.instanceOf(Date),
    description: PropsTypes.string,
  }),
};

EditTodo.defaultProps = {
  todoItemInFocus: {
    title: '',
    dueDate: Date.now(),
    description: '',
  },
};

export default EditTodo;
