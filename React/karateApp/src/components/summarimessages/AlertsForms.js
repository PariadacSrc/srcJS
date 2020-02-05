import React, { Component } from "react";

//Redux Conection
import { connect } from "react-redux";
//ModalActions
import {
  findFormAlert,
  setFormAlert,
  deleteFormAlert
} from "../../store/actions/formAlertsActions";
//Helpers
import uuid from "react-uuid";

import { SpinerLoader } from "../layouts/helpers/SpinerLoader";

class AlertsForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initid: uuid(),
      content: this.getInitState()
    };
    this.FormBody = React.createRef();
  }

  getInitState = () => {
    return {
      status: null,
      form_alert_title: "",
      form_alert_body: ""
    };
  };

  componentDidMount() {
    this.props.alertFormId(this.state.initid);
    this.props.setFormAlert(this.state.initid);
  }

  componentDidUpdate(prevProps) {
    if (this.props.formdata !== prevProps.formdata) {
      const newcontent = findFormAlert(this.props.formdata, this.state.initid);

      if (newcontent) {
        this.setState({ content: newcontent });
      } else {
        this.setState({ content: this.getInitState() });
      }
    }
  }

  componentWillUnmount() {
    this.props.deleteFormAlert(this.state.initid);
  }

  closeAlert = e => {
    e.preventDefault();
    this.FormBody.current.classList.add("hidealert");
    setTimeout(() => {
      const endpoint = this.props.handlerComplete
        ? this.props.handlerComplete()
        : null;
      this.props.deleteFormAlert(this.state.initid);
    }, 310);
  };

  getAlertContent = () => {
    if (this.state.content.status) {
      return (
        <div>
          {this.state.content.form_alert_body ? (
            <p>{this.state.content.form_alert_body}</p>
          ) : null}
          <button className="alertclose" onClick={this.closeAlert}>
            <span className="fas fa-times" />
          </button>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    if (this.state.content.status) {
      return (
        <div
          className={`tec-main-alert-block ${this.state.content.status}`}
          ref={this.FormBody}
        >
          {this.getAlertContent()}
        </div>
      );
    } else {
      return null;
    }
  }
}

const maspStateToProps = state => {
  return {
    formdata: state.form_alerts.content
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    setFormAlert: id => dispatch(setFormAlert(id)),
    deleteFormAlert: id => dispatch(deleteFormAlert(id))
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(AlertsForms);
