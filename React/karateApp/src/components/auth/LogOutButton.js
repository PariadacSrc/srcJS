import React from "react";

//Redux Conection
import { connect } from "react-redux";
//Actions
import { logOutUser } from "../../store/actions/authActions";

const LogOutButton = props => {
  return (
    <a href="#" onClick={props.logOutUser}>
      <i className="fas fa-door-open" />
    </a>
  );
};

const mapDispatchtoProps = dispatch => {
  return {
    logOutUser: () => dispatch(logOutUser())
  };
};

export default connect(
  null,
  mapDispatchtoProps
)(LogOutButton);
