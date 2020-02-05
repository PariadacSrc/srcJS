import React, { Component } from "react";

//Helpers Components
import { Redirect, NavLink } from "react-router-dom";

//Redux Conection
import { connect } from "react-redux";
//Actions
import { resetStore } from "../../store/actions/usersActions";

class ComfirmRecovery extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.resetStore();
  }

  render() {
    try {
      const message = () => {
        if (this.props.recordtype !== "error") {
          const bodytext =
            this.props.recordtype === "complete_confirm"
              ? `Your password has been reset.`
              : `Your password has been reset. Please check your email.`;
          return (
            <div className="col s12 record-message-block">
              <div className="iconcontainer">
                <i className="fas fa-check" />
              </div>
              <div>
                <h3>Reset password successful.</h3>
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
                <h3>
                  Something wrong happens to reset your password. Please try
                  again later.
                </h3>
              </div>
              <div>
                <a
                  className="blue-custom-button"
                  onClick={() => {
                    this.props.resetStore();
                  }}
                >
                  Go back
                </a>
              </div>
            </div>
          );
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
  return {};
};

const mapDispatchtoProps = dispatch => {
  return {
    resetStore: () => dispatch(resetStore())
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(ComfirmRecovery);
