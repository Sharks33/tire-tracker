import React from 'react';

import Tire from '../../Tire/Tire';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = ( props ) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>
                Please confirm order details!
            </h1>
            
            <div style={{width: '100%', height: '350px', margin: 'auto'}}>
                <Tire tireQuantity={props.tireQuantity}/>
            </div>

            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;