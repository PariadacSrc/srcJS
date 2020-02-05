import React, { useContext, useState, useEffect } from "react";

//AppContexts
import { CombatsContext } from "../../actionscontext/CombatsContext";

//Helpers Components
import {
  FieldContextComponent,
  fcStandarChangeHandler
} from "../complements/FormComponentsBuilder";
import { LazyLoaderCompositionComponent } from "../../actionscompositions/LazyLoaderCompositionComponent";

export const KeysFilter = () => {
  /**Main Component Data */

  const { combats, generateCombats, setPaginator } = useContext(CombatsContext);

  /**Main State Listener */
  useEffect(() => {});

  /**Main Handlers */

  const mainHandleSubmit = e => {
    e.preventDefault();
  };

  const mainGenerateHandle = e => {
    e.preventDefault();
    generateCombats();
  };

  /**Main Render */
  return (
    <form onSubmit={mainHandleSubmit}>
      <div className="row minflex">
        <div className="col s12 l4 pull-l4">
          <div className="row buttonscontainer krt-pdf-buttons-container">
            <button className="blue-custom-button" onClick={mainGenerateHandle}>
              <i className="fas fa-random" /> Generate Keys
            </button>
            <LazyLoaderCompositionComponent
              layout="DownLoadCombatsList"
              template="category"
              tooltip="Download PDF"
              id="combat-list-btn"
            ></LazyLoaderCompositionComponent>
          </div>
        </div>
      </div>
    </form>
  );
};

export default KeysFilter;
