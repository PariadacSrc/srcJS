import React, { Component } from "react";
//Helpers
import AlertsModal from "../../summarimessages/AlertsModal";
import { SpinerLoader } from "../helpers/SpinerLoader";
import PaypalCheckOut from "../../forms/payments/PaypalCheckOut";
import { Redirect, NavLink } from "react-router-dom";
//Redux Conection
import { connect } from "react-redux";
//Redux Actions
import { setLastcallModal } from "../../../store/actions/modalsActions";
import {
  getAthleteListDebts,
  resetStore
} from "../../../store/actions/athleteActions";
import { comfirmPayment } from "../../../store/actions/paymentsActions";

class SubsCriptionBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoad: false,
      redirect: false,
      totalAmount: 0
    };
  }

  componentDidMount() {
    this.props.getAthleteListDebts({ token: this.props.token });
  }

  componentDidUpdate(prevProps) {
    if (this.props.athletes != prevProps.athletes) {
      this.setState(this.filterAthletes());
    }
  }

  filterAthletes = () => {
    let totalAmount = 0;
    const newList = this.props.athletes.map(athlete => {
      let seminar = false;
      let newAthletes = {
        mapkey: athlete.id_person,
        name: `${athlete.first_name} ${athlete.last_name}`,
        kata: 0,
        kumite: 0,
        seminar: 0,
        idperson: athlete.id_person
      };
      if (athlete.kata === "y" && athlete.kumite === "y") {
        newAthletes.kata = 35;
        newAthletes.kumite = 15;
        seminar = true;
      } else {
        if (athlete.kata === "y") {
          newAthletes.kata = 35;
          seminar = true;
        }
        if (athlete.kumite === "y") {
          newAthletes.kumite = 35;
          seminar = true;
        }
      }

      if (athlete.seminar === "y") {
        newAthletes.seminar = 35;
      }

      /*if (athlete.seminar === "y" && seminar) {
        newAthletes.seminar = 30;
      }*/

      const athleteamount =
        newAthletes.kata + newAthletes.kumite + newAthletes.seminar;
      totalAmount = totalAmount + athleteamount;

      newAthletes.athleteamount = athleteamount;

      return newAthletes;
    });

    return { dataLoad: newList, totalAmount: totalAmount };
  };

  filterOnlyId = () => {
    const auxmap = this.props.athletes.map(athlete => {
      return athlete.id_person;
    });
    return auxmap;
  };

  onSuccess = payment => {
    const idAthletes = this.props.athletes.map(athlete => {
      return athlete.id_person;
    });
    payment.token = this.props.token;
    payment.athlete_list = idAthletes;
    payment.bill = this.state.dataLoad;
    this.props.setLastcallModal(modalId);
    this.props.comfirmPayment(payment);
  };

  completeAction = () => {
    this.setState({ redirect: true });
    this.props.resetStore();
  };

  getBillArea = () => {
    const tabbody = this.state.dataLoad.map(athlete => {
      return (
        <tr key={`${athlete.mapkey}-athlete-bill`}>
          <td>{athlete.name}</td>
          <td>${athlete.kata}</td>
          <td>${athlete.kumite}</td>
          <td>${athlete.seminar}</td>
          <td>${athlete.athleteamount}</td>
        </tr>
      );
    });
    return (
      <div className="fullpaymetbill">
        <div className="billheader">
          <h4>Subscription Bill</h4>
        </div>
        <div className="billbody">
          <table className="striped">
            <thead>
              <tr>
                <th>Athletes</th>
                <th>Kata</th>
                <th>Kumite</th>
                <th>Parakarate</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {tabbody.length > 0 ? (
                tabbody
              ) : (
                <tr>
                  <td colSpan="5">Not records found</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">Total Participants</td>
                <td>{this.state.dataLoad.length}</td>
              </tr>
              <tr>
                <td colSpan="4">Total Amount</td>
                <td>${this.state.totalAmount}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  getPaymentsArea = () => {
    return (
      <div className="paymetsbutton">
        <div className="row">
          <div className="col s12">
            <h4>Select Payment Method</h4>
          </div>
          <div className="col s12">
            <PaypalCheckOut
              total={this.state.totalAmount}
              onSuccess={this.onSuccess}
            />
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="payments-block">
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h3>Payments</h3>
            </div>

            <div className="col s12">
              <div className="row">
                <div className="col s12">
                  <div className="billblock">
                    <div className="row">
                      <div className="col s12 m12 l8">
                        {this.state.dataLoad ? (
                          this.getBillArea()
                        ) : (
                          <SpinerLoader />
                        )}
                        <div className="buttonscontainer buttons-variation-one">
                          <NavLink
                            to="/"
                            className="blue-custom-button blackbutton"
                          >
                            Cancel
                          </NavLink>
                        </div>
                      </div>
                      <div className="col s12 m12 l4">
                        {this.state.dataLoad ? (
                          this.getPaymentsArea()
                        ) : (
                          <SpinerLoader />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.redirect ? <Redirect to="/" /> : null}
        <AlertsModal
          modalId={id => {
            modalId = id;
          }}
          handlerComplete={this.completeAction}
        />
      </div>
    );
  }
}

let modalId = "";

const maspStateToProps = state => {
  return {
    token: state.auth.token,
    athletes: state.athlete.list,
    payments: state.payments.content
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    getAthleteListDebts: data => dispatch(getAthleteListDebts(data)),
    comfirmPayment: data => dispatch(comfirmPayment(data)),
    resetStore: () => dispatch(resetStore()),
    setLastcallModal: id => dispatch(setLastcallModal(id))
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(SubsCriptionBill);
