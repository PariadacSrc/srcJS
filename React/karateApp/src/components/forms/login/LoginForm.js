import React, { Component } from "react";

import {
  clearFormErrors,
  limitSize,
  validateFormRules
} from "../../rules/validateFormRules";

//Route Components
import { NavLink } from "react-router-dom";

//Redux Conection
import { connect } from "react-redux";
//Actions
import { logInUser } from "../../../store/actions/authActions";
import { setLastcallModal } from "../../../store/actions/modalsActions";
import {
  setLastcallFormAlert,
  fetchFormAlert
} from "../../../store/actions/formAlertsActions";
//Validations
import { attachEvent, clearBlankSpaces } from "../../rules/validateFormRules";
//Helpers
import AlertsModal from "../../summarimessages/AlertsModal";
import AlertsForms from "../../summarimessages/AlertsForms";

let modalId = "";
let alertFormId = "";

class LoginForm extends Component {
  state = {
    user: "",
    password: ""
  };

  componentDidMount() {
    attachEvent(".main-form-block input.nospaces", clearBlankSpaces);
  }

  componentWillUnmount() {
    attachEvent(".main-form-block input.nospaces", clearBlankSpaces, "remove");
  }

  changeHandler = event => {
    clearFormErrors(event.target);
    this.setState({
      [event.target.getAttribute("id")]: event.target.value
    });
  };

  getOptionalLogin = () => {
    return (
      <div className="optionallogins">
        <div className="divorline">
          <span>or</span>
        </div>
        <ul>
          <li>
            <NavLink to="/">
              <i className="fab fa-facebook-f" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <i className="fab fa-google-plus-g" />
            </NavLink>
          </li>
        </ul>
      </div>
    );
  };

  submitHandler = e => {
    e.preventDefault();
    if (validateFormRules([], e).length === 0) {
      this.props.logInUser(this.state);
    } else {
      this.props.fetchFormAlert({
        id: alertFormId,
        status: "error",
        form_alert_body: "Please enter all required values"
      });
    }
  };
  render() {
    return (
      <div className="main-form-block">
        <div>
          <form action="#" onSubmit={this.submitHandler}>
            <div className="textlabel">
              <span>Sign in</span>
            </div>
            <AlertsForms
              alertFormId={id => {
                alertFormId = id;
              }}
            />
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="user">User Name</label>
                <div>
                  <input
                    placeholder="User Name"
                    id="user"
                    type="text"
                    data-maxsize="15"
                    className="validate nospaces"
                    onChange={e => {
                      limitSize(e);
                      this.changeHandler(e);
                    }}
                  />
                </div>
              </div>
              <div className="input-field col s12">
                <label htmlFor="password">Password</label>
                <div>
                  <input
                    placeholder="Password"
                    id="password"
                    type="password"
                    data-maxsize="15"
                    className="validate nospaces"
                    onChange={e => {
                      limitSize(e);
                      this.changeHandler(e);
                    }}
                  />
                </div>
              </div>
              <div className="col s12">
                <div className="recoverpass">
                  <NavLink to="/recoverpass">
                    Forgot password or username?
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="row buttonscontainer">
              <div className="col s6">
                <NavLink
                  className="blue-custom-button blackbutton"
                  to="/sign-in"
                >
                  Create Account
                </NavLink>
              </div>
              <div className="col s6">
                <button className="blue-custom-button" type="submit">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
        {/*Optional Login Space */}
        <AlertsModal
          modalId={id => {
            modalId = id;
          }}
        />
      </div>
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
    logInUser: user => dispatch(logInUser(user)),
    setLastcallModal: id => dispatch(setLastcallModal(id)),
    setLastcallFormAlert: id => dispatch(setLastcallFormAlert(id)),
    fetchFormAlert: data => dispatch(fetchFormAlert(data))
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(LoginForm);
