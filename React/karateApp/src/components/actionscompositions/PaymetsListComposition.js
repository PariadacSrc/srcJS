import React, { useContext } from "react";
//AppContexts
import { PaymentsContext } from "../actionscontext/PaymentsContext";
//Helpers
import { LazyLoaderCompositionComponent } from "./LazyLoaderCompositionComponent";

export const PaymentsListComposition = props => {
  const context = useContext(PaymentsContext);
  return (
    <LazyLoaderCompositionComponent
      {...props}
      {...context}
    ></LazyLoaderCompositionComponent>
  );
};
