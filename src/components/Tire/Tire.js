import React from 'react';

import classes from './Tire.css';
import Tires from './Tires/Tires';

const tire = ( props ) => {
    let tireOrder = Object.keys(props.tireQuantity)
        .map( tireKey => {
            return[...Array(props.tireQuantity[tireKey])].map( (_, i) => {
                return <Tires key={tireKey + i} type={tireKey}/>
            });
        })
        .reduce( ( arr, el ) => {
            return arr.concat(el)
        }, [] );

    // console.log(tireOrder);

    if ( tireOrder.length === 0 ) {
        tireOrder = <div>
            <p> Please select tires for purchase... </p>
            </div>
    } else if ( tireOrder.length > 4 ) {
        tireOrder = <div className={classes.NumTires}>
                <img src={require('../../assets/images/tire.png')} alt="tire-logo" />
                <div>:{tireOrder.length} </div>
             </div>
    }

    return (
        <div className={classes.Tire}>
            <Tires type="none"/>
            {tireOrder}
        </div>
    );
};

export default tire;