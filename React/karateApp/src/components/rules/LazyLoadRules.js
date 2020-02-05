import * as React from "react";

//Redux Conection
import { connect } from "react-redux";

export class LazyLoadRules extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      WrappedComponent: null
    };
  }

  async componentDidMount() {
    const { resolve, data } = this.props;
    const WrappedComponent = await resolve(data);
    console.log(WrappedComponent.default.module);
    this.setState({
      WrappedComponent: WrappedComponent.default.WrappedComponent
    });
  }

  render() {
    const { WrappedComponent } = this.state;
    if (!WrappedComponent) return null;
    if (WrappedComponent) return <WrappedComponent {...this.props} />;
  }
}

export default connect()(LazyLoadRules);
