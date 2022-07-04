/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import { Card } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";

function AddTodoList() {
  return (
    <>
      <Card>
        <Card.Body>
          <PlusCircleFill size={50} />
        </Card.Body>
      </Card>
    </>
  );
}

AddTodoList.propTypes = {};

AddTodoList.defaultProps = {};

export default AddTodoList;
