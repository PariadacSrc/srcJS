import React, { Component } from "react";

//Validations
import {
  attachEvent,
  limitSize,
  clearBlankSpaces
} from "../../../rules/validateFormRules";
let alertFormId = "";
class StepOne extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    attachEvent(".main-form-block input.nospaces", clearBlankSpaces);
    this.props.setLastAlert(alertFormId);
  }

  componentWillUnmount() {
    attachEvent(".main-form-block input.nospaces", clearBlankSpaces, "remove");
  }

  render() {
    const {
      user_name,
      password,
      password_confirmation,
      recordtype
    } = this.props.formprops;
    const AlertComponent = this.props.AlertComponent;
    return (
      <div className="row">
        <div className="col s12">
          <div className="textlabel">
            <span>create user</span>
          </div>
          <AlertComponent
            alertFormId={id => {
              alertFormId = id;
            }}
          />
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="user_name">User Name</label>
              <div>
                <input
                  placeholder="User Name"
                  id="user_name"
                  name="user_name"
                  type="text"
                  className="validate nospaces"
                  data-maxsize="15"
                  value={user_name}
                  onChange={e => {
                    limitSize(e);
                    this.props.handleChange(e);
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
                  name="password"
                  type="password"
                  className="validate nospaces vbond vlimit"
                  data-bondfield="#password_confirmation"
                  value={password}
                  data-maxsize="15"
                  data-minsize="8"
                  onChange={e => {
                    limitSize(e);
                    this.props.handleChange(e);
                  }}
                />
              </div>
            </div>
            <div className="input-field col s12">
              <label htmlFor="password_confirmation">
                Password Confirmation
              </label>
              <div>
                <input
                  placeholder="Password Confirmation"
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  className="validate nospaces vbond vlimit"
                  data-bondfield="#password"
                  value={password_confirmation}
                  data-maxsize="15"
                  data-minsize="8"
                  onChange={e => {
                    limitSize(e);
                    this.props.handleChange(e);
                  }}
                />
              </div>
            </div>
            <div className="input-field col s12">
              <label htmlFor="recordtype">Please select your registration type</label>
              <div className="minflex radiocontent">
                <p>
                  <label>
                    <input
                      name="recordtype"
                      type="radio"
                      value="individual"
                      checked={recordtype === "individual"}
                      onChange={e => {
                        this.props.handleChangeMainForm(e);
                      }}
                    />
                    <span>Individual</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      name="recordtype"
                      type="radio"
                      value="team"
                      checked={recordtype === "team"}
                      onChange={e => {
                        this.props.handleChangeMainForm(e);
                      }}
                    />
                    <span>Team</span>
                  </label>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StepOne;
