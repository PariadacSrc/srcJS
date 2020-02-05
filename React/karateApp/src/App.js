import React, { Component } from "react";

//Layout Templates
import LogInContext from "./components/layouts/template/LogInContext";
import LogIn from "./components/layouts/template/logIn";
import LogOut from "./components/layouts/template/logOut";

//Features
import { setFeatures } from "./store/actions/featuresActions";

//Redux Conection
import { connect } from "react-redux";

class App extends Component {
  /*App global state (main app properties)*/
  state = {};

  componentDidMount() {
    this.props.setFeatures(this.props.auth.token);
  }

  validateFeatures() {
    if (this.props.features.content) {
      if (this.props.features.role === "admin") {
        return <LogInContext></LogInContext>;
      } else {
        return <LogIn />;
      }
    } else {
      return null;
    }
  }

  /*App Main Render */
  render() {
    const template = this.props.auth.token ? (
      <div className="mainbody loginbody">{this.validateFeatures()}</div>
    ) : (
      <div className="mainbody logoutbody">
        <LogOut />
      </div>
    );
    return <div className="App">{template}</div>;
  }
}

const maspStateToProps = state => {
  return {
    auth: state.auth,
    features: state.features
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    setFeatures: data => dispatch(setFeatures(data))
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(App);
