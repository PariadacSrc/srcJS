import React, { useContext, useEffect } from "react";
//AppContexts
import { PaymentsContext } from "../actionscontext/PaymentsContext";
import { PaginatorContext } from "../actionscontext/PaginatorContext";
//Helpers
import { LazyLoaderCompositionComponent } from "./LazyLoaderCompositionComponent";
import { SpinerLoader } from "../layouts/helpers/SpinerLoader";

export const PaymentsPaginatorComposition = props => {
  const {
    filterpayments,
    paginatorSettings,
    setFilterPayments,
    setPaginator
  } = useContext(PaymentsContext);
  const { settings, setSettings } = useContext(PaginatorContext);
  let context = useContext(PaymentsContext);

  useEffect(() => {
    if (filterpayments && !paginatorSettings) {
      const newsttings = {
        ...settings,
        list: filterpayments,
        paginated: false,
        page: 0
      };
      setSettings(newsttings);
      setPaginator(true);
    }
  });

  //StandarPaginator
  const setActualPage = (newlist, setting) => {
    setFilterPayments(newlist);
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
