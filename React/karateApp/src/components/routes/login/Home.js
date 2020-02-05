import React, { Component } from "react";

//Tabs
import MainTabs from "../../layouts/tabs/MainTabs";
//Home Layouts
import NewMembersForm from "../../forms/newmembers/NewMembersForm";
import AthletesList from "../../lists/AthletesList";
import CombatList from "../../lists/CombatList";
import TournamentList from "../../lists/TournamentList";

//Features Filter
import { FeaturesFilter } from "../../features/FeaturesFilter";

//Redux Conection
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  getForm = () => {};

  render() {
    const FilterTournament = FeaturesFilter(
      TournamentList,
      this.props.features.content
    );
    const FilterCombat = FeaturesFilter(
      CombatList,
      this.props.features.content
    );
    const FilterAthlete = FeaturesFilter(
      AthletesList,
      this.props.features.content
    );
    return (
      <div>
        <FilterTournament
          testcall={() => {
            console.log("i can read!!");
          }}
        />
      </div>
    );
  }
}

const maspStateToProps = state => {
  return {
    features: state.features
  };
};

export default connect(maspStateToProps)(Home);
