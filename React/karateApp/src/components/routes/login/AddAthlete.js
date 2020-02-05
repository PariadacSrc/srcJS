import React, { Component } from "react";

//Helpers
import AthleteList from "../../lists/AthletesList";
import NewMembersFrom from "../../forms/newmembers/NewMembersForm";
import { fetchDateFormat } from "../../rules/validateFormRules";
import RecordsModal from "../../summarimessages/RecordsModal";

//Route Builder Components
import { NavLink } from "react-router-dom";

//Redux Conection
import { connect } from "react-redux";
//Redux Actions
import {
  setTeamMembers,
  resetStore
} from "../../../store/actions/usersActions";

class AddAthlete extends Component {
  static displayName = "AddAthlete";
  constructor(props) {
    super(props);
    this.state = this.getInitState();
  }

  getInitState = () => {
    return {
      athletes: [],
      sigleAthlete: null
    };
  };

  componentDidMount() {
    this.props.resetStore();
  }

  componentDidUpdate(prevProps) {
    if (
      !this.props.recordstatus &&
      this.props.recordstatus !== prevProps.recordstatus &&
      prevProps.recordstatus !== "error"
    ) {
      this.setState(this.getInitState());
    }
  }

  componentWillUnmount() {
    this.props.resetStore();
  }

  /**Actions of manipulation and management of the state of the athletes*/
  addAthlete = athlete => {
    let athletes = [...this.state.athletes, athlete];
    this.setState({
      athletes: athletes,
      sigleAthlete: null
    });
  };

  editAthlete = mapkey => {
    let athletes = this.state.athletes.filter(athlete => {
      return athlete.mapkey === mapkey;
    });
    this.setState({
      sigleAthlete: athletes[0] ? athletes[0] : null
    });
  };

  updateAthlete = existathlete => {
    let athletes = this.state.athletes.filter(athlete => {
      return athlete.mapkey !== existathlete.mapkey;
    });
    athletes = [...athletes, existathlete];
    this.setState({
      athletes: athletes,
      sigleAthlete: null
    });
  };

  cancelUpdate = () => {
    this.setState({
      sigleAthlete: null
    });
  };

  deleteAthlete = mapkey => {
    let athletes = this.state.athletes.filter(athlete => {
      return athlete.mapkey !== mapkey;
    });
    this.setState({
      athletes: athletes
    });
  };

  /**Athlete storage action on the server */
  fetchRecordData = e => {
    e.preventDefault();
    try {
      let auxathletes = [];
      let files = [...this.state.athletes];
      files = files.filter(athlete => {
        /**Fetch Main Athletes Data */
        let auxobj = { ...athlete };
        /**Fix date format */
        auxobj.birthdate = fetchDateFormat(auxobj.birthdate);
        /**The properties that the object implements to manipulate
         * the information in its own state are deleted */
        delete auxobj.auxpicture;
        delete auxobj.mapkey;
        auxathletes.push(auxobj);
        /***/
        if (athlete.auxpicture.value) {
          return true;
        } else {
          return false;
        }
      });
      /**Fetch picturesFormat */
      files = files.map(file => {
        let aux = new FormData();
        aux.append("photo", file.auxpicture.value);
        return aux;
      });
      /**Dispatch API set team members action */
      this.props.setTeamMembers({
        athletes: auxathletes,
        token: this.props.token,
        pictures: files
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <NewMembersFrom
          handlerAdd={this.addAthlete}
          handlerUpdate={this.updateAthlete}
          cancelHandler={this.cancelUpdate}
          editAthlete={this.state.sigleAthlete}
        />
        <AthleteList
          handlerDelete={this.deleteAthlete}
          handlerEdit={this.editAthlete}
          initialList={this.state.athletes}
          putactions={true}
          putinstructions={true}
        />
        <div className="row">
          <div className="col s12 buttonscontainer buttons-variation-one">
            <NavLink to="/" className="blue-custom-button blackbutton">
              Cancel Register
            </NavLink>
            <button
              className="blue-custom-button"
              onClick={this.fetchRecordData}
            >
              Register All Athletes
            </button>
          </div>
        </div>
        <RecordsModal
          handlerComplete={this.props.resetStore}
          modalstatus={this.props.recordstatus}
          modalcontent={this.props.helperdata}
        />
      </div>
    );
  }
}

const maspStateToProps = state => {
  return {
    token: state.auth.token,
    recordstatus: state.userrecord.recordcomplete,
    helperdata: state.userrecord.helperdata
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    setTeamMembers: data => dispatch(setTeamMembers(data)),
    resetStore: () => dispatch(resetStore())
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(AddAthlete);
