import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import TireTracker from './containers/TireTracker/TireTracker';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <TireTracker />
        </Layout>
      </div>
    );
  }
}

export default App;
