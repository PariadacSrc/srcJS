import React, { Component } from "react";

//Card
import CombatCard from "./cards/CombatCard";

class CombatsList extends Component {
  static displayName = "CombatsList";
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="combatsblock" className="combatsblock">
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h3>Combat List</h3>
            </div>

            <div className="col s12">
              <div className="row">
                <CombatCard putcheck={true} putactions={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CombatsList;
