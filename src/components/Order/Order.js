import React from 'react';

import classes from './Order.css';

const order = ( props ) => {
    const tireQuantity = [];

    for ( let quant in props.tireQuantity ) {
        tireQuantity.push({
            name: quant,
            amount: props.tireQuantity[quant]
        });
    }

    const quantityOutput = tireQuantity.map( tq => {
        return <span style={{textTransform: 'capitalize'}} key={tq.name}>{tq.name}: <strong>{tq.amount}</strong></span>;
    })

    return (
        <div className={classes.Order}>
            <p>{quantityOutput}</p>
            <p>Price: <strong>${ Number.parseFloat(props.price).toFixed(2) }</strong></p>
        </div>
    );
};

export default order;