/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import Form from "react-bootstrap/Form";
import moment from "moment";
import PropsTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import { Calendar } from "react-bootstrap-icons";

function PreviewTodo(props) {
  const { todoItemInFocus = { tags: [] }, className } = props;
  const { title, dueDate, description } = todoItemInFocus;

  const [dateState, setDateState] = React.useState(moment(dueDate).format("YYYY-MM-DD"));

  return (
    <>
      <div className={className}>
        <h1>{title}</h1>
        <b>Tags</b>
        <h6 className="p-1">
          {todoItemInFocus?.tags?.length && <Badge>{todoItemInFocus?.tags[0]}</Badge>}
        </h6>
        <div>
          <b>Due Date</b>
          <Form.Group className="p-1">
            <Calendar />
            <Form.Control
              type="date"
              name="duedate"
              disabled
              placeholder="Due date"
              value={dateState}
              label="Due Date"
              onChange={(e) => setDateState(e.target.value)}
            />
          </Form.Group>
          <b>Description</b>
          <p className="p-1">{description}</p>
        </div>
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
  className: PropsTypes.string,
};

PreviewTodo.defaultProps = {
  todoItemInFocus: {
    title: '',
    dueDate: Date.now(),
    description: '',
  },
  className: '',
};

export default PreviewTodo;
