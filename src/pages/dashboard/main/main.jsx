/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import { Card } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import MainNavBar from "./mainNavBar";

function Main() {
  return (
    <>
      <MainNavBar />
      <Card>
        <Card.Body>
          <PlusCircleFill size={50} />
        </Card.Body>
      </Card>
    </>
  );
}

Main.propTypes = {};

Main.defaultProps = {};

export default Main;
