import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Tire from '../../components/Tire/Tire';
import BuildControls from '../../components/Tire/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Tire/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const TIRE_PRICES = {
    quantity: 50,
};

const date = new Date();
const month = date.getMonth();
const day = date.getDate();
const year = date.getFullYear();
const hour = date.getHours();
const minute = date.getMinutes();

class TireTracker extends Component {
    state = {
        tireQuantity: {
            quantity: 0,
        },


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
        
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react-tire-tracker.firebaseio.com/tires.json')
        .then(response => {
            this.setState( { tires: response.data } );
        })
        .catch(error => {
            this.setState( { error: true } );
        });
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
        // alert('You continue');
        this.setState( { loading: true } );
        const order = {
            tireQuantity: this.state.tireQuantity,
            tire: this.state.tire,
            totalPrice: this.state.totalPrice,
            customer: this.state.customer,
            address: this.state.address,
            vehicle: this.state.vehicle,
        }
        axios.post('/orders.json', order)
            .then( response => {
                this.setState( { loading: false, purchasing: false } );
            })
            .catch( error => {
                this.setState( { loading: false, purchasing: false } );
            });
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
            ...this.state.tireQuantity
        }

        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        // let customerInfo = <CustomerInfo 
        //     customerInfoUpdate={this.customerInfoHandler} />


        let tire = this.state.error ? <p>Tires can't be loaded...</p> : <Spinner />

        if ( this.state.tires ) {
            tire = (<Aux>
                    <Tire tireQuantity={this.state.tireQuantity}/>
                    <BuildControls 
                        quantityAdded={this.addQuantityHandler}
                        quantityRemoved={this.removeQuantityHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        orderReady={this.purchaseHandler}
                        price={this.state.totalPrice}/>
                </Aux>);

            orderSummary = <OrderSummary 
                tireQuantity={this.state.tireQuantity}
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
                price={this.state.totalPrice} />;
        }

        if ( this.state.loading ) {
            orderSummary = <Spinner />
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

export default withErrorHandler(TireTracker, axios);