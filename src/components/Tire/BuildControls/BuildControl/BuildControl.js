import React from 'react';

import classes from './BuildControl.css';

const buildControl = ( props ) => (
    <div className={classes.BuildControl}>

        <select className={classes.UserInput}>
            <option defaultValue>Select Tire Size...</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
        </select>

        <select className={classes.UserInput}>
            <option defaultValue>Select Brand...</option>
            <option value="Bridgestone">Bridgestone</option>
            <option value="Firestone">Firestone</option>
            <option value="Cooper">Cooper</option>
            <option value="Dunlop">Dunlop</option>
        </select>

        <div>
            <button className={classes.QuantityBtn} onClick={props.removeQuantity} disabled={props.disabled}> Less </button>
            <button className={classes.QuantityBtn} onClick={props.addQuantity}> More </button>
        </div>
        
    </div>
);

export default buildControl;