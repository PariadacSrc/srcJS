import React, { useContext } from "react";
//AppContexts
import { CombatsContext } from "../actionscontext/CombatsContext";
//Helpers
import { LazyLoaderCompositionComponent } from "./LazyLoaderCompositionComponent";

export const CombatsListComposition = props => {
  const context = useContext(CombatsContext);

  return (
    <LazyLoaderCompositionComponent
      {...props}
      {...context}
    ></LazyLoaderCompositionComponent>
  );
};
