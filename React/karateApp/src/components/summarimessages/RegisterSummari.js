import React, { Component } from "react";

//Helpers Components
import { Redirect, NavLink } from "react-router-dom";
import { SpinerLoader } from "../layouts/helpers/SpinerLoader";

//Redux Conection
import { connect } from "react-redux";
//Actions
import { resetStore } from "../../store/actions/usersActions";

class RegisterSummari extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.resetStore();
  }

  render() {
    try {
      const message = () => {

        switch(this.props.userdata.recordstatus){
          case "loading":
            return (
              <div className="col s12 record-message-block">
                  <div>
                    <h3>Loading Data</h3>
                    <SpinerLoader />
                  </div>
              </div>
            );
          default:
            if (this.props.userdata.response.data.token) {
              const bodytext =
                this.props.recordtype === "individual"
                  ? `Pre-registration in the tournament Calgary Karate Cup 2019 has been successful. Please make the payment to complete the registration process`
                  : `Pre-registration in the tournament Calgary Karate Cup 2019 has been successful. Please make the payment to complete the registration process`;
              return (
                <div className="col s12 record-message-block">
                  <div className="iconcontainer">
                    <i className="fas fa-check" />
                  </div>
                  <div>
                    <h3>Subscription completed successfully</h3>
                    <p>{bodytext}</p>
                  </div>
                  <div>
                    <NavLink to="/" className="blue-custom-button">
                      Finish
                    </NavLink>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="col s12 record-message-block">
                  <div className="iconcontainer errortype">
                    <i className="fas fa-times" />
                  </div>
                  <div>
                    <h3>Interrupted Subscription </h3>
                    <p>{this.props.userdata.response.data.message}</p>
                  </div>
                  <div>
                    <a
                      className="blue-custom-button"
                      onClick={() => {
                        this.props.resetStore();
                      }}
                    >
                      Try again
                    </a>
                  </div>
                </div>
              );
            }
        }

        
      };

      return (
        <div className="main-form-block">
          <div>
            <div className="row">{message()}</div>
          </div>
        </div>
      );
    } catch (error) {
      return <Redirect to="/" />;
    }
  }
}

const maspStateToProps = state => {
  try {
    return {
      userdata: state.userrecord,
      recordcomplete: state.userrecord.recordcomplete
    };
  } catch (e) {
    console.log(e);
    return { recordcomplete: false };
  }
};

const mapDispatchtoProps = dispatch => {
  return {
    resetStore: () => dispatch(resetStore())
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(RegisterSummari);
