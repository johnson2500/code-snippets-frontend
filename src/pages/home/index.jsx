/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import todoListImage from "../../assets/todo-list.jpeg";
import SignInSignUp from "../../components/signInModal/signInSignUp";

function Home() {
  return (
    <>
      <Container>
        <Row>
          <Col align="center">
            <img src={todoListImage} alt="" />
          </Col>
          <Col align="center">
            <SignInSignUp />
          </Col>
        </Row>
      </Container>
    </>
  );
}

Home.propTypes = {};

Home.defaultProps = {};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Home);
