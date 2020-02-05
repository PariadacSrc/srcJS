import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
  }

  handlerValidations() {
    const errors = this.props.validations.map(validation => {
      validateOneField(validation);
    });

    if (errors.length === 0) {
      this.props.handleChange;
    }
  }

  render() {
    return (
      <input
        placeholder={this.props.placeholder}
        id={this.props.id}
        name={this.props.name}
        type={this.props.type}
        className={this.props.className}
        value={this.props.value}
        onChange={this.handlerValidations}
      />
    );
  }
}
