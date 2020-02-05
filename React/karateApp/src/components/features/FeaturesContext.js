import React, { Component, lazy, Suspense } from "react";

//Features
import { FeatureBondComponent } from "../../config/featuresConfig";
//Redux Conection
import { connect } from "react-redux";
//Helpers
import { SpinerLoader } from "../layouts/helpers/SpinerLoader";
import PropTypes from "prop-types";

/*
 *This component does not represent a standard context model of react.
 *This fulfills the function of validating the permissions that the user has to implement a component.
 */
class FeaturesContext extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: false,
      feature: false
    };
  }

  componentDidMount() {
    const feature = this.featuresFilter();
    this.setState({ status: true, feature: feature });
  }

  featuresFilter = (auxFeatures = this.props.features) => {
    try {
      const mainFeature = FeatureBondComponent[this.props.feature];

      if (auxFeatures.length > 1) {
        let slideHalf = Math.round(auxFeatures.length / 2);
        let sideLower = auxFeatures.slice(0, slideHalf);
        let sideUpper = auxFeatures.slice(slideHalf, auxFeatures.length);

        if (mainFeature <= sideLower[sideLower.length - 1]) {
          if (sideLower[sideLower.length - 1] === mainFeature) {
            return true;
          } else {
            return this.featuresFilter(sideLower);
          }
        }

        if (mainFeature >= sideUpper[0]) {
          if (sideUpper[0] === mainFeature) {
            return true;
          } else {
            return this.featuresFilter(sideUpper);
          }
        }

        return false;
      } else {
        if (mainFeature == auxFeatures[0]) {
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      return null;
    }
  };

  render() {
    if (this.state.status) {
      if (this.state.feature) {
        return <div>{this.props.children}</div>;
      } else {
        return null;
      }
    } else {
      return <SpinerLoader></SpinerLoader>;
    }
  }
}

FeaturesContext.propTypes = {
  feature: PropTypes.string.isRequired
};

const maspStateToProps = state => {
  return {
    token: state.auth.token,
    features: state.features.content
  };
};
const mapDispatchtoProps = dispatch => {
  return {};
};

export default connect(
  maspStateToProps,
  mapDispatchtoProps
)(FeaturesContext);
