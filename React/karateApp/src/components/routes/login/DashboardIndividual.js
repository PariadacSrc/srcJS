import React, { Component } from "react";
import TournamentList from "../../lists/TournamentList";
import { SpinerLoader } from "../../layouts/helpers/SpinerLoader";
import AtheteCard from "../../lists/cards/AthleteCard";
import AthleteContext from "../../formscontext/AthleteContext";

//Features Filter
import { FeaturesFilter } from "../../features/FeaturesFilter";

//Route Builder Components
import { NavLink } from "react-router-dom";

//Redux Conection
import { connect } from "react-redux";

import {
  getAthleteList,
  validateDebts,
  getAthleteListDebts,
  resetStore
} from "../../../store/actions/athleteActions";
import { showAthleteForm } from "../../../store/actions/componentsActions";

//ResetActions
import { resetStore as resetFeatures } from "../../../store/actions/featuresActions";

class DashBoardIndividual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoad: false
    };
  }
  getForm = () => {};

  componentDidMount() {
    this.props.getAthleteList({ token: this.props.token });
  }

  componentDidUpdate(prevProps) {
    if (this.props.athletes != prevProps.athletes) {
      this.setState({ dataLoad: true });
    }
  }

  componentWillUnmount() {
    this.props.resetStore();
  }

  getPrincipalContent = () => {
    return <h3>Individual Dashboard</h3>;
  };

  editAthlete = mapkey => {
    this.props.showAthleteForm(mapkey);
  };

  checkOutLink = () => {
    return this.props.validateDebts() ? (
      <div className="row">
        <div className="col s12 buttonscontainer buttons-variation-one">
          <NavLink to="/payments" className="blue-custom-button">
            Proceed to Check Out
          </NavLink>
        </div>
      </div>
    ) : null;
  };

  checkOutText = () => {
    return this.props.validateDebts() ? (
      <div>
        <p>
          Pre-registration in the tournament
          <strong> Calgary Karate Cup 2019</strong> has been successful. Please
          make the payment to complete the registration process
        </p>
      </div>
    ) : (
      <div>
        <p>Thanks for participating.</p>
        <p>
          <strong>Date</strong>
          <br />
          All divisions, Saturday, Oct 05th, 2019, 8:00 am to 5:00 pm
        </p>
        <p>
          <strong>Location</strong>
          <br />
          Community Gymnasium at Genesis Centre 7555 Falconridge Blvd NE #10,
          Calgary, AB T3J 0C9
        </p>
        <p>
          For more information, enter
          <a
            href="https://www.calgarykaratecup.com/"
            target="_blank"
            style={{ marginLeft: "5px" }}
          >
            here
          </a>
        </p>
      </div>
    );
  };

  getDataAthlete = () => {
    try {
      return this.props.athletes
        ? this.props.athletes.map(athlete => {
            return (
              <AtheteCard
                putcheck={false}
                putactions={true}
                athlete={athlete}
                key={athlete.id_person}
                clubName={athlete.dojo_name ? athlete.dojo_name : "N/A"}
                handlerEdit={this.editAthlete}
              />
            );
          })
        : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  render() {
    const FilterTournament = FeaturesFilter(
      TournamentList,
      this.props.features.content
    );
    return (
      <div className="individualDasboard">
        <div className="row">
          <div className="col s12 m6 l4">
            {this.state.dataLoad ? this.getDataAthlete() : <SpinerLoader />}
          </div>
          <div className="col s12 m6 l8">
            <div className="individual-text">
              <h4>Welcome to Calgary Karate Cup</h4>
              {this.state.dataLoad ? this.checkOutText() : <SpinerLoader />}
            </div>
          </div>
        </div>

        {this.state.dataLoad ? this.checkOutLink() : <SpinerLoader />}

        <div className="row">
          <div className="col s12">
            <AthleteContext
              cancelHandler={() => {
                this.props.getAthleteList({ token: this.props.token });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const maspStateToProps = state => {
  return {
    token: state.auth.token,
    athletes: state.athlete.list,
    features: state.features
  };
};
const mapDispatchtoProps = dispatch => {
  return {
    showAthleteForm: data => dispatch(showAthleteForm(data)),
    getAthleteList: data => dispatch(getAthleteList(data)),
    getAthleteListDebts: data => dispatch(getAthleteListDebts(data)),
    validateDebts: () => dispatch(validateDebts()),
    resetFeatures: () => dispatch(resetFeatures()),
    resetStore: () => dispatch(resetStore())
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(DashBoardIndividual);
