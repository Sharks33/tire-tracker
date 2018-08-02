import React, { Component } from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Quantity', type: 'quantity' },
];

class buildControls extends Component {
    render () {
        // const q = Object.keys(this.props.tireQuantity)
        // .map( tqKey => {
        //     return ( 
        //         <li key={tqKey}>
        //             <span style={{textTransform: 'capitalize'}}> { tqKey }: </span> 
        //             { this.props.tireQuantity[tqKey] } 
        //         </li>
        //     );
        // });

        return (
            <div className={classes.BuildControls}>

                <p style={{color: '#FFF'}}>
                    <strong>TOTAL: ${this.props.price.toFixed(2)}</strong>
                </p>

                {controls.map(ctrl => (
                    <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label} 
                        addQuantity={ () => this.props.quantityAdded(ctrl.type) }
                        removeQuantity={ () => this.props.quantityRemoved(ctrl.type) }
                        disabled={ this.props.disabled[ctrl.type] } />
                ))}

                <button 
                    className={classes.OrderButton}
                    disabled={!this.props.purchasable}
                    onClick={this.props.orderReady} > 
                    Confirm 
                </button>
            </div>
        );
    };  
};

export default buildControls;