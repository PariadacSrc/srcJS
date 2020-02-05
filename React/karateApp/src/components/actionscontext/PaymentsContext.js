import React, { createContext, Component } from "react";
//Redux Conection
import { connect } from "react-redux";

//Redux Actions
import {
  paymentList,
  resetStore as paymentsReset
} from "../../store/actions/paymentsActions";

export const PaymentsContext = createContext();

class PaymentsContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payments: false,
      filterpayments: false,
      paginatorSettings: false,
      filterSettings: false
    };
  }
  //Main Component Listeners

  componentDidUpdate(prevProps) {
    if (this.props.payments !== prevProps.payments) {
      this.setState({
        payments: this.props.payments,
        filterpayments: false
      });
    }
  }

  componentWillUnmount() {
    this.props.paymentsReset();
  }

  //Setters
  setPayments = payments => {
    this.setState({ payments: payments });
  };

  setFilterPayments = payments => {
    this.setState({ filterpayments: payments });
  };

  setPaginator = setting => {
    this.setState({ paginatorSettings: setting });
  };

  //Resets
  resetSearchList = (start_date, end_date) => {
    this.props.paymentList({
      token: this.props.token,
      start_date: start_date,
      end_date: end_date
    });
  };

  resetPayments = () => {
    this.setState({ payments: this.props.payments });
  };

  render() {
    const findpayments =
      this.props.payments.length > 0 && !this.state.payments
        ? this.props.payments
        : this.state.payments;

    return (
      <PaymentsContext.Provider
        value={{
          ...this.state,
          payments: findpayments,
          setPayments: this.setPayments,
          setFilterPayments: this.setFilterPayments,
          resetPayments: this.resetPayments,
          setPaginator: this.setPaginator,
          resetStore: this.props.paymentsResetStore,
          resetSearchList: this.resetSearchList
        }}
      >
        {this.props.children}
      </PaymentsContext.Provider>
    );
  }
}

const maspStateToProps = state => {
  return {
    token: state.auth.token,
    payments: state.payments.list
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    paymentList: data => dispatch(paymentList(data)),
    paymentsReset: () => dispatch(paymentsReset())
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(PaymentsContextProvider);
