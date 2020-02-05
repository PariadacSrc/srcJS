import React, { useState, lazy, Suspense } from "react";
//Helpers
import { SpinerLoader } from "../layouts/helpers/SpinerLoader";

export const LazyLoaderCompositionComponent = props => {
  const [LoadComponent, setLoadComponent] = useState({ component: null });
  const lazyComponents = {
    AthletesFilter: () => {
      return import("../forms/listsfilters/AthletesFilter");
    },
    AthletesList: () => {
      return import("../lists/AthletesList");
    },
    AthletesTableList: () => {
      return import("../lists/AthletesTableList");
    },
    PaymentsFilter: () => {
      return import("../forms/listsfilters/PaymentsFilter");
    },
    PaymentsTableList: () => {
      return import("../lists/PaymentsTableList");
    },
    KeysFilter: () => {
      return import("../forms/listsfilters/KeysFilter");
    },
    CombatsTableList: () => {
      return import("../lists/CombatsTableList");
    },
    StandarPaginator: () => {
      return import("../layouts/paginators/StandarPaginator");
    },
    DownLoadAthletesList: () => {
      return import("../layouts/buttons/DownLoadAthletesList");
    },
    DownLoadAthletesListCSV: () => {
      return import("../layouts/buttons/DownLoadAthletesListCSV");
    },
    DownLoadCombatsList: () => {
      return import("../layouts/buttons/DownLoadCombatsList");
    }
  };

  const renderLazy = props => {
    try {
      if (props.layout) {
        const LazyComponent = lazy(lazyComponents[props.layout]);
        setLoadComponent({ component: LazyComponent });
        return <LazyComponent {...props} />;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const getStateComponent = () => {
    if (LoadComponent.component) {
      const Component = LoadComponent.component;
      return <Component {...props}></Component>;
    } else {
      const auxcomp = renderLazy(props);
      return auxcomp;
    }
  };

  return <Suspense fallback={<SpinerLoader />}>{getStateComponent()}</Suspense>;
};
