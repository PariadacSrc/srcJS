import React, { Component } from "react";

//Route Builder Components
import { NavLink } from "react-router-dom";

class NotFoundComponent extends Component {
  render() {
    return (
      <div className="notfoundpage">
        <div />
        <div className="row">
          <div className="col s12 buttonscontainer ">
            <NavLink to="/" className="blue-custom-button">
              Return
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFoundComponent;
