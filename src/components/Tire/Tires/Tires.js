import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Tires extends Component {
    render () {
        let tireQuantity = null;

        switch ( this.props.type ) {
            case('none'):
                tireQuantity = <div><img src={require('../../../assets/TireKingLogo.png')} alt="tire-logo" /></div>;
                break;
            case('quantity'):
                tireQuantity = <img src={require('./tire.png')} alt="tire-logo" />;
                break;
            default:
                tireQuantity = null;
        }
        return tireQuantity;
    }

}

Tires.propTypes = {
    type: PropTypes.string.isRequired
};

export default Tires;