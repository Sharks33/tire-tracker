import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import TireTracker from './containers/TireTracker/TireTracker';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Inventory from './containers/Inventory/Inventory';
import Auth from './containers/Auth/Auth';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={TireTracker} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/inventory" component={Inventory} />
          </Switch>
          {/* <TireTracker />
          <Checkout /> */}
        </Layout>
      </div>
    );
  }
}

export default App;
