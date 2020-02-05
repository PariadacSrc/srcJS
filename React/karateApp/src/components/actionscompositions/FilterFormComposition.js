import React from "react";
//Helpers
import { LazyLoaderCompositionComponent } from "./LazyLoaderCompositionComponent";

export const FilterFormComposition = props => {
  return (
    <div
      className={
        props.formSize
          ? `krt-filter-container ${props.formSize}`
          : `krt-filter-container`
      }
    >
      <div className="krt-filter-header">
        <h3>{props.title}</h3>
      </div>
      <div className="krt-filter-body">
        <LazyLoaderCompositionComponent
          {...props}
        ></LazyLoaderCompositionComponent>
      </div>
    </div>
  );
};
