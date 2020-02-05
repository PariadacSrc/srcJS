import React, { useContext, useEffect } from "react";
//AppContexts
import { AthletesContext } from "../actionscontext/AthletesContext";
import { PaginatorContext } from "../actionscontext/PaginatorContext";
//Helpers
import { LazyLoaderCompositionComponent } from "./LazyLoaderCompositionComponent";
import { SpinerLoader } from "../layouts/helpers/SpinerLoader";

export const AthletesPaginatorComposition = props => {
  const { athletes, paginatorSettings, setAthletes, setPaginator } = useContext(
    AthletesContext
  );
  const { settings, setSettings } = useContext(PaginatorContext);
  let context = useContext(AthletesContext);

  useEffect(() => {
    if (athletes && !paginatorSettings) {
      const newsttings = {
        ...settings,
        list: athletes,
        paginated: false,
        page: 0
      };
      setSettings(newsttings);
      setPaginator(true);
    }
  });

  //StandarPaginator
  const setActualPage = (newlist, setting) => {
    setAthletes(newlist);
    setSettings(setting);
  };
  //SettingPropsData

  context = {
    ...context,
    setActualPage: setActualPage,
    pageSetttings: settings
  };

  if (paginatorSettings) {
    return (
      <LazyLoaderCompositionComponent
        {...props}
        {...context}
      ></LazyLoaderCompositionComponent>
    );
  } else {
    return <SpinerLoader></SpinerLoader>;
  }
};
