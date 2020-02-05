import React, { Component } from "react";

//Helpers
import { SpinerLoader } from "../../layouts/helpers/SpinerLoader";

//Redux Conection
import { connect } from "react-redux";

//Redux Actions
import {
  getPersonPayment,
  resetStore
} from "../../../store/actions/paymentsActions";

class PaymentDetailsModals extends Component {
  constructor(props) {
    super(props);

    this.state = this.initState();
  }

  initState = () => {
    return {
      athlete: false
    };
  };

  componentDidMount() {
    if (this.props.athlete.status_payment) {
      this.setState({ athlete: this.props.athlete });
    }

    if (!this.state.paydetails) {
      this.props.getPersonPayment({
        token: this.props.token,
        id_person: this.props.athlete.id_person
      });
    }
  }

  showPayment = () => {
    if (!this.props.payment.error) {
      return this.props.payment.data ? (
        <div className="krt-payment-details-body">
          <div>
            <div className="col s12">
              <p>
                <strong>{this.props.payment.data.name}</strong>
              </p>
              <p>
                <strong>Operation:</strong>{" "}
                {this.props.payment.data.operation_id}
              </p>
            </div>
            <div className="col s12">
              <table>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Kata</td>
                    <td>{this.props.payment.data.kata} $</td>
                  </tr>
                  <tr>
                    <td>Kumite</td>
                    <td>{this.props.payment.data.kumite} $</td>
                  </tr>
                  <tr>
                    <td>Parakarate</td>
                    <td>{this.props.payment.data.seminar} $</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2">Total: {this.props.payment.data.total}$</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>{this.props.payment.message}</p>
        </div>
      );
    } else {
      this.closeModal();
    }
  };

  closeModal = () => {
    this.props.resetStore();
    this.setState(this.initState());
  };

  render() {
    return this.state.athlete ? (
      <div className="krt-payment-details-modal krt-main-modal tec-main-modal-block">
        <div>
          <div className="modal-body">
            <div className="krt-modal-header">
              <h3>Payment Details</h3>
            </div>
            <div className="krt-modal-body">
              {this.props.payment ? (
                this.showPayment()
              ) : (
                <SpinerLoader mesage="Loading Details"></SpinerLoader>
              )}
            </div>

            <div className="krt-modal-footer">
              <div className="buttonscontainer">
                <button
                  className="blue-custom-button"
                  onClick={e => {
                    e.preventDefault();
                    this.closeModal();
                  }}
                >
                  Go back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
const maspStateToProps = state => {
  return {
    token: state.auth.token,
    payment: state.payments.content
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    getPersonPayment: data => dispatch(getPersonPayment(data)),
    resetStore: () => dispatch(resetStore())
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(PaymentDetailsModals);
