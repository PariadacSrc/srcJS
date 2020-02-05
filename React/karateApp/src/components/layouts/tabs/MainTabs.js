import React, { Component } from "react";

import M from "materialize-css";

class MainTabs extends Component {
  static displayName = "MainTabs";
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    };
  }

  handlerTabsInite = () => {
    this.setState({
      instance: M.Tabs.init(document.querySelector(".tabcontainer>ul"), {})
    });
  };

  componentDidMount() {
    try {
      this.handlerTabsInite();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="tabcontainer">
        <ul className="tabs">
          <li className="tab">
            <a href="#teamblock">Team</a>
          </li>
          <li className="tab">
            <a href="#tournamentblock">Tournament</a>
          </li>
          <li className="tab">
            <a href="#combatsblock">Individual Key</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default MainTabs;
