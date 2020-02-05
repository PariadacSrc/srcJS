import React, { Component } from "react";

//Helpers Componentes
import { API_IMG_URL } from "../../../config/apiConfig";
import { Select } from "react-materialize";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  myMove,
  pictureLoader,
  fetchDateFormat,
  numberFormat,
  limitSize,
  onlyLetters,
  newFileName,
  validateFormRules
} from "../../rules/validateFormRules";
import CalendarButton from "../complements/CalendarButton";
import AlertsForms from "../../summarimessages/AlertsForms";

//Redux Conection
import { connect } from "react-redux";
//Redux Actions
import { validateUserdata } from "../../../store/actions/usersActions";
import { getDojo, resetStore } from "../../../store/actions/dojoActions";
import {
  setLastcallFormAlert,
  fetchFormAlert
} from "../../../store/actions/formAlertsActions";

let alertFormId = "";
class NewMembersForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitState();
    this.fileUpload = React.createRef();
    this.relateDate = React.createRef();
    this.triggerForm = React.createRef();
  }

  getInitState() {
    return {
      mapkey: `${Math.random()}-athlete-${Math.random()}`,
      first_name: "",
      last_name: "",
      address: "",
      email: "",
      phone: "",
      birthdate: this.getvalidDate(),
      level: "",
      gender: "",
      style: "",
      picture: "",
      auxpicture: {
        value: null,
        sourcehandler: null
      },
      weight: "",
      health_care: "",
      id_dojo: this.props.dojo ? this.props.dojo.data.id_dojo : null,
      dojo_name: this.props.dojo ? this.props.dojo.data.name : "",
      kata: "",
      kumite: "",
      seminar: "",
      createdby: this.props.usercreate
    };
  }

  getvalidDate = () => {
    let validate = new Date();
    validate.setFullYear(validate.getFullYear() - 4);
    return validate;
  };

  componentDidMount() {
    this.findWindowPosition();
    this.props.getDojo({ token: this.props.token });
    this.setState(
      this.props.editAthlete ? this.props.editAthlete : this.getInitState()
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.dojo && !prevProps.dojo) {
      this.setState(this.getInitState());
      this.setState(this.props.editAthlete);
    }
    if (this.props.editAthlete !== prevProps.editAthlete) {
      this.setState(this.props.editAthlete);
    }
  }

  actionsButtons = () => {
    const sendButton = (
      <button className="blue-custom-button">
        {!this.props.editAthlete ? "Add" : "Update"}
      </button>
    );
    const cancelButton = this.props.cancelHandler ? (
      <button
        className="blue-custom-button blackbutton"
        onClick={e => {
          e.preventDefault();
          this.props.cancelHandler();
        }}
      >
        Cancel
      </button>
    ) : null;

    return (
      <div className="col s12 buttonscontainer buttons-variation-one">
        {cancelButton}
        {sendButton}
      </div>
    );
  };

  showFileUpload = e => {
    e.preventDefault();
    this.fileUpload.current.click();
  };

  renderPicture() {
    let defaultPicture = this.state.picture
      ? `${API_IMG_URL}/${this.state.picture}`
      : null;
    defaultPicture = this.state.auxpicture.sourcehandler
      ? this.state.auxpicture.sourcehandler
      : defaultPicture;

    if (defaultPicture) {
      return (
        <div className="main-picture-container">
          <img src={defaultPicture} />
        </div>
      );
    } else {
      return (
        <div>
          <i className="far fa-image" />
          <span>Upload</span>
        </div>
      );
    }
  }

  findWindowPosition = () => {
    let animations = {
      interval: 1200,
      newposition: this.triggerForm.current.offsetTop - 80
    };
    myMove("html,body", animations);
  };

  serverValidations = (callbackdata, callback) => {
    let validation, validationvalue;
    validation = "usercategory";
    validationvalue = {
      belt: this.state.level,
      birthday: fetchDateFormat(this.state.birthdate),
      gender: this.state.gender,
      karate: this.state.seminar === "y" ? this.state.seminar : null
    };

    this.props.validateUserdata(
      {
        type: validation,
        value: validationvalue
      },
      callbackdata,
      callback
    );
  };

  //Forms Handlers

  handleChangeDate = (field, date) => {
    let auxdata = this.state;
    auxdata[field] = date;
    this.setState(auxdata);
  };

  handleChangecheck = event => {
    const { value, name } = event.target;
    let auxdata = this.state;
    auxdata[name] = value === "y" ? "" : "y";
    this.setState(auxdata);
  };

  handleChangeFile = event => {
    const { files, name } = event.target;
    let auxdata = this.state;
    const size = files[0].size / 1024 / 1024;
    if (size < 2) {
      auxdata[name] =
        auxdata[name] === "" || auxdata[name] === null
          ? newFileName(files[0], this.state.mapkey)
          : auxdata[name];
      auxdata.auxpicture.value = files[0];
      this.setState(auxdata);
      pictureLoader(this.state.auxpicture.value, this, "auxpicture");
    } else {
      this.props.fetchFormAlert({
        id: alertFormId,
        status: "error",
        form_alert_body: "The file size must be less than 2MB"
      });
    }
  };

  handleChange = event => {
    const { value, name } = event.target;
    let auxdata = this.state;
    auxdata[name] = value;
    this.setState(auxdata);
  };

  handleSubmit = event => {
    event.preventDefault();
    if (validateFormRules([], event).length === 0) {
      this.serverValidations({}, data => {
        !this.props.editAthlete
          ? this.props.handlerAdd(this.state)
          : this.props.handlerUpdate(this.state);
      });
    } else {
      this.props.fetchFormAlert({
        id: alertFormId,
        status: "error",
        form_alert_body: "Please enter all required values"
      });
    }
  };
  render() {
    const event_kata = this.state.kata === "y" ? "y" : "";
    const event_kumite = this.state.kumite === "y" ? "y" : "";
    const event_seminar = this.state.seminar === "y" ? "y" : "";
    return (
      <div className="newmembersform" ref={this.triggerForm}>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h3>Athlete Information</h3>
            </div>

            <div className="col s12">
              <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                <div className="row">
                  <div className="col s12 m12 l3">
                    <div className="fieldblock">
                      <a
                        href="#"
                        data-bondfile="#principalPicture"
                        onClick={this.showFileUpload}
                      >
                        {this.renderPicture()}
                      </a>
                      <p>
                        {this.state.auxpicture.value
                          ? this.state.auxpicture.value.name
                          : "Upload .png or .jpg files here!"}
                      </p>
                    </div>

                    <input
                      name="picture"
                      type="file"
                      id="principalPicture"
                      className="fileinput"
                      ref={this.fileUpload}
                      onChange={e => {
                        this.handleChangeFile(e);
                      }}
                    />
                  </div>
                  <div className="col s12 m12 l9">
                    <div className="row">
                      <div className="col s12">
                        <AlertsForms
                          alertFormId={id => {
                            alertFormId = id;
                          }}
                        />
                      </div>
                    </div>
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
                            className="validate"
                            data-maxsize="50"
                            value={this.state.first_name}
                            onChange={e => {
                              limitSize(e);
                              onlyLetters(e);
                              this.handleChange(e);
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
                            className="validate"
                            data-maxsize="50"
                            value={this.state.last_name}
                            onChange={e => {
                              limitSize(e);
                              onlyLetters(e);
                              this.handleChange(e);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {/*<!--Field Separator-->*/}
                      <div className="input-field col s12 m4 l4">
                        <label htmlFor="birthdate">Birthdate</label>
                        <div>
                          <input
                            type="text"
                            name="auxbirthdate"
                            id="auxbirthdate"
                            disabled="disabled"
                            value={fetchDateFormat(this.state.birthdate)}
                          />
                          <DatePicker
                            customInput={<CalendarButton />}
                            placeholderText="Birthdate"
                            id="birthdate"
                            name="birthdate"
                            type="text"
                            className="validate nospaces"
                            selected={this.state.birthdate}
                            dateFormat="yyyy-MM-dd"
                            showMonthDropdown
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={50}
                            maxDate={this.getvalidDate()}
                            onChange={e => {
                              this.handleChangeDate("birthdate", e);
                            }}
                          />
                        </div>
                      </div>
                      {/*<!--Field Separator-->*/}
                      <div className="input-field col s12 m4 l4">
                        <label htmlFor="gender">Gender</label>
                        <div className="select-materialize-container">
                          <Select
                            placeholder="Gender"
                            id="gender"
                            name="gender"
                            type="text"
                            className="validate"
                            value={this.state.gender}
                            onChange={this.handleChange}
                          >
                            <option value="" disabled>
                              Choose your option
                            </option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                          </Select>
                          <i className="fas fa-angle-down" />
                        </div>
                      </div>
                      {/*<!--Field Separator-->*/}
                      <div className="input-field col s12 m4 l4">
                        <label htmlFor="weight">Weight (Kg)</label>
                        <div>
                          <input
                            placeholder="Weight"
                            id="weight"
                            name="weight"
                            type="text"
                            className="validate"
                            data-fixformat="1"
                            data-maxsize="5"
                            value={this.state.weight}
                            onChange={e => {
                              limitSize(e);
                              numberFormat(e);
                              this.handleChange(e);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {/*<!--Field Separator-->*/}
                      <div className="input-field col s12 m4 l4">
                        <label htmlFor="level">Belt</label>
                        <div className="select-materialize-container">
                          <Select
                            placeholder="Belt"
                            id="level"
                            name="level"
                            type="text"
                            className="validate"
                            value={this.state.level}
                            onChange={this.handleChange}
                          >
                            <option value="" disabled>
                              Choose your option
                            </option>
                            <option value="White">White</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Orange">Orange</option>
                            <option value="Green">Green</option>
                            <option value="Purple">Purple</option>
                            <option value="Blue">Blue</option>
                            <option value="Brown">Brown</option>
                            <option value="Black">Black</option>
                          </Select>
                          <i className="fas fa-angle-down" />
                        </div>
                      </div>
                      {/*<!--Field Separator-->*/}
                      <div className="input-field col s12 m4 l4">
                        <label htmlFor="dojo_name">Club Name</label>
                        <div>
                          <input
                            placeholder="Club Name"
                            id="dojo_name"
                            name="dojo_name"
                            type="text"
                            className="validate"
                            data-maxsize="100"
                            disabled={this.props.dojo ? "disabled" : null}
                            value={this.state.dojo_name}
                            onChange={e => {
                              limitSize(e);
                              this.handleChange(e);
                            }}
                          />
                        </div>
                      </div>
                      {/*<!--Field Separator-->*/}
                      <div className="input-field col s12 m4 l4">
                        <label htmlFor="health_care" className="notrequired">
                          Health Care
                        </label>
                        <div>
                          <input
                            placeholder="Health Core"
                            id="health_care"
                            name="health_care"
                            type="text"
                            data-maxsize="100"
                            value={this.state.health_care}
                            onChange={e => {
                              limitSize(e);
                              this.handleChange(e);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row" />
                    <div className="row">
                      <div className="input-field col s12 check-box-inputcontainer">
                        <label htmlFor="event_type">Event Type</label>
                        <div className="minflex radiocontent">
                          <p>
                            <label>
                              <input
                                name="kumite"
                                type="checkbox"
                                disabled={
                                  this.state.seminar === "y" ? "disabled" : ""
                                }
                                value={
                                  this.state.seminar !== "y" ? event_kumite : ""
                                }
                                checked={this.state.kumite === "y"}
                                onChange={this.handleChangecheck}
                              />
                              <span>kumite</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input
                                name="kata"
                                type="checkbox"
                                disabled={
                                  this.state.seminar === "y" ? "disabled" : ""
                                }
                                value={
                                  this.state.seminar !== "y" ? event_kata : ""
                                }
                                checked={this.state.kata === "y"}
                                onChange={this.handleChangecheck}
                              />
                              <span>kata</span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input
                                name="seminar"
                                type="checkbox"
                                disabled={
                                  this.state.kata === "y" ||
                                  this.state.kumite === "y"
                                    ? "disabled"
                                    : ""
                                }
                                value={
                                  this.state.kata !== "y" &&
                                  this.state.kumite !== "y"
                                    ? event_seminar
                                    : ""
                                }
                                checked={this.state.seminar === "y"}
                                onChange={this.handleChangecheck}
                              />
                              <span>parakarate</span>
                            </label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">{this.actionsButtons()}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const maspStateToProps = state => {
  return {
    usercreate: state.features.userid,
    token: state.auth.token,
    dojo: state.dojo.content
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    getDojo: data => dispatch(getDojo(data)),
    resetStore: () => dispatch(resetStore()),
    setLastcallFormAlert: id => dispatch(setLastcallFormAlert(id)),
    fetchFormAlert: data => dispatch(fetchFormAlert(data)),
    validateUserdata: (data, calldata, call) =>
      dispatch(validateUserdata(data, calldata, call))
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(NewMembersForm);
