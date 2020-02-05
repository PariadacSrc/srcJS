import React, { useContext, useEffect } from "react";
//AppContexts
import { CombatsContext } from "../actionscontext/CombatsContext";
import { PaginatorContext } from "../actionscontext/PaginatorContext";
//Helpers
import { LazyLoaderCompositionComponent } from "./LazyLoaderCompositionComponent";
import { SpinerLoader } from "../layouts/helpers/SpinerLoader";

export const CombatsPaginatorComposition = props => {
  const { combats, paginatorSettings, setCombats, setPaginator } = useContext(
    CombatsContext
  );
  const { settings, setSettings } = useContext(PaginatorContext);
  let context = useContext(CombatsContext);

  useEffect(() => {
    if (combats && !paginatorSettings) {
      const newsttings = {
        ...settings,
        list: combats,
        paginated: false,
        page: 0
      };
      setSettings(newsttings);
      setPaginator(true);
    }
  });

  //StandarPaginator
  const setActualPage = (newlist, setting) => {
    setCombats(newlist);
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
