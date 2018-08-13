import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Tires.css';


class Tires extends Component {
    render () {
        let tireQuantity = null;

        switch ( this.props.type ) {
            case('none'):
                tireQuantity = <div><img src={require('../../../assets/images/TireKingLogo.png')} alt="tire-logo" /></div>;
                break;
            case('quantity'):
                tireQuantity = <img className={classes.Tires} src={require('../../../assets/images/tire.png')} alt="tire-logo" />;
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