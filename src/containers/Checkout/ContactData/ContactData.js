import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            firstname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                },
                valid: false,
                touched: false
            },
            lastname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'phone',
                    placeholder: 'Phone'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                },
                valid: false,
                touched: false
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                },
                valid: false,
                touched: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },

        },
        formIsValid: false,




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
        }
    }

    orderHandler = ( event ) => {
        event.preventDefault();

        const formData = {};
        for ( let formElementIdentifier in this.state.orderForm ) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            tireQuantity: this.props.qnt,
            price: this.props.price,
            orderData: formData
            // tire: this.state.tire,
            // customer: this.state.customer,
            // address: this.state.address,
            // vehicle: this.state.vehicle,
        }

        this.props.onOrderTire( order );
    }

    checkValidity = ( value, rules ) => {
        let isValid = true;

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = ( event, inputIdentifier ) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;

        for ( let inputIdentifier in updatedOrderForm ) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        console.log(formIsValid);

        this.setState( { orderForm: updatedOrderForm, formIsValid: formIsValid } );
    }

    render () {
        const formElementArray = [];

        for ( let key in this.state.orderForm ) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                <h4> Customer Information </h4>
                <div>
                    { formElementArray.map( formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    )) }
                    
                    {/* <Input inputtype="input" required type="text" name="firstname" value={this.props.firstname} placeholder="First Name" onChange={this.props.customerFirstNameUpdate}/>
                    <Input inputtype="input" required type="text" name="lastname" value={this.props.lastname} placeholder="Last Name" onChange={this.props.customerLastNameUpdate}/>
                    <Input inputtype="input" required type="email" name="email" value={this.props.email} placeholder="Email" onChange={this.props.customerEmailUpdate}/>
                    <Input inputtype="input" required type="tel" name="phone" value={this.props.phone} placeholder="Phone" onChange={this.props.customerPhoneUpdate}/> */}
                </div>

                <h4> Address </h4>
                <div>
                    <Input inputtype="input" required type="text" name="street" value={this.props.street} placeholder="Street" onChange={this.props.addressStreetUpdate}/>
                    <Input inputtype="input" required type="text" name="city" value={this.props.city} placeholder="City" onChange={this.props.addressCityUpdate}/>
                    <Input inputtype="input" required type="text" name="state" value={this.props.state} placeholder="State" onChange={this.props.addressStateUpdate}/>
                    <Input inputtype="input" required type="number" name="zip" value={this.props.zip} placeholder="Zip Code" onChange={this.props.addressZipUpdate}/>
                </div>

                <h4> Vehicle </h4>
                <div>
                    <Input inputtype="input" required type="text" name="make" value={this.props.street} placeholder="Make" onChange={this.props.vehicleMakeUpdate}/>
                    <Input inputtype="input" required type="text" name="model" value={this.props.city} placeholder="Model" onChange={this.props.vehicleModelUpdate}/>
                    <Input inputtype="input" required type="number" name="year" value={this.props.state} placeholder="Year" onChange={this.props.vehicleYearUpdate}/>
                    <Input inputtype="input" required type="text" name="plate" value={this.props.zip} placeholder="Plate" onChange={this.props.vehiclePlateUpdate}/>
                </div>
                <div style={{display: 'inline'}}>
                    <Input inputtype="input" required type="text" name="vin" value={this.props.street} placeholder="Vin" onChange={this.props.vehicleVinUpdate}/>
                </div>
                
                <p>Continue to checkout...</p>
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>CONTINUE</Button>
            </form>
        );

        if ( this.props.loading ) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onOrderTire: ( orderData ) => dispatch( actions.purchaseTire( orderData ) )
    };
}

const mapStateToProps = state => {
    return {
        qnt: state.tireTracker.tireQuantity,
        price: state.tireTracker.totalPrice,
        loading: state.order.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));