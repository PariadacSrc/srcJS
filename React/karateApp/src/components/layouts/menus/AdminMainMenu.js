import React, { Component } from "react";

//AppContexts
import FeaturesContext from "../../features/FeaturesContext";

//Route Builder Components
import { NavLink } from "react-router-dom";

class AdminMainMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="krt-standar-menu">
        <ul>
          <li>
            <NavLink to="/" exact>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-athlete-list" exact>
              Athletes List
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-individual-key" exact>
              Individual Key
            </NavLink>
          </li>
          <li>
            <NavLink to="/confirmation-pay" exact>
              Payment List
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default AdminMainMenu;
