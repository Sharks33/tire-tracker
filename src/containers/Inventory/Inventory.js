import React, { Component } from 'react';

import Stock from '../../components/Stock/Stock';

class Inventory extends Component {
    render () {
        return (
            <div>
                <Stock />
                <Stock />
            </div>
        );
    }
}

export default Inventory;