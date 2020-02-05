import React, { Component } from "react";

//Helpers Componentes

import {
  attachEvent,
  clearBlankSpaces,
  limitSize,
  phoneMask,
  onlyLetters
} from "../../../rules/validateFormRules";

let alertFormId = "";
class StepTwoIndividual extends Component {
  constructor(props) {
    super(props);
    // Set the initial input values
    this.state = {
      errors: []
    };
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
      first_name,
      last_name,
      address,
      email,
      phone,
      club_name,
      health_core
    } = this.props.formprops;
    const AlertComponent = this.props.AlertComponent;
    return (
      <div className="row">
        <div className="col s12">
          <div className="textlabel">
            <span>create user individual</span>
          </div>
          <AlertComponent
            alertFormId={id => {
              alertFormId = id;
            }}
          />
          <div className="row">
            {/*<!--Field Separator-->*/}
            <div className="input-field col s12 l6">
              <label htmlFor="first_name">Firts Name</label>
              <div>
                <input
                  placeholder="Firts Name"
                  id="first_name"
                  name="first_name"
                  type="text"
                  data-maxsize="50"
                  className="validate"
                  value={first_name}
                  onChange={e => {
                    limitSize(e);
                    onlyLetters(e);
                    this.props.handleChange(e);
                  }}
                />
              </div>
            </div>
            {/*<!--Field Separator-->*/}
            <div className="input-field col s12 l6">
              <label htmlFor="last_name">Last Name</label>
              <div>
                <input
                  placeholder="Last Name"
                  id="last_name"
                  name="last_name"
                  type="text"
                  data-maxsize="50"
                  className="validate"
                  value={last_name}
                  onChange={e => {
                    limitSize(e);
                    onlyLetters(e);
                    this.props.handleChange(e);
                  }}
                />
              </div>
            </div>
            {/*<!--Field Separator-->*/}
            <div className="input-field col s12">
              <label htmlFor="address">Address</label>
              <div>
                <input
                  placeholder="Address"
                  id="address"
                  name="address"
                  type="text"
                  data-maxsize="100"
                  className="validate"
                  value={address}
                  onChange={e => {
                    limitSize(e);
                    this.props.handleChange(e);
                  }}
                />
              </div>
            </div>
            {/*<!--Field Separator-->*/}
            <div className="input-field col s12 l6">
              <label htmlFor="email">Email</label>
              <div>
                <input
                  placeholder="Email"
                  id="email"
                  name="email"
                  type="email"
                  className="validate nospaces"
                  value={email}
                  onChange={this.props.handleChange}
                />
              </div>
            </div>
            {/*<!--Field Separator-->*/}
            <div className="input-field col s12 l6">
              <label htmlFor="phone">Phone</label>
              <div>
                <input
                  placeholder="Phone"
                  id="phone"
                  name="phone"
                  type="text"
                  className="validate nospaces vphone"
                  value={phone}
                  onChange={e => {
                    phoneMask(e);
                    this.props.handleChange(e);
                  }}
                />
              </div>
            </div>

            {/*<!--Field Separator-->*/}
            <div className="input-field col s12 l6">
              <label htmlFor="club_name">Club Name</label>
              <div>
                <input
                  placeholder="Club Name"
                  id="club_name"
                  name="club_name"
                  type="text"
                  data-maxsize="100"
                  className="validate"
                  value={club_name}
                  onChange={e => {
                    limitSize(e);
                    this.props.handleChange(e);
                  }}
                />
              </div>
            </div>
            {/*<!--Field Separator-->*/}
            <div className="input-field col s12 l6">
              <label htmlFor="health_core" className="notrequired">Health Care</label>
              <div>
                <input
                  placeholder="Health Core"
                  id="health_core"
                  name="health_core"
                  type="text"
                  data-maxsize="100"
                  value={health_core}
                  onChange={e => {
                    limitSize(e);
                    this.props.handleChange(e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StepTwoIndividual;
