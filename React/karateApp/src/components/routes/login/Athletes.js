import React, { Component } from "react";

import AthletesList from "../../lists/AthletesList";
import AthleteContex from "../../formscontext/AthleteContext";
import RecordsModal from "../../summarimessages/RecordsModal";

//Features Filter
import { FeaturesFilter } from "../../features/FeaturesFilter";

//Redux Conection
import { connect } from "react-redux";

//Redux Actions
import {
  getAthleteList,
  resetStore as athletesResetStore
} from "../../../store/actions/athleteActions";
import {
  confirmActionDelete,
  deleteTeamMember,
  resetStore as userResetStore
} from "../../../store/actions/usersActions";
import {
  showAthleteForm,
  hideAthleteForm
} from "../../../store/actions/componentsActions";

class Athletes extends Component {
  constructor(props) {
    super(props);
    this.state = { athlete: "", last_key: "" };
  }
  componentDidMount() {
    this.props.getAthleteList({ token: this.props.token });
    this.setState({ last_key: this.props.location.key });
  }

  componentWillUnmount() {
    this.props.athletesResetStore();
  }

  editAthlete = mapkey => {
    this.props.showAthleteForm(mapkey);
  };
  confirmAction = mapkey => {
    this.setState({ athlete: mapkey });
    this.props.confirmActionDelete();
  };

  deleteAthlete = () => {
    this.props.deleteTeamMember({
      token: this.props.token,
      data: { id_person: this.state.athlete }
    });
    this.props.athletesResetStore();
    this.props.hideAthleteForm();
  };

  completeAction = () => {
    this.props.userResetStore();
    this.props.getAthleteList({ token: this.props.token });
  };

  render() {
    const FilterAthlete = FeaturesFilter(
      AthletesList,
      this.props.features.content
    );

    return (
      <div key="mainathletelist">
        <FilterAthlete
          initialList={this.props.athletes}
          putactions={true}
          handlerDelete={this.confirmAction}
          handlerEdit={this.editAthlete}
          putinstructions={true}
        />
        <AthleteContex
          cancelHandler={() => {
            this.props.athletesResetStore();
            this.props.getAthleteList({ token: this.props.token });
          }}
        />
        <RecordsModal
          handlerConfirm={this.deleteAthlete}
          handlerComplete={this.completeAction}
          modalstatus={this.props.recordstatus}
          modalcontent={this.props.helperdata}
        />
      </div>
    );
  }
}

const maspStateToProps = state => {
  return {
    features: state.features,
    token: state.auth.token,
    dojo: state.dojo.content,
    recordstatus: state.userrecord.recorddelete,
    helperdata: state.userrecord.helperdata,
    athletes: state.athlete.list
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    getAthleteList: data => dispatch(getAthleteList(data)),
    showAthleteForm: data => dispatch(showAthleteForm(data)),
    hideAthleteForm: () => dispatch(hideAthleteForm()),
    confirmActionDelete: () => dispatch(confirmActionDelete()),
    deleteTeamMember: data => dispatch(deleteTeamMember(data)),
    userResetStore: () => dispatch(userResetStore()),
    athletesResetStore: () => dispatch(athletesResetStore())
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(Athletes);
