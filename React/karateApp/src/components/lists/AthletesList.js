import React, { Component } from "react";

//Card
import AthleteCard from "./cards/AthleteCard";

class AthletesList extends Component {
  static displayName = "AthletesList";
  constructor(props) {
    super(props);
    this.state = {
      athletes: []
    };
  }

  renderList() {
    try {
      return this.props.initialList.map(athlete => {
        return (
          <AthleteCard
            putcheck={this.props.putcheck ? this.props.putcheck : false}
            putactions={this.props.putactions ? this.props.putactions : false}
            athlete={athlete}
            key={athlete.mapkey ? athlete.mapkey : athlete.id_person}
            handlerDelete={this.props.handlerDelete}
            handlerEdit={this.props.handlerEdit}
            clubname="Test"
          />
        );
      });
    } catch (error) {
      return null;
    }
  }

  render() {
    const athletemap = this.renderList();
    return (
      <div
        className="teamblock"
        id="teamblock"
        key={this.props.putkey ? this.props.putkey : "list-athlete-block"}
      >
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h3>Team members</h3>
            </div>
            <div className="col s12">
              {this.props.putinstructions?<p>Welcome to the Calgary Karate Cup. Please add your team members and when you be ready,  proceed to Check Out to complete the registration process.</p>:null}
            </div>
            <div className="col s12">
              <div className="row">{athletemap}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AthletesList;
