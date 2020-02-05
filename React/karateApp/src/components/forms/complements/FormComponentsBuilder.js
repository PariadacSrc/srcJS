import React from "react";

//Helpers Components
import { Select } from "react-materialize";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarButton from "../../forms/complements/CalendarButton";

//Helper Methods

//-Data Parse

export const fetchDateFormat = date => {
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  return `${date.getFullYear()}-${month}-${day}`;
};

export const StandarChangeHandler = (event, component) => {
  const { value, name } = event.target;
  let auxdata = { ...component.state };
  auxdata[name] = value;
  component.setState({ ...auxdata });
};

export const fcStandarChangeHandler = (event, state, setter) => {
  const { value, name } = event.target;
  let auxdata = { ...state };
  auxdata[name] = value;
  setter({ ...auxdata });
};

export const fcDateChangeHandler = (date, name, state, setter) => {
  let auxdata = { ...state };
  auxdata[name] = date;
  setter({ ...auxdata });
};

export const FieldTypeComponent = props => {
  try {
    switch (props.fieldtype) {
      case "select":
        const options = props.fieldoptions.map(opt => {
          return (
            <option
              key={`option-${opt.value}-field-${props.fieldid}`}
              value={opt.value}
            >
              {opt.text ? opt.text : opt.value}
            </option>
          );
        });
        return (
          <div className="select-materialize-container">
            <Select
              placeholder={props.fieldtag ? props.fieldtag : null}
              id={props.fieldid}
              name={props.fieldid}
              type={props.fieldtype}
              key={`field-${props.fieldid}`}
              className=""
              value={props.fieldvalue}
              onChange={e => {
                try {
                  props.handleChange(e);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <option value="" disabled>
                Choose your option
              </option>
              {options}
            </Select>
            <i className="fas fa-angle-down" />
          </div>
        );

      case "date":
        return (
          <div>
            <input
              type="text"
              name={`aux-${props.fieldid}`}
              id={`aux-${props.fieldid}`}
              disabled="disabled"
              value={
                props.dateformat
                  ? props.parsedate
                  : fetchDateFormat(props.fieldvalue)
              }
            />
            <DatePicker
              customInput={<CalendarButton />}
              placeholder={props.fieldtag ? props.fieldtag : null}
              id={props.fieldid}
              name={props.fieldid}
              type="text"
              key={`field-${props.fieldid}`}
              className=""
              selected={props.fieldvalue}
              dateFormat={props.dateformat ? props.dateformat : "yyyy-MM-dd"}
              showMonthDropdown
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={50}
              maxDate={props.maxdate ? props.maxdate : null}
              minDate={props.mindate ? props.mindate : null}
              onChange={e => {
                try {
                  props.handleChange(e);
                } catch (error) {
                  console.log(error);
                }
              }}
            />
          </div>
        );

      default:
        return (
          <div>
            <input
              placeholder={props.fieldtag ? props.fieldtag : null}
              id={props.fieldid}
              name={props.fieldid}
              type={props.fieldtype}
              key={`field-${props.fieldid}`}
              className=""
              value={props.fieldvalue}
              onChange={e => {
                try {
                  props.handleChange(e);
                } catch (error) {
                  console.log(error);
                }
              }}
            />
          </div>
        );
    }
  } catch (error) {
    return (
      <div>
        <p>Field Can´t Load...</p>
      </div>
    );
  }
};

export const FieldContextComponent = props => {
  return (
    <div className={`krt-filter-field col ${props.fieldsize}`}>
      <div className="row">
        <div className={!props.notlabel ? "input-field col s12" : "col s12"}>
          {props.fieldtag ? (
            <label htmlFor="user_name">
              {!props.notlabel ? props.fieldtag : null}
            </label>
          ) : null}
          {props.fieldtype ? <FieldTypeComponent {...props} /> : props.children}
        </div>
      </div>
    </div>
  );
};
