import React, { Component } from "react";
import { validateFormRules } from "../rules/validateFormRules";

//Bootstrap Components
import { Form, Button, Col } from "react-bootstrap";
//Redux Conection
import { connect } from "react-redux";
//Actions
import { logInUser } from "../../store/actions/authActions";

export class SignIn extends Component {
  /*Main State*/
  state = {
    user: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.getAttribute("data-field")]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    if (validateFormRules(e)) {
      this.props.logInUser(this.state);
    }
  };

  render() {
    return (
      <Form onSubmit={this.submitHandler}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridUser">
            <Form.Label>User</Form.Label>
            <Form.Control
              type="text"
              data-field="user"
              placeholder="User"
              onChange={this.changeHandler}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              data-field="password"
              placeholder="Password"
              onChange={this.changeHandler}
            />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

const maspStateToProps = state => {
  return {
    logged: state.auth.logged,
    authError: state.auth.authError
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    logInUser: user => dispatch(logInUser(user))
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(SignIn);
