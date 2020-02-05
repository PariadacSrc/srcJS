import React, { Component } from "react";

//Helpers
import AlertsForms from "../summarimessages/AlertsForms";
import { baseUrl } from "../../config/envConfig";
import ComfirmRecovery from "../summarimessages/ConfirmRecovery";
//Route Builder Components
import { NavLink } from "react-router-dom";
//Validations
import {
  attachEvent,
  limitSize,
  clearBlankSpaces,
  clearFormErrors,
  validateFormRules
} from "../rules/validateFormRules";

//Redux Conection
import { connect } from "react-redux";

import {
  setLastcallFormAlert,
  fetchFormAlert
} from "../../store/actions/formAlertsActions";
import {
  recoveryPasswordRequest,
  recoveryPasswordConfirmation,
  resetStore
} from "../../store/actions/usersActions";

let alertFormId = "";
class RecoverPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
      url: `${baseUrl}recoverpass/`
    };
  }
  componentDidMount() {
    attachEvent(".main-form-block input.nospaces", clearBlankSpaces);
    this.props.resetStore();
  }

  componentWillUnmount() {
    attachEvent(".main-form-block input.nospaces", clearBlankSpaces, "remove");
  }

  mainStepsValidations = event => {
    const validations = validateFormRules();
    if (validations.length === 0) {
      return true;
    } else {
      let emptyfield = 0,
        notmatch = 0,
        minlimint = 0,
        anyerror = 0;

      validations.map(errors => {
        errors.map(error => {
          switch (error.type) {
            case "emptyflield":
              emptyfield++;
              break;

            case "notmatch":
              notmatch++;
              break;

            case "minlimint":
              minlimint++;
              break;

            default:
              anyerror++;
              break;
          }
        });
      });

      if (emptyfield > 0 || anyerror > 0) {
        this.props.fetchFormAlert({
          id: alertFormId,
          status: "error",
          form_alert_body: "Please enter all required values"
        });
      }

      if (emptyfield === 0 && notmatch > 0) {
        this.props.fetchFormAlert({
          id: alertFormId,
          status: "error",
          form_alert_body: "The password value and confirmation do not match"
        });
      }

      if (emptyfield === 0 && notmatch === 0 && minlimint > 0) {
        this.props.fetchFormAlert({
          id: alertFormId,
          status: "error",
          form_alert_body:
            "The password cannot be less than 8 characters and a maximum of 15"
        });
      }

      return false;
    }
  };

  //Layouts

  requestForm = () => {
    return (
      <div className="input-field col s12">
        <label htmlFor="user">Username or Email</label>
        <div>
          <input
            placeholder="User Name"
            id="user"
            type="text"
            name="user"
            className="validate nospaces"
            onChange={e => {
              this.handleChange(e);
            }}
          />
        </div>
      </div>
    );
  };

  confirmForm = () => {
    return (
      <div>
        <div className="input-field col s12">
          <label htmlFor="password">Password</label>
          <div>
            <input
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              className="validate nospaces vbond vlimit"
              data-bondfield="#password_confirmation"
              data-maxsize="15"
              data-minsize="8"
              onChange={e => {
                limitSize(e);
                this.handleChange(e);
              }}
            />
          </div>
        </div>
        <div className="input-field col s12">
          <label htmlFor="password_confirmation">Password Confirmation</label>
          <div>
            <input
              placeholder="Password Confirmation"
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              className="validate nospaces vbond vlimit"
              data-bondfield="#password"
              data-maxsize="15"
              data-minsize="8"
              onChange={e => {
                limitSize(e);
                this.handleChange(e);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  //Handlers
  handleChange = event => {
    clearFormErrors(event.target);
    const { value, name } = event.target;
    let auxdata = this.state;
    auxdata[name] = value;
    this.setState({
      auxdata
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.mainStepsValidations(event)) {
      if (this.props.match.params.token) {
        this.props.recoveryPasswordConfirmation({
          token: this.props.match.params.token,
          password: this.state.password
        });
      } else {
        this.props.recoveryPasswordRequest({
          user: this.state.user,
          url: this.state.url
        });
      }
    }
  };

  render() {
    if (!this.props.data) {
      return (
        <div className="main-form-block">
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="textlabel">
                <span>Forgot password or username?</span>
              </div>
              <AlertsForms
                alertFormId={id => {
                  alertFormId = id;
                }}
              />
              <div className="row">
                {this.props.match.params.token
                  ? this.confirmForm()
                  : this.requestForm()}
              </div>
              <div className="row buttonscontainer">
                <div className="col s6">
                  <NavLink to="/" className="blue-custom-button blackbutton">
                    Cancel
                  </NavLink>
                </div>
                <div className="col s6">
                  <button className="blue-custom-button">Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return <ComfirmRecovery recordtype={this.props.data} />;
    }
  }
}
const maspStateToProps = state => {
  return {
    data: state.userrecord.helperdata
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    recoveryPasswordRequest: data => dispatch(recoveryPasswordRequest(data)),
    recoveryPasswordConfirmation: data =>
      dispatch(recoveryPasswordConfirmation(data)),
    setLastcallFormAlert: id => dispatch(setLastcallFormAlert(id)),
    fetchFormAlert: data => dispatch(fetchFormAlert(data)),
    resetStore: () => dispatch(resetStore())
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(RecoverPassword);
