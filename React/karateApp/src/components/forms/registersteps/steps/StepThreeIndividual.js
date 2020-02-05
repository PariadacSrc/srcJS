import React, { Component } from "react";

//Helpers Componentes
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select } from "react-materialize";
import {
  attachEvent,
  numberFormat,
  limitSize,
  clearBlankSpaces,
  fetchDateFormat
} from "../../../rules/validateFormRules";
import CalendarButton from "../../complements/CalendarButton";
let alertFormId = "";
class StepThreeIndividual extends Component {
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

  getvalidDate = () => {
    let validate = new Date();
    validate.setFullYear(validate.getFullYear() - 4);
    return validate;
  };

  showFileUpload = e => {
    e.preventDefault();
    this.fileUpload.current.click();
  };
  render() {
    const {
      weight,
      level,
      birthdate,
      gender,
      event_kumite,
      event_seminar,
      event_kata,
      picture
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
              <label htmlFor="weight">Weight (Kg)</label>
              <div>
                <input
                  placeholder="Weight"
                  id="weight"
                  name="weight"
                  type="text"
                  className="validate"
                  value={weight}
                  data-fixformat="1"
                  data-maxsize="5"
                  onChange={e => {
                    limitSize(e);
                    numberFormat(e);
                    this.props.handleChange(e);
                  }}
                />
              </div>
            </div>
            {/*<!--Field Separator-->*/}
            <div className="input-field col s12 l6">
              <label htmlFor="level">Belt</label>
              <div className="select-materialize-container">
                <Select
                  placeholder="Belt"
                  id="level"
                  name="level"
                  type="text"
                  className="validate"
                  value={level}
                  onChange={this.props.handleChange}
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
            <div className="input-field col s12 l6">
              <label htmlFor="birthdate">Birthdate</label>
              <div>
                <input
                  type="text"
                  name="auxbirthdate"
                  id="auxbirthdate"
                  disabled="disabled"
                  value={fetchDateFormat(birthdate)}
                />
                <DatePicker
                  customInput={<CalendarButton />}
                  placeholderText="Birthdate"
                  id="birthdate"
                  name="birthdate"
                  type="text"
                  className="validate nospaces"
                  selected={birthdate}
                  dateFormat="yyyy-MM-dd"
                  showMonthDropdown
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={50}
                  maxDate={this.getvalidDate()}
                  onChange={e => {
                    this.props.handleChangeDate("birthdate", e);
                  }}
                />
              </div>
            </div>
            {/*<!--Field Separator-->*/}
            <div className="input-field col s12 l6">
              <label htmlFor="gender">Gender</label>
              <div className="select-materialize-container">
                <Select
                  placeholder="Gender"
                  id="gender"
                  name="gender"
                  type="text"
                  className="validate"
                  value={gender}
                  onChange={this.props.handleChange}
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
            <div className="input-field col s12">
              <label htmlFor="event_type">Event Type</label>
              <div className="minflex radiocontent">
                <p>
                  <label>
                    <input
                      name="event_kumite"
                      type="checkbox"
                      className="validate"
                      disabled={event_seminar === "y" ? "disabled" : ""}
                      value={event_seminar !== "y" ? event_kumite : ""}
                      value={event_kumite}
                      checked={event_kumite === "y"}
                      onChange={this.props.handleChangecheck}
                    />
                    <span>kumite</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      name="event_kata"
                      type="checkbox"
                      className="validate"
                      disabled={event_seminar === "y" ? "disabled" : ""}
                      value={event_seminar !== "y" ? event_kata : ""}
                      checked={event_kata === "y"}
                      onChange={this.props.handleChangecheck}
                    />
                    <span>kata</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      name="event_seminar"
                      type="checkbox"
                      className="validate"
                      disabled={
                        event_kata === "y" || event_kumite === "y"
                          ? "disabled"
                          : ""
                      }
                      value={
                        event_kata !== "y" && event_kumite !== "y"
                          ? event_seminar
                          : ""
                      }
                      checked={event_seminar === "y"}
                      onChange={this.props.handleChangecheck}
                    />
                    <span>parakarate</span>
                  </label>
                </p>
              </div>
            </div>
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

export default StepThreeIndividual;
