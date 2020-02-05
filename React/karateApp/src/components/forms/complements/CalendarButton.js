import React, { Component } from "react";

class CalendarButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <i className="fa fa-calendar-alt" onClick={this.props.onClick} />;
  }
}

export default CalendarButton;
