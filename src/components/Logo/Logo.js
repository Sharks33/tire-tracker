import React from 'react';

import tireLogo from '../../assets/images/TireKingLogo.png';
import classes from './Logo.css';

const logo = ( props ) => (
    <div className={classes.Logo}>
        <img src={tireLogo} alt="TireTracker"/>
    </div>
);

export default logo;