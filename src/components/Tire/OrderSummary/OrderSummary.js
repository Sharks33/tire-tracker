import React from 'react';

import Aux from '../../../hoc/Aux/Aux';

const orderSummary = ( props ) => {
    const quantity = Object.keys(props.tireQuantity)
        .map( tqKey => {
            return ( 
                <li key={tqKey}>
                    <span style={{textTransform: 'capitalize'}}> { tqKey }: </span> 
                    { props.tireQuantity[tqKey] } 
                </li>
            );
        });

    return (
        <Aux>
            <h3> INVOICE #... </h3>
            <ul>
                {quantity}
            </ul>
            <p>
                Continue to checkout...
            </p>
        </Aux>
    );
};

export default orderSummary;