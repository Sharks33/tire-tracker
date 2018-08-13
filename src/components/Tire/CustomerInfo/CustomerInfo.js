import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class CustomerInfo extends Component {
    // componentWillUpdate() {
    //     console.log('[CustomerInfo] will update');
    // }
    
    render () {

        return (
            <Aux>
                <h3> Customer Information </h3>

                <input type="text" name="firstname" value={this.props.firstname} inputChanged={this.props.customerInfoUpdate}/>
                <p>FN: {this.props.firstname}</p>

                <p>Continue to Order Summary...</p>
                
                
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <button onClick={this.props.orderReady}>Continue</button>
            </Aux>
        );
    };
}; 

export default CustomerInfo;