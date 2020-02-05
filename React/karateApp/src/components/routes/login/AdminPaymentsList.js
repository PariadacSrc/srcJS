import React, { Component } from "react";

//AppContexts
import FeaturesContext from "../../features/FeaturesContext";
import PaymentsContextProvider from "../../actionscontext/PaymentsContext";
import PaginatorContextProvider from "../../actionscontext/PaginatorContext";
//AppCompositions
import { FilterFormComposition } from "../../actionscompositions/FilterFormComposition";
import { PaymentsListComposition } from "../../actionscompositions/PaymetsListComposition";
import { PaymentsPaginatorComposition } from "../../actionscompositions/PaymentsPaginatorComposition";

class AdminPaymetsList extends Component {
  render() {
    return (
      <FeaturesContext feature="AthletesList">
        <PaymentsContextProvider>
          <div className="row">
            <div className="col s12">
              <FilterFormComposition
                layout="PaymentsFilter"
                title="Payment List"
              ></FilterFormComposition>
            </div>
            <div className="col s12">
              <div className="container">
                <div className="row">
                  <PaginatorContextProvider>
                    <div className="col s12">
                      <PaymentsPaginatorComposition layout="StandarPaginator" />
                    </div>
                    <div className="col s12">
                      <PaymentsListComposition layout="PaymentsTableList" />
                    </div>
                    <div className="col s12">
                      <PaymentsPaginatorComposition layout="StandarPaginator" />
                    </div>
                  </PaginatorContextProvider>
                </div>
              </div>
            </div>
          </div>
        </PaymentsContextProvider>
      </FeaturesContext>
    );
  }
}

export default AdminPaymetsList;
