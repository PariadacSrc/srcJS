import React, { Component } from "react";

import { SpinerLoader } from "../layouts/helpers/SpinerLoader";

class RecordsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true
    };
    this.ModalBody = React.createRef();
  }

  componentDidMount() {
    this.setState({ status: this.props.modalstatus });
  }

  componentDidUpdate(prevProps) {
    if (this.props.modalstatus && !prevProps.modalstatus) {
      this.setState({ status: this.props.modalstatus });
    }
  }

  closeModal = () => {
    this.ModalBody.current.classList.add("hidemodal");
    setTimeout(() => {
      this.setState({ status: false });
      this.props.handlerComplete();
    }, 310);
  };

  getIconBlock = () => {
    switch (this.props.modalstatus) {
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
    switch (this.props.modalstatus) {
      case "complete":
        return (
          <div>
            <a className="blue-custom-button" onClick={this.closeModal}>
              Operation Complete
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
    if (this.props.modalcontent) {
      return (
        <div>
          {this.props.modalcontent.title ? (
            <h3>{this.props.modalcontent.title}</h3>
          ) : null}
          {this.props.modalcontent.message ? (
            <p>{this.props.modalcontent.message}</p>
          ) : null}
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    if (this.state.status) {
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

export default RecordsModal;
