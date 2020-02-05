import React from "react";

export const SpinerLoader = props => {
  const { mesage = "" } = props;
  return (
    <div className="loader-block">
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
      <div>
        <span>{mesage}</span>
      </div>
    </div>
  );
};
