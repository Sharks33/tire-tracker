import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Tire from '../../components/Tire/Tire';
import BuildControls from '../../components/Tire/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Tire/OrderSummary/OrderSummary';

const TIRE_PRICES = {
    quantity: 50,
};

class TireTracker extends Component {
    state = {
        tireQuantity: {
            quantity: 0,
        },

        tire: {
            size: null,
            brand: null,
            in_stock: null
        },

        totalPrice: 0,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState ( tireQuantity ) {
        const sum = Object.keys(tireQuantity)
            .map( tqKey => {
                return tireQuantity[tqKey];
            })
            .reduce( (sum, el) => {
                return sum + el;
            }, 0);
        console.log("SUM", sum);
        this.setState( { purchasable: sum > 0 } );
    }

    addQuantityHandler = ( type ) => {
        const oldQunatity = this.state.tireQuantity[type];
        const newQuantity = oldQunatity + 1;
        const updatedQuantity = {
            ...this.state.tireQuantity
        };
        updatedQuantity[type] = newQuantity;

        const priceAddition = TIRE_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState( { totalPrice: newPrice, tireQuantity: updatedQuantity } );
        this.updatePurchaseState( updatedQuantity );
    }

    removeQuantityHandler = ( type ) => {
        const oldQunatity = this.state.tireQuantity[type];
        if ( oldQunatity <= 0 ) {
            return;
        }
        const newQuantity = oldQunatity - 1;
        const updatedQuantity = {
            ...this.state.tireQuantity
        };
        updatedQuantity[type] = newQuantity;

        const priceDeduction = TIRE_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState( { totalPrice: newPrice, tireQuantity: updatedQuantity } );
        this.updatePurchaseState( updatedQuantity );
    }

    purchaseHandler = () => {
        this.setState( { purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        alert('You continue');
    }

    render () {
        const disabledInfo = {
            ...this.state.tireQuantity
        }

        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    <OrderSummary 
                        tireQuantity={this.state.tireQuantity}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice} />
                </Modal>

                <Tire tireQuantity={this.state.tireQuantity}/>

                <BuildControls 
                    quantityAdded={this.addQuantityHandler}
                    quantityRemoved={this.removeQuantityHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    orderReady={this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Aux>
        );
    }
};

export default TireTracker;