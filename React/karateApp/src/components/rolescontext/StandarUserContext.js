import React from "react";

//Helpers Components
import AdminMainMenu from "../layouts/menus/AdminMainMenu";
import { LogInHeader } from "../layouts/header/logInHeaderTemplate";

export const StandarUserContext = props => {
  return (
    <div>
      <LogInHeader
        authUser={props.authUser}
        featuresbuttons={() => {
          return null;
        }}
      ></LogInHeader>
      <div className="main-login-body">
        {props.role === "admin" ? (
          <div className="krt-admin-dashboard sidebar-enable sidebar-show krt-side-left">
            <div className="krt-sidebar">
              <AdminMainMenu />
            </div>
            <div className="krt-main-body">{props.children}</div>
          </div>
        ) : (
          props.children
        )}
      </div>
    </div>
  );
};
