import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Tire from '../../components/Tire/Tire';
import BuildControls from '../../components/Tire/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Tire/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const date = new Date();
const month = date.getMonth();
const day = date.getDate();
const year = date.getFullYear();
const hour = date.getHours();
const minute = date.getMinutes();

class TireTracker extends Component {
    state = {
        
        customer: {
            firstname: null,
            lastname: null,
            email: null,
            phone: null
        },
        address: {
            street: null,
            city: null,
            state: null,
            zip: null
        },
        vehicle: {
            make: null,
            model: null,
            year: null,
            plate: null,
            vin: null
        },
        
        month: month,
        day: day,
        year: year,
        hour: hour,
        minute: minute,
        
        purchasing: false,
    }

    componentDidMount () {
        this.props.onInitQuantity( this.props.token );
    }

    updatePurchaseState ( tireQuantity ) {
        const sum = Object.keys(tireQuantity)
            .map( tqKey => {
                return tireQuantity[tqKey];
            })
            .reduce( (sum, el) => {
                return sum + el;
            }, 0);
        // console.log("SUM", sum);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState( { purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }



    

    customerFirstNameHandler = (event) => {
        this.setState({
            customer: Object.assign({}, this.state.customer, {firstname: event.target.value})
        });
    }
    customerLastNameHandler = (event) => {
        this.setState({
            customer: Object.assign({}, this.state.customer, {lastname: event.target.value})
        });
    }
    customerEmailHandler = (event) => {
        this.setState({
            customer: Object.assign({}, this.state.customer, {email: event.target.value})
        });
    }
    customerPhoneHandler = (event) => {
        this.setState({
            customer: Object.assign({}, this.state.customer, {phone: event.target.value})
        });
    }


    addressStreetHandler = (event) => {
        this.setState({
            address: Object.assign({}, this.state.address, {street: event.target.value})
        });
    }
    addressCityHandler = (event) => {
        this.setState({
            address: Object.assign({}, this.state.address, {city: event.target.value})
        });
    }
    addressStateHandler = (event) => {
        this.setState({
            address: Object.assign({}, this.state.address, {state: event.target.value})
        });
    }
    addressZipHandler = (event) => {
        this.setState({
            address: Object.assign({}, this.state.address, {zip: event.target.value})
        });
    }


    vehicleMakeHandler = (event) => {
        this.setState({
            vehicle: Object.assign({}, this.state.vehicle, {make: event.target.value})
        });
    }
    vehicleModelHandler = (event) => {
        this.setState({
            vehicle: Object.assign({}, this.state.vehicle, {model: event.target.value})
        });
    }
    vehicleYearHandler = (event) => {
        this.setState({
            vehicle: Object.assign({}, this.state.vehicle, {year: event.target.value})
        });
    }
    vehiclePlateHandler = (event) => {
        this.setState({
            vehicle: Object.assign({}, this.state.vehicle, {plate: event.target.value})
        });
    }
    vehicleVinHandler = (event) => {
        this.setState({
            vehicle: Object.assign({}, this.state.vehicle, {vin: event.target.value})
        });
    }

    render () {
        
        
        const disabledInfo = {
            ...this.props.qnt
        }

        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        // let customerInfo = <CustomerInfo 
        //     customerInfoUpdate={this.customerInfoHandler} />


        let tire = this.props.error ? <p>Tires can't be loaded...</p> : <Spinner />

        if ( this.props.qnt ) {
            tire = (<Aux>
                    <Tire tireQuantity={this.props.qnt}/>
                    <BuildControls 
                        quantityAdded={this.props.onQuantityAdded}
                        quantityRemoved={this.props.onQuantityRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.qnt)}
                        orderReady={this.purchaseHandler}
                        price={this.props.price}/>
                </Aux>);

            orderSummary = <OrderSummary 
                tireQuantity={this.props.qnt}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                customerFirstNameUpdate={this.customerFirstNameHandler}
                customerLastNameUpdate={this.customerLastNameHandler}
                customerEmailUpdate={this.customerEmailHandler}
                customerPhoneUpdate={this.customerPhoneHandler}
                addressStreetUpdate={this.addressStreetHandler}
                addressCityUpdate={this.addressCityHandler}
                addressStateUpdate={this.addressStateHandler}
                addressZipUpdate={this.addressZipHandler}
                vehicleMakeUpdate={this.vehicleMakeHandler}
                vehicleModelUpdate={this.vehicleModelHandler}
                vehicleYearUpdate={this.vehicleYearHandler}
                vehiclePlateUpdate={this.vehiclePlateHandler}
                vehicleVinUpdate={this.vehicleVinHandler}
                month={this.state.month}
                day={this.state.day}
                year={this.state.year}
                hour={this.state.hour}
                minute={this.state.minute}
                price={this.props.price} />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>

                {tire}
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        qnt: state.tireTracker.tireQuantity,
        price: state.tireTracker.totalPrice,
        error: state.tireTracker.error,
        token: state.auth.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onQuantityAdded: ( qntName ) => dispatch(actions.addQuantity(qntName)),
        onQuantityRemoved: ( qntName ) => dispatch(actions.removeQuantity(qntName)),
        onInitQuantity: ( token ) => dispatch(actions.initQuantity( token )),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(TireTracker, axios));