import React, { Component } from "react";

import TournamentList from "../../lists/TournamentList";

//Features Filter
import { FeaturesFilter } from "../../features/FeaturesFilter";

//Redux Conection
import { connect } from "react-redux";

//Redux Actions
import {
  getTournamentList,
  resetStore
} from "../../../store/actions/tournamentActions";

class Tournaments extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTournamentList({ token: this.props.token });
  }

  render() {
    const FilterTournament = FeaturesFilter(
      TournamentList,
      this.props.features.content
    );
    return (
      <div>
        <FilterTournament initialList={this.props.athletes} />
      </div>
    );
  }
}

const maspStateToProps = state => {
  return {
    features: state.features,
    token: state.auth.token,
    dojo: state.dojo.content,
    tournaments: state.tournament.list
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    getTournamentList: data => dispatch(getTournamentList(data)),
    resetStore: () => dispatch(resetStore())
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(Tournaments);
