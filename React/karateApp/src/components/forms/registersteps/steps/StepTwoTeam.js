import React, { Component } from "react";

//Helpers Componentes
import "react-datepicker/dist/react-datepicker.css";
import {
  attachEvent,
  limitSize,
  clearBlankSpaces,
  phoneMask
} from "../../../rules/validateFormRules";
let alertFormId = "";
class StepTwoTeam extends Component {
  constructor(props) {
    super(props);
    // Set the initial input values
    this.state = {
      errors: []
    };
    this.fileUpload = React.createRef();
  }

  componentDidMount() {
    attachEvent(".main-form-block input.nospaces", clearBlankSpaces);
    this.props.setLastAlert(alertFormId);
  }

  componentWillUnmount() {
    attachEvent(".main-form-block input.nospaces", clearBlankSpaces, "remove");
  }

  showFileUpload = e => {
    e.preventDefault();
    this.fileUpload.current.click();
  };

  render() {
    const {
      name,
      address,
      email,
      phone,
      style,
      picture
    } = this.props.formprops;
    const AlertComponent = this.props.AlertComponent;
    return (
      <div className="row">
        <div className="col s12">
          <div className="textlabel">
            <span>create team user</span>
          </div>
          <AlertComponent
            alertFormId={id => {
              alertFormId = id;
            }}
          />
          <div className="row">
            {/*<!--Field Separator-->*/}
            <div className="input-field col s12">
              <label htmlFor="name">Club Name</label>
              <div>
                <input
                  placeholder="Name"
                  id="name"
                  name="name"
                  type="text"
                  data-maxsize="100"
                  className="validate"
                  value={name}
                  onChange={e => {
                    limitSize(e);
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
            <div className="input-field col s12">
              <label htmlFor="style" className="notrequired">
                Style
              </label>
              <div>
                <input
                  placeholder="Style"
                  id="style"
                  name="style"
                  type="text"
                  data-maxsize="50"
                  value={style}
                  onChange={e => {
                    limitSize(e);
                    this.props.handleChange(e);
                  }}
                />
              </div>
            </div>
            {/*<!--Field Separator-->*/}
            <div className="col s12">
              <div className="fieldblock">
                <a
                  href="#"
                  data-bondfile="#principalPicture"
                  onClick={this.showFileUpload}
                >
                  <div>
                    <i className="far fa-image" />
                    <span>Upload</span>
                  </div>
                </a>
                <p>
                  {picture
                    ? picture[0].name
                    : "Upload .png or .jpg files here!"}
                </p>
                <input
                  name="picture"
                  type="file"
                  id="principalPicture"
                  className="fileinput"
                  ref={this.fileUpload}
                  onChange={e => {
                    this.props.handleChangeFile(e);
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

export default StepTwoTeam;
