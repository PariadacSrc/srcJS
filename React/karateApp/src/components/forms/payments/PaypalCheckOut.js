import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { PayPalButton } from "react-paypal-button-v2";

class PaypalCheckOut extends Component {
  constructor(props) {
    super(props);
    window.React = React;
    window.ReactDOM = ReactDOM;
    this.state = {
      isEnable: false,
      client: process.env.REACT_APP_PAYPAL_API_KEY,
      commit: true
    };
  }

  componentDidMount() {
    this.setState({
      isEnable: true
    });
  }

  onAuthorize = (data, actions) => {
    return actions.order.capture().then(() => {
      this.props.onSuccess(data);
    });
  };

  render() {
    return (
      <PayPalButton
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: this.props.currency,
                  value: this.props.total
                }
              }
            ]
          });
        }}
        onApprove={this.onAuthorize}
        onCancel={this.props.onCancel}
        onError={this.props.onError}
        options={{
          clientId: this.state.client,
          currency: this.props.currency
        }}
      />
    );
  }
}

PaypalCheckOut.propTypes = {
  total: PropTypes.number.isRequired
};

PaypalCheckOut.defaultProps = {
  currency: process.env.REACT_APP_PAYMENT_CURRENCY,
  onSuccess: payment => {
    console.log("The payment was succeeded!", payment);
  },
  onCancel: data => {
    console.log("The payment was cancelled!", data);
  },
  onError: err => {
    console.log("Error loading Paypal script!", err);
  }
};

export default PaypalCheckOut;
