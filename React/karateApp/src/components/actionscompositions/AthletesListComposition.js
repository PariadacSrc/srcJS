import React, { useContext } from "react";
//AppContexts
import { AthletesContext } from "../actionscontext/AthletesContext";
//Helpers
import { LazyLoaderCompositionComponent } from "./LazyLoaderCompositionComponent";

export const AthletesListComposition = props => {
  const context = useContext(AthletesContext);

  return (
    <LazyLoaderCompositionComponent
      {...props}
      {...context}
    ></LazyLoaderCompositionComponent>
  );
};
