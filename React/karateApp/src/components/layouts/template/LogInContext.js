import React, { Component } from "react";

//Main Users Context
import { StandarUserContext } from "../../rolescontext/StandarUserContext";
//App Routes Constructor
import { LogInFullAppRoutes } from "./complement/LogInFullAppRoutes";
//Route Builder Components
import { BrowserRouter } from "react-router-dom";
//Redux Conection
import { connect } from "react-redux";
//ResetActions
import { resetStore as resetFeatures } from "../../../store/actions/featuresActions";

class LogInContext extends Component {
  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }
  componentWillUnmount() {
    this.props.resetFeatures();
    window.removeEventListener("popstate", function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <StandarUserContext role={this.props.role} authUser={this.props.user}>
          <LogInFullAppRoutes
            features={this.props.features}
            role={this.props.role}
          ></LogInFullAppRoutes>
        </StandarUserContext>
      </BrowserRouter>
    );
  }
}

const maspStateToProps = state => {
  return {
    user: state.features.userid,
    role: state.features.role,
    features: state.features.content
  };
};
const mapDispatchtoProps = dispatch => {
  return {
    resetFeatures: () => dispatch(resetFeatures())
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(LogInContext);
