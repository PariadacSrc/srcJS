import React, { Component } from "react";

//AppContexts
import FeaturesContext from "../../features/FeaturesContext";
import CombatsContextProvider from "../../actionscontext/CombatsContext";
import PaginatorContextProvider from "../../actionscontext/PaginatorContext";
//AppCompositions
import { CombatsListComposition } from "../../actionscompositions/CombatsListComposition";
import { CombatsPaginatorComposition } from "../../actionscompositions/CombatsPaginatorComposition";
import { FilterFormComposition } from "../../actionscompositions/FilterFormComposition";

class AdminIndividualKey extends Component {
  render() {
    return (
      <FeaturesContext feature="CombatsList">
        <CombatsContextProvider>
          <div className="row">
            <div className="col s12">
              <FilterFormComposition
                formSize="smallform"
                layout="KeysFilter"
                title="Generate Key"
              ></FilterFormComposition>
            </div>
            <div className="col s12">
              <div className="container">
                <div className="row">
                  <PaginatorContextProvider>
                    <div className="col s12">
                      <CombatsPaginatorComposition layout="StandarPaginator" />
                    </div>
                    <div className="col s12">
                      <CombatsListComposition layout="CombatsTableList" />
                    </div>
                    <div className="col s12">
                      <CombatsPaginatorComposition layout="StandarPaginator" />
                    </div>
                  </PaginatorContextProvider>
                </div>
              </div>
            </div>
          </div>
        </CombatsContextProvider>
      </FeaturesContext>
    );
  }
}

export default AdminIndividualKey;
