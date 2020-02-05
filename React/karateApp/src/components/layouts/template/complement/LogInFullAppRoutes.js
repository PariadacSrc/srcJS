import React, { lazy, Suspense } from "react";
//Helpers
import { FeatureBondComponent } from "../../../../config/featuresConfig";
//Templates
import DashboardAdmin from "../../../routes/login/DashboardAdmin";
import DashboardDojo from "../../../routes/login/DashboardDojo";
import DashboardIndividual from "../../../routes/login/DashboardIndividual";
import NotFoundComponent from "../../../routes/NotFoundComponent";
//Route Builder Components
import { Route, Switch } from "react-router-dom";

export const LogInFullAppRoutes = props => {
  const { features, role } = props;

  /**Lazy Routes */
  const lazyFeaturesRoutes = {
    AthletesList: {
      ["athletes-list"]: () => {
        return import("../../../routes/login/Athletes");
      }
    }
  };

  const lazyRoleAndFeaturesRoutes = {
    admin: {
      AthletesList: {
        ["admin-athlete-list"]: () => {
          return import("../../../routes/login/AdminAthleteList");
        },
        ["admin-individual-key"]: () => {
          return import("../../../routes/login/AdminIndividualKey");
        },
        ["confirmation-pay"]: () => {
          return import("../../../routes/login/AdminPaymentsList");
        }
      }
    },
    team: {
      AthletesList: {
        ["payments"]: () => {
          return import("../../../layouts/summary/SubsCriptionBill");
        }
      }
    },
    athlete: {
      AthletesList: {
        ["payments"]: () => {
          return import("../../../layouts/summary/SubsCriptionBill");
        }
      }
    }
  };

  /**End Lazy Routes */

  const getRoleRoutes = () => {
    let routes = [];
    switch (role) {
      case "admin":
        routes.push(
          <Route exact path="/" component={DashboardAdmin} key="route-home" />
        );
        break;
      case "team":
        routes.push(
          <Route exact path="/" component={DashboardDojo} key="route-home" />
        );
        break;
      default:
        routes.push(
          <Route
            exact
            path="/"
            component={DashboardIndividual}
            key="route-home"
          />
        );
        break;
    }

    return routes;
  };

  const getDefaultRoutes = () => {
    return [<Route component={NotFoundComponent} key="route-notfound" />];
  };

  /**Main Methods */

  const filterFeatures = (auxFeatures, needle) => {
    try {
      if (auxFeatures.length > 1) {
        let slideHalf = Math.round(auxFeatures.length / 2);
        let sideLower = auxFeatures.slice(0, slideHalf);
        let sideUpper = auxFeatures.slice(slideHalf, auxFeatures.length);

        if (needle <= sideLower[sideLower.length - 1][1]) {
          if (sideLower[sideLower.length - 1][1] === needle) {
            return sideLower[sideLower.length - 1][0];
          } else {
            return filterFeatures(sideLower, needle);
          }
        }

        if (needle >= sideUpper[0][1]) {
          if (sideUpper[0][1] === needle) {
            return sideUpper[0][0];
          } else {
            return filterFeatures(sideUpper, needle);
          }
        }
        return false;
      } else {
        if (needle == auxFeatures[0]) {
          return auxFeatures[0][0];
        } else {
          return false;
        }
      }
    } catch (error) {
      return false;
    }
  };

  const getFeaturesRoutes = () => {
    const featuresRoutes = [];
    const appFeaturesArray = Object.entries(FeatureBondComponent);

    features.map(feature => {
      const auxfeature = filterFeatures(appFeaturesArray, feature);

      if (auxfeature) {
        if (lazyFeaturesRoutes[auxfeature]) {
          Object.entries(lazyFeaturesRoutes[auxfeature]).map(
            ([route, call]) => {
              featuresRoutes.push(
                <Route
                  exact
                  path={`/${route}`}
                  component={lazy(call)}
                  key={`route-${route}`}
                />
              );
            }
          );
        }

        if (lazyRoleAndFeaturesRoutes[role][auxfeature]) {
          Object.entries(lazyRoleAndFeaturesRoutes[role][auxfeature]).map(
            ([route, call]) => {
              featuresRoutes.push(
                <Route
                  exact
                  path={`/${route}`}
                  component={lazy(call)}
                  key={`route-${route}`}
                />
              );
            }
          );
        }
      }
    });
    return featuresRoutes;
  };

  /**End Main Methods */

  return (
    <div>
      <Suspense fallback={<div></div>}>
        <Switch>
          {getRoleRoutes()}
          {getFeaturesRoutes()}
          {getDefaultRoutes()}
        </Switch>
      </Suspense>
    </div>
  );
};
