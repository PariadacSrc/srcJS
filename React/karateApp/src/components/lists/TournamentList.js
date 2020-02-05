import React, { Component } from "react";

//Card
import TournamentCard from "./cards/TournamentCard";

class TournamentList extends Component {
  static displayName = "TournamentList";
  constructor(props) {
    super(props);
    this.state = {
      tournaments: []
    };
  }

  renderList() {
    try {
      return this.props.initialList.map(tournament => {
        return (
          <TournamentCard
            putcheck={this.props.putcheck ? this.props.putcheck : false}
            putactions={this.props.putactions ? this.props.putactions : false}
            tournament={tournament}
            key={tournament.mapkey ? tournament.mapkey : tournament.id}
            handlerDelete={this.props.handlerDelete}
            handlerEdit={this.props.handlerEdit}
          />
        );
      });
    } catch (error) {
      return null;
    }
  }

  render() {
    const tournamentmap = this.renderList();
    return (
      <div className="tournamentblock" id="tournamentblock">
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h3>Tournament List</h3>
            </div>

            <div className="col s12">
              <div className="row">{tournamentmap}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TournamentList;
