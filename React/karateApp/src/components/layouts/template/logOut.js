import React, { Component } from "react";
import { LogOutHeader } from "../header/logOutHeaderTemplate";

//Route Builder Components
import { BrowserRouter, Switch } from "react-router-dom";
//Main App Routes
import { LogOutRoutes } from "./complement/logOutLink";

//Redux Conection
import { connect } from "react-redux";

class LogOut extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <LogOutHeader />
        <Switch>
          <LogOutRoutes />
        </Switch>
      </BrowserRouter>
    );
  }
}

const maspStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(maspStateToProps)(LogOut);
