import React, { Component } from "react";

//AppContexts
import FeaturesContext from "../../features/FeaturesContext";
import AthletesContextProvider from "../../actionscontext/AthletesContext";
//AppHelpers
import TournamentsTotals from "../../layouts/blocks/TournamentsTotals";

class DashboardAdmin extends Component {
  render() {
    return (
      <FeaturesContext feature="AthletesList">
        <AthletesContextProvider>
          <div className="row">
            <div className="col s12">
              <div className="container">
                <div className="col s12">
                  <TournamentsTotals></TournamentsTotals>
                </div>
              </div>
            </div>
          </div>
        </AthletesContextProvider>
      </FeaturesContext>
    );
  }
}

export default DashboardAdmin;
