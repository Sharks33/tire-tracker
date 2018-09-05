import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import TireTracker from './containers/TireTracker/TireTracker';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Inventory from './containers/Inventory/Inventory';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        {/* <Route path="/" exact component={ TireTracker } /> */}
        <Route path="/auth" component={ Auth } />
        <Redirect to="/auth" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/" exact component={ TireTracker } />
          <Route path="/checkout" component={ Checkout } />
          <Route path="/orders" component={ Orders } />
          <Route path="/logout" component={ Logout } />
          <Route path="/inventory" component={ Inventory } />
          <Redirect to="/auth" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps ) (App) );
