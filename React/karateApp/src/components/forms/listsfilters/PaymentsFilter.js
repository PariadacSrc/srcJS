import React, { useContext, useState, useEffect } from "react";

//AppContexts
import { PaymentsContext } from "../../actionscontext/PaymentsContext";
//Helpers Components
import {
  FieldContextComponent,
  fcStandarChangeHandler,
  fcDateChangeHandler
} from "../complements/FormComponentsBuilder";

export const PaymentsFilter = () => {
  /**Helper Methods */
  const maxPaymentDate = () => {
    let validate = new Date();
    return validate;
  };

  const minPaymentDate = () => {
    let validate = new Date();
    validate.setMonth(validate.getMonth() - 3);
    return validate;
  };

  /**Main Component Data */
  const initState = {
    payment_data: "",
    start_date: minPaymentDate(),
    end_date: maxPaymentDate(),
    amount: ""
  };

  const {
    payments,
    filterpayments,
    setFilterPayments,
    setPaginator,
    resetSearchList
  } = useContext(PaymentsContext);
  const [mainState, setMain] = useState(initState);

  /**Main State Listener */
  useEffect(() => {
    if (!payments) {
      resetSearchList(minPaymentDate(), maxPaymentDate());
    }
    if (payments && !filterpayments) {
      mainFilter();
    }
  });

  /**Main Handlers */
  const resetFilter = e => {
    setMain(initState);
  };

  const mainHandleSubmit = e => {
    e.preventDefault();
    resetSearchList(mainState.start_date, mainState.end_date);
  };

  const mainFilter = () => {
    try {
      const auxPayments = payments.filter(payment => {
        try {
          const payment_data =
            mainState.payment_data !== ""
              ? payment.payment_id
                  .toLowerCase()
                  .includes(mainState.payment_data.toLowerCase()) ||
                payment.user_id
                ? payment.user_id
                    .toLowerCase()
                    .includes(mainState.payment_data.toLowerCase())
                : false
              : true;

          const amount =
            mainState.amount !== ""
              ? payment.amount === mainState.amount
              : true;

          return payment_data && amount;
        } catch (error) {
          return true;
        }
      });
      setFilterPayments(auxPayments);
      setPaginator(false);
    } catch (error) {
      setFilterPayments(payments);
    }
  };

  /**Main Render */
  return (
    <form onSubmit={mainHandleSubmit}>
      <div className="row minflex">
        <div className="col s12 l10">
          <div className="row">
            <div className="col s12 l6">
              <div className="row">
                <FieldContextComponent
                  fieldsize="s12"
                  fieldtag="Confirmation ID / Paid by"
                  fieldtype="text"
                  fieldid="payment_data"
                  fieldvalue={mainState.payment_data}
                  handleChange={e => {
                    fcStandarChangeHandler(e, mainState, setMain);
                  }}
                />
              </div>
            </div>
            <div className="col s12 l6">
              <div className="row">
                <FieldContextComponent fieldsize="s12 l8" fieldtag="Date range">
                  <div className="row">
                    <FieldContextComponent
                      fieldsize="s12 l6"
                      fieldtype="date"
                      fieldid="start_date"
                      fieldvalue={mainState.start_date}
                      maxdate={mainState.end_date}
                      handleChange={e => {
                        fcDateChangeHandler(
                          e,
                          "start_date",
                          mainState,
                          setMain
                        );
                      }}
                    />
                    <FieldContextComponent
                      fieldsize="s12 l6"
                      fieldtype="date"
                      fieldid="end_date"
                      fieldvalue={mainState.end_date}
                      maxdate={maxPaymentDate()}
                      mindate={mainState.start_date}
                      handleChange={e => {
                        fcDateChangeHandler(e, "end_date", mainState, setMain);
                      }}
                    />
                  </div>
                </FieldContextComponent>

                <FieldContextComponent
                  fieldsize="s12 l4"
                  fieldtag="amount"
                  fieldtype="text"
                  fieldid="amount"
                  fieldvalue={mainState.amount}
                  handleChange={e => {
                    fcStandarChangeHandler(e, mainState, setMain);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col s12 l2">
          <div className="row buttonscontainer krt-btns-vertical">
            <button className="blue-custom-button">
              <i className="fas fa-search" /> Search
            </button>
            <button
              onClick={resetFilter}
              className="blue-custom-button redbutton"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PaymentsFilter;
