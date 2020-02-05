import React, { Component } from "react";

//Redux Conection
import { connect } from "react-redux";
//ModalActions
import {
  findModal,
  setModal,
  deleteModal
} from "../../store/actions/modalsActions";
//Helpers
import uuid from "react-uuid";

import { SpinerLoader } from "../layouts/helpers/SpinerLoader";

class AlertsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initid: uuid(),
      content: this.getInitState()
    };
    this.ModalBody = React.createRef();
  }

  getInitState = () => {
    return {
      status: null,
      modal_title: "",
      modal_body: ""
    };
  };

  componentDidMount() {
    this.props.modalId(this.state.initid);
    this.props.setModal(this.state.initid);
  }

  componentDidUpdate(prevProps) {
    if (this.props.modaldata !== prevProps.modaldata) {
      const newcontent = findModal(this.props.modaldata, this.state.initid);

      if (newcontent) {
        if (newcontent.status === "fullclose") {
          this.setState({ content: newcontent });
          this.closeModal();
        } else {
          this.setState({ content: newcontent });
        }
      } else {
        this.setState({ content: this.getInitState() });
      }
    }
  }

  componentWillUnmount() {
    this.props.deleteModal(this.state.initid);
  }

  closeModal = () => {
    this.ModalBody.current.classList.add("hidemodal");
    setTimeout(() => {
      const endpoint = this.props.handlerComplete
        ? this.props.handlerComplete()
        : null;
      this.props.deleteModal(this.state.initid);
    }, 310);
  };

  getIconBlock = () => {
    switch (this.state.content.status) {
      case "complete":
        return (
          <div className="iconcontainer">
            <i className="fas fa-check" />
          </div>
        );
      case "confirm":
        return (
          <div className="iconcontainer warningtype">
            <i className="fas fa-exclamation" />
          </div>
        );
      case "loading":
        return <SpinerLoader />;
      case "error":
        return (
          <div className="iconcontainer errortype">
            <i className="fas fa-times" />
          </div>
        );
      default:
        return null;
    }
  };

  getModalButton = () => {
    switch (this.state.content.status) {
      case "complete":
        return (
          <div>
            <a className="blue-custom-button" onClick={this.closeModal}>
              Continue
            </a>
          </div>
        );
      case "confirm":
        return (
          <div className="buttonscontainer buttons-variation-one">
            <button
              className="blue-custom-button blackbutton"
              onClick={this.closeModal}
            >
              Cancel
            </button>
            <button
              className="blue-custom-button"
              onClick={
                this.props.handlerConfirm ? this.props.handlerConfirm : () => {}
              }
            >
              Continue
            </button>
          </div>
        );
      case "loading":
        return null;
      case "error":
        return (
          <div>
            <a className="blue-custom-button" onClick={this.closeModal}>
              Try Again
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  getModalContent = () => {
    if (this.state.content.status) {
      return (
        <div>
          {this.state.content.modal_title ? (
            <h3>{this.state.content.modal_title}</h3>
          ) : null}
          {this.state.content.modal_body ? (
            <p>{this.state.content.modal_body}</p>
          ) : null}
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    if (this.state.content.status) {
      return (
        <div className="tec-main-modal-block" ref={this.ModalBody}>
          <div>
            <div className="modal-body">
              <div>
                {this.getIconBlock()}
                {this.getModalContent()}
                {this.getModalButton()}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const maspStateToProps = state => {
  return {
    modaldata: state.modals.content
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    setModal: id => dispatch(setModal(id)),
    deleteModal: id => dispatch(deleteModal(id))
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(AlertsModal);
