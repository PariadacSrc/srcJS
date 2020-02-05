import React, { Component } from "react";
//Features
import { FeaturesRelation } from "../../config/featuresConfig";

export const validateFeature = (WrapFeature, UserFeatures) => {
  const filterkey = WrapFeature.WrappedComponent
    ? WrapFeature.WrappedComponent
    : WrapFeature;
  return UserFeatures.filter(feature => {
    try {
      return FeaturesRelation[filterkey.displayName] === feature;
    } catch (error) {
      return false;
    }
  }).length;
};

export const FeaturesFilter = (WrapFeature, UserFeatures, DataFeature) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: ""
      };
    }

    render() {
      if (validateFeature(WrapFeature, UserFeatures) > 0) {
        return <WrapFeature data={this.state.data} {...this.props} />;
      } else {
        return null;
      }
    }
  };
};
