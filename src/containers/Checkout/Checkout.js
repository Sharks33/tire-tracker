import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        tireQuantity: null,
        price: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const tireQuantity = {};
        let price = 0;

        for (let param of query.entries()) {
            // ['quantity', '1']
            if ( param[0] === 'price' ) {
                price = param[1];
            } else {
                tireQuantity[param[0]] = +param[1];
            }
        }
        this.setState({tireQuantity: tireQuantity, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    tireQuantity={this.state.tireQuantity} 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />

                <Route path={this.props.match.path + '/contact-data'} 
                    render={ ( props ) => (<ContactData tireQuantity={this.state.tireQuantity} price={this.state.totalPrice} {...props} />) } />
            </div>
        );
    }
}

export default Checkout;