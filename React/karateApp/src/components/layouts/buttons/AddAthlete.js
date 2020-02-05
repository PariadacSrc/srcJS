import React, { Component } from "react";
import AthleteForm from "../../routes/login/AddAthlete";
import { validateFeature } from "../../features/FeaturesFilter";

//Redux Conection
import { connect } from "react-redux";
//Redux Actions
import {
  showAthleteForm,
  hideAthleteForm
} from "../../../store/actions/componentsActions";

class AddAthlete extends Component {
  static displayName = "AddAthlete";
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.hideAthleteForm();
  }

  renderForm = e => {
    e.preventDefault();
    this.props.showAthleteForm();
  };

  render() {
    if (validateFeature(AthleteForm, this.props.features) > 0) {
      return (
        <a
          href="#"
          className="blue-custom-button"
          key={this.props.keyelem}
          onClick={this.renderForm}
        >
          <i className={this.props.classlist} />
          {this.props.allProps.inttext}
        </a>
      );
    } else {
      return null;
    }
  }
}

const maspStateToProps = state => {
  return {};
};

const mapDispatchtoProps = dispatch => {
  return {
    showAthleteForm: data => dispatch(showAthleteForm(data)),
    hideAthleteForm: () => dispatch(hideAthleteForm())
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(AddAthlete);
