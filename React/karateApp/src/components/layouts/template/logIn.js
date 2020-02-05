import React, { Component } from "react";
import { LogInHeader } from "../header/logInHeaderTemplate";

//Templates Layouts
import Athletes from "../../routes/login/Athletes";
import DashboardAdmin from "../../routes/login/DashboardAdmin";
import DashBoardIndividual from "../../routes/login/DashboardIndividual";
import NotFoundComponent from "../../routes/NotFoundComponent";

//Estos componentes luego se deben mover al filtro por features
import SubsCriptionBill from "../../layouts/summary/SubsCriptionBill";

//Route Builder Components
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
//Main App Routes
import { MapRoutes } from "./complement/logInLink";

//Redux Conection
import { connect } from "react-redux";
//Redux Actions
import {
  validateDebts,
  getAthleteList
} from "../../../store/actions/athleteActions";

//ResetActions
import { resetStore as resetFeatures } from "../../../store/actions/featuresActions";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { athlete: false, routes: null };
  }

  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });
    this.setState({
      routes: (
        <MapRoutes
          features={this.props.features.content}
          defaultroutes={this.getDefaultRoutes}
        />
      )
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.triggerAthletes && !prevProps.triggerAthletes) {
      this.setState({ athlete: true });
    }

    if (!this.props.triggerAthletes && prevProps.triggerAthletes) {
      this.setState({ athlete: false });
    }
  }

  getDefaultRoutes = () => {
    let routes = [];
    try {
      switch (this.props.features.role) {
        case "team":
          routes.push(
            <Route exact path="/" component={Athletes} key="homeroute" />
          );
          break;

        case "admin":
          routes.push(
            <Route exact path="/" component={DashboardAdmin} key="homeroute" />
          );
          break;

        default:
          routes.push(
            <Route
              exact
              path="/"
              component={DashBoardIndividual}
              key="homeroute"
            />
          );
          break;
      }

      routes.push(
        <Route
          exact
          path="/payments"
          component={SubsCriptionBill}
          key="paymentroute"
        />
      );

      return routes;
    } catch (error) {
      return <Route exact path="/" component={NotFoundComponent} />;
    }
  };

  componentWillUnmount() {
    this.props.resetFeatures();
    window.removeEventListener("popstate", function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }

  checkOutLink = () => {
    return this.props.features.role !== "athlete" ? (
      this.props.validateDebts() ? (
        <li>
          <NavLink to="/payments" className="blue-custom-button greenbutton">
            Proceed to Check Out
          </NavLink>
        </li>
      ) : null
    ) : null;
  };

  buttonsContainer = () => {
    if (this.props.features.role !== "admin") {
      return (
        <div className="col s12 m12 l4">
          <ul className="list-buttoncotaniner">
            {this.state.athlete ? (
              <MapRoutes type="button" features={this.props.features.content} />
            ) : null}
            {this.state.athlete ? this.checkOutLink() : null}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    if (this.state.routes) {
      return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <LogInHeader
            featuresbuttons={() => {
              return null;
            }}
            authUser={this.props.features.userid}
          />
          <div className="main-login-body">
            <div className="routelinks container">
              <div className="row">
                <div className="col s12 tabcontainer">
                  {/*<ul className="tabs">
                    <MapRoutes
                      type="link"
                      features={this.props.features.content}
                    />
          </ul>*/}
                </div>
                {this.buttonsContainer()}
              </div>
            </div>
            {/*Features Routes*/}
            {this.state.routes}
          </div>
        </BrowserRouter>
      );
    } else {
      return null;
    }
  }
}

const maspStateToProps = state => {
  return {
    auth: state.auth,
    token: state.auth.token,
    features: state.features,
    triggerAthletes: state.athlete.triggerComponents
  };
};
const mapDispatchtoProps = dispatch => {
  return {
    getAthleteList: data => dispatch(getAthleteList(data)),
    validateDebts: () => dispatch(validateDebts()),
    resetFeatures: () => dispatch(resetFeatures())
  };
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(LogIn);
