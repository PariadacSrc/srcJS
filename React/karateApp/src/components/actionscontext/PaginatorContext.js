import React, { createContext, Component } from "react";

export const PaginatorContext = createContext();

class PaginatorContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = this.initState();
  }

  initState = () => {
    return {
      settings: this.initSettings()
    };
  };

  initSettings = () => {
    return {
      size: 10,
      page: 0,
      list: false,
      paginated: false
    };
  };

  //Setters
  setSettings = settings => {
    this.setState({ settings: settings });
  };

  //Resets
  resetSettings = () => {
    this.setState({ settings: this.initSettings() });
  };

  render() {
    return (
      <PaginatorContext.Provider
        value={{
          ...this.state,
          setSettings: this.setSettings,
          resetSettings: this.resetSettings
        }}
      >
        {this.props.children}
      </PaginatorContext.Provider>
    );
  }
}

export default PaginatorContextProvider;
