import React from "react";

//Route Builder Components
import { NavLink, Route } from "react-router-dom";
//import BuilderRoutes from "../../../rules/builderRoutesRules";

//Routes
import Home from "../../../routes/logout/Home";

//Bootstrap Components
import { Nav } from "react-bootstrap";

export const LogOutLinks = navthree => {
  return (
    <Nav className="mr-auto">
      <NavLink to="/" key="linkhome" className="nav-link">
        Home
      </NavLink>
    </Nav>
  );
};

export const LogOutRoutes = navthree => {
  return (
    <div>
      <Route exact path="/" component={Home} key="defaultroutehome" />
      <Route exact path="/:formcall" component={Home} key="routehome" />
      <Route
        exact
        path="/:formcall/:token"
        component={Home}
        key="routerecovery"
      />
    </div>
  );
};
