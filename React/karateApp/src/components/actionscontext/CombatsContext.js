import React, { createContext, Component } from "react";
//Redux Conection
import { connect } from "react-redux";

//Redux Actions
import {
  getCombatsList,
  generateCombatsList,
  resetStore as combatsReset
} from "../../store/actions/combatActions";

export const CombatsContext = createContext();

class CombatsContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      combats: false,
      filteredCombats: false,
      paginatorSettings: false,
      filterSettings: false
    };
  }
  //Main Component Listeners
  componentDidMount() {
    this.props.getCombatsList({ token: this.props.token });
  }

  componentDidUpdate(prevProps) {
    if (this.props.combats != prevProps.combats) {
      this.setState({
        combats: this.props.combats,
        filteredCombats: this.props.combats,
        paginatorSettings: false,
        filterSettings: false
      });
    }

    if (this.props.combats.length == 0 && !this.state.combats) {
      this.setState({
        combats: [],
        filteredCombats: [],
        paginatorSettings: false,
        filterSettings: false
      });
    }
  }

  componentWillUnmount() {
    this.props.combatsReset();
  }

  //Setters
  setCombats = combats => {
    this.setState({ combats: combats });
  };

  setFiltered = combats => {
    this.setState({ combats: combats, filteredCombats: combats });
  };

  setPaginator = setting => {
    this.setState({ paginatorSettings: setting });
  };

  //Resets
  resetCombats = () => {
    this.setState({
      combats: this.props.combats,
      filteredCombats: this.props.combats
    });
  };

  //Helpers

  generateCombats = () => {
    this.props.generateCombatsList({ token: this.props.token });
  };

  render() {
    return (
      <CombatsContext.Provider
        value={{
          ...this.state,
          setFiltered: this.setFiltered,
          setCombats: this.setCombats,
          resetCombats: this.resetCombats,
          setPaginator: this.setPaginator,
          resetStore: this.props.combatsResetStore,
          generateCombats: this.generateCombats
        }}
      >
        {this.props.children}
      </CombatsContext.Provider>
    );
  }
}

const maspStateToProps = state => {
  return {
    token: state.auth.token,
    combats: state.combat.list
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    getCombatsList: data => dispatch(getCombatsList(data)),
    generateCombatsList: data => dispatch(generateCombatsList(data)),
    combatsReset: () => dispatch(combatsReset())
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(CombatsContextProvider);
