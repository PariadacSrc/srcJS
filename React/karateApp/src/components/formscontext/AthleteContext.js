import React, { Component } from "react";

//Helpers
import NewMembersFrom from "../forms/newmembers/NewMembersForm";
import { fetchDateFormat } from "../rules/validateFormRules";
import RecordsModal from "../summarimessages/RecordsModal";

//Redux Conection
import { connect } from "react-redux";
//Redux Actions
import {
  setTeamMembers,
  resetStore as userResetStore
} from "../../store/actions/usersActions";
import { hideAthleteForm } from "../../store/actions/componentsActions";
import {
  getAthleteList,
  resetStore as athletesResetStore
} from "../../store/actions/athleteActions";
import { resetStore as resetDojo } from "../../store/actions/dojoActions";

class AthleteContex extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitState();
  }

  getInitState = () => {
    return {
      sigleAthlete: null
    };
  };

  componentDidMount() {
    this.props.userResetStore();
    this.props.resetDojo();
    this.findAthlete();
  }

  componentDidUpdate(prevProps) {
    if (this.props.find !== prevProps.find) {
      this.findAthlete();
    }
  }

  componentWillUnmount() {
    this.props.userResetStore();
    this.props.resetDojo();
    this.props.hideAthleteForm();
  }

  /**Actions of manipulation and management of the state of the athletes*/
  addAthlete = athlete => {
    let record = this.fetchRecordData(athlete);
    record.athletes = [record.athletes];
    try {
      this.props.setTeamMembers(record);
    } catch (error) {
      console.log(error);
    }
  };

  updateAthlete = athlete => {
    let record = this.fetchRecordData(athlete);
    record.recordtype = "update";
    try {
      this.props.setTeamMembers(record);
    } catch (error) {
      console.log(error);
    }
  };

  findAthlete = () => {
    if (this.props.find) {
      this.props.athletes.map(athlete => {
        if (athlete.id_person === this.props.find) {
          let auxathlete = athlete;
          auxathlete.birthdate = new Date(auxathlete.birthdate);
          auxathlete.birthdate.setDate(auxathlete.birthdate.getDate() + 1);
          this.setState({
            sigleAthlete: athlete
          });
        }
        return athlete;
      });
    } else {
      this.setState(this.getInitState());
    }
  };

  onlyCancel = () => {
    try {
      if (this.props.recordstatus !== "error") {
        this.props.userResetStore();
        this.props.hideAthleteForm();
      }
    } catch (error) {}
  };

  cancelUpdate = () => {
    try {
      this.props.cancelHandler();
      this.onlyCancel();
    } catch (error) {}
  };

  /**Athlete storage action on the server */
  fetchRecordData = athlete => {
    try {
      /**Fetch Main Athletes Data */
      let auxobj = { ...athlete };
      /**Fetch picturesFormat */
      let files = new FormData();
      if (auxobj.auxpicture.value) {
        files.append("photo", auxobj.auxpicture.value, auxobj.picture);
      }
      /**Fix date format */
      auxobj.birthdate = fetchDateFormat(auxobj.birthdate);
      /**The properties that the object implements to manipulate
       * the information in its own state are deleted */
      delete auxobj.auxpicture;
      delete auxobj.mapkey;

      /**Dispatch API set team members action */
      return {
        athletes: auxobj,
        token: this.props.token,
        pictures: [files]
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  render() {
    if (this.props.statuscomponen) {
      return (
        <div>
          <NewMembersFrom
            handlerAdd={this.addAthlete}
            handlerUpdate={this.updateAthlete}
            cancelHandler={this.onlyCancel}
            editAthlete={this.state.sigleAthlete}
          />
          <RecordsModal
            handlerComplete={this.cancelUpdate}
            modalstatus={this.props.recordstatus}
            modalcontent={this.props.helperdata}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

const maspStateToProps = state => {
  return {
    token: state.auth.token,
    dojo: state.dojo.content,
    athletes: state.athlete.list,
    recordstatus: state.userrecord.recordcomplete,
    helperdata: state.userrecord.helperdata,
    find: state.component.data,
    statuscomponen: state.component.content
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    setTeamMembers: data => dispatch(setTeamMembers(data)),
    getAthleteList: data => dispatch(getAthleteList(data)),
    userResetStore: () => dispatch(userResetStore()),
    hideAthleteForm: () => dispatch(hideAthleteForm()),
    resetDojo: () => dispatch(resetDojo()),
    athletesResetStore: () => dispatch(athletesResetStore())
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(AthleteContex);
