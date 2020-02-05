import React, { lazy, Suspense } from "react";
import { SpinerLoader } from "../../../layouts/helpers/SpinerLoader";
import NotFoundComponent from "../../../routes/NotFoundComponent";

//Features
import { linksRelation } from "../../../../config/featuresConfig";
//Route Builder Components
import { NavLink, Route, Switch } from "react-router-dom";

const filterRoutes = features => {
  return features.filter(feature => {
    return linksRelation[feature] ? true : false;
  });
};

export const MapRoutes = ({ features, type = "route", defaultroutes }) => {
  const newmap = filterRoutes(features).map(feature => {
    switch (type) {
      case "link":
        if (linksRelation[feature].type === "link") {
          return (
            <li className="tab" key={`listlink-${feature}`}>
              <NavLink
                to={linksRelation[feature].route}
                key={`linkmap-${feature}`}
              >
                {linksRelation[feature].tag}
              </NavLink>
            </li>
          );
        } else {
          return null;
        }

      case "button":
        switch (linksRelation[feature].type) {
          case "button":
            return (
              <li key={`listbutton-${feature}`}>
                <NavLink
                  to={linksRelation[feature].route}
                  key={`buttonmap-${feature}`}
                >
                  <i className={linksRelation[feature].tag} />
                </NavLink>
              </li>
            );

          case "component":
            const RouteComponent = lazy(linksRelation[feature].component);
            return (
              <li key={`listbuttons-${feature}`}>
                <RouteComponent
                  keyelem={`int-listbutton-${feature}`}
                  classlist={linksRelation[feature].tag}
                  features={features}
                  allProps={linksRelation[feature]}
                />
              </li>
            );

          default:
            return null;
        }

      default:
        const RouteComponent = lazy(linksRelation[feature].component);
        return (
          <Route
            exact
            path={linksRelation[feature].route}
            component={RouteComponent}
            key={`routemap-${feature}`}
          />
        );
    }
  });
  if (type !== "route") {
    return (
      <Suspense
        fallback={
          <li>
            <SpinerLoader />
          </li>
        }
      >
        {newmap}
      </Suspense>
    );
  } else {
    return (
      <div>
        <Suspense
          fallback={
            <div>
              <SpinerLoader />
            </div>
          }
        >
          <Switch>
            {defaultroutes()}
            {newmap}
            {/*404 Route */}
            <Route component={NotFoundComponent} key="notfoundroute" />
          </Switch>
        </Suspense>
      </div>
    );
  }
};
