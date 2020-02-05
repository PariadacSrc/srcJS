import React, { Component } from "react";

//AppContexts
import FeaturesContext from "../../features/FeaturesContext";
import AthletesContextProvider from "../../actionscontext/AthletesContext";
import PaginatorContextProvider from "../../actionscontext/PaginatorContext";
//AppCompositions
import { AthletesListComposition } from "../../actionscompositions/AthletesListComposition";
import { AthletesPaginatorComposition } from "../../actionscompositions/AthletesPaginatorComposition";
import { FilterFormComposition } from "../../actionscompositions/FilterFormComposition";

class AdminAthleteList extends Component {
  render() {
    return (
      <FeaturesContext feature="AthletesList">
        <AthletesContextProvider>
          <div className="row">
            <div className="col s12">
              <FilterFormComposition
                layout="AthletesFilter"
                title="Athletes List"
              ></FilterFormComposition>
            </div>
            <div className="col s12">
              <div className="container">
                <div className="row">
                  <PaginatorContextProvider>
                    <div className="col s12">
                      <AthletesPaginatorComposition layout="StandarPaginator" />
                    </div>
                    <div className="col s12">
                      <AthletesListComposition layout="AthletesTableList" />
                    </div>
                    <div className="col s12">
                      <AthletesPaginatorComposition layout="StandarPaginator" />
                    </div>
                  </PaginatorContextProvider>
                </div>
              </div>
            </div>
          </div>
        </AthletesContextProvider>
      </FeaturesContext>
    );
  }
}

export default AdminAthleteList;
