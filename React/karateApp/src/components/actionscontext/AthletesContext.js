import React, { createContext, Component } from "react";
//Redux Conection
import { connect } from "react-redux";

//Redux Actions
import {
  getAthleteList,
  resetStore as athletesReset
} from "../../store/actions/athleteActions";

export const AthletesContext = createContext();

class AthletesContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      athletes: false,
      filteredAthletes: false,
      paginatorSettings: false,
      filterSettings: false
    };
  }
  //Main Component Listeners
  componentDidMount() {
    this.props.getAthleteList({ token: this.props.token });
  }

  componentDidUpdate(prevProps) {
    if (this.props.athletes != prevProps.athletes) {
      this.setState({
        athletes: this.props.athletes,
        filteredAthletes: this.props.athletes
      });
    }

    if (this.props.athletes.length == 0 && !this.state.athletes) {
      this.setState({ athletes: [], filteredAthletes: [] });
    }
  }

  componentWillUnmount() {
    this.props.athletesReset();
  }

  //Setters
  setAthletes = athletes => {
    this.setState({ athletes: athletes });
  };

  setFiltered = athletes => {
    this.setState({ athletes: athletes, filteredAthletes: athletes });
  };

  setPaginator = setting => {
    this.setState({ paginatorSettings: setting });
  };

  //Resets
  resetAthletes = () => {
    this.setState({
      athletes: this.props.athletes,
      filteredAthletes: this.props.athletes
    });
  };

  render() {
    return (
      <AthletesContext.Provider
        value={{
          ...this.state,
          setFiltered: this.setFiltered,
          setAthletes: this.setAthletes,
          resetAthletes: this.resetAthletes,
          setPaginator: this.setPaginator,
          resetStore: this.props.athletesResetStore
        }}
      >
        {this.props.children}
      </AthletesContext.Provider>
    );
  }
}

const maspStateToProps = state => {
  return {
    token: state.auth.token,
    athletes: state.athlete.list
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    getAthleteList: data => dispatch(getAthleteList(data)),
    athletesReset: () => dispatch(athletesReset())
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(AthletesContextProvider);
