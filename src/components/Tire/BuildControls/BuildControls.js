import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Quantity', type: 'quantity' },
];

const buildControls = ( props ) => (
    <div className={classes.BuildControls}>

        <p style={{color: '#FFF'}}>
            <strong>TOTAL: ${props.price.toFixed(2)}</strong>
        </p>

        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                addQuantity={ () => props.quantityAdded(ctrl.type) }
                removeQuantity={ () => props.quantityRemoved(ctrl.type) }
                disabled={ props.disabled[ctrl.type] } />
        ))}

        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.orderReady} > 
            Confirm 
        </button>
    </div>
);

export default buildControls;