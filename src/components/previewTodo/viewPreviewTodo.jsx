/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import Form from "react-bootstrap/Form";
import moment from "moment";
import PropsTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import { Calendar } from "react-bootstrap-icons";

function PreviewTodo(props) {
  const { todoItemInFocus = {} } = props;
  const { title, dueDate, description } = todoItemInFocus;

  const [dateState, setDateState] = React.useState(moment(dueDate).format("YYYY-MM-DD"));

  return (
    <>
      <h1>{title}</h1>
      <h6 className="p-1">
        <Badge>{todoItemInFocus.tags[0]}</Badge>
      </h6>
      <div>
        <Form.Group className="p-1">
          <Calendar />
          <Form.Control
            type="date"
            name="duedate"
            disabled
            placeholder="Due date"
            value={dateState}
            onChange={(e) => setDateState(e.target.value)}
          />
        </Form.Group>
        <p className="p-1">{description}</p>
      </div>
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
