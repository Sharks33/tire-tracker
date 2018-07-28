import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

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
                <li>Price: ${props.price.toFixed(2)}</li>
            </ul>

            <p>Continue to checkout...</p>
            
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;