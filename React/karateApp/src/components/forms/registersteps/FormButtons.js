import React, { Component } from "react";

//Route Builder Components
import { NavLink } from "react-router-dom";

class FormButtons extends Component {
  render() {
    let cancelbtn =
      this.props.currentStep === 1 ? (
        <div className="col s6">
          <NavLink to="/" className="blue-custom-button blackbutton">
            Cancel
          </NavLink>
        </div>
      ) : null;
    let prevbtn =
      this.props.currentStep > 1 ? (
        <div className="col s6">
          <button
            className="blue-custom-button blackbutton"
            type="button"
            onClick={() => {
              this.props.changeStep(this.props.currentStep - 1);
            }}
          >
            Prev
          </button>
        </div>
      ) : null;

    let nextbtn =
      this.props.currentStep < this.props.maxStep ? (
        <div className="col s6">
          <button
            className="blue-custom-button"
            type="button"
            onClick={() => {
              this.props.changeStep(this.props.currentStep + 1);
            }}
          >
            next
          </button>
        </div>
      ) : null;

    let lastbtn =
      this.props.currentStep === this.props.maxStep ? (
        <div className="col s6">
          <button className="blue-custom-button greenbutton">Send</button>
        </div>
      ) : null;

    return (
      <div className="row buttonscontainer">
        {cancelbtn}
        {prevbtn}
        {nextbtn}
        {lastbtn}
      </div>
    );
  }
}

export default FormButtons;
