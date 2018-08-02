import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

class OrderSummary extends Component {

    state = {
        fields: {},
        errors: {}
    }

    componentWillUpdate() {
        console.log('[OrderSummary] will update');
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["name"]){
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if(typeof fields["name"] !== "undefined"){
            if(!fields["name"].match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["name"] = "Only letters";
            }        
        }

        //Email
        if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }  

       this.setState({errors: errors});
       return formIsValid;
    }

    contactSubmit(e){
        e.preventDefault();

        if(this.handleValidation()){
           alert("Form submitted");
        }else{
           alert("Form has errors.")
        }

    }

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
    
    render () {
        const quantity = Object.keys(this.props.tireQuantity)
        .map( tqKey => {
            return ( 
                <li key={tqKey}>
                    <span style={{textTransform: 'capitalize'}}> { tqKey }: </span> 
                    { this.props.tireQuantity[tqKey] } 
                </li>
            );
        });

        return (
            <Aux>
                <form>
                <div className={classes.OrderSummary}>
                <h3> 
                    <div>
                        <span>INVOICE #... </span>
                    </div>
                    <div> 
                        <span>DATE: {this.props.month}/{this.props.day}/{this.props.year}</span>
                    </div>
                    <div> 
                        <span>TIME: {this.props.hour}:{this.props.minute}</span>
                    </div>
                    <div> 
                        <span>EMPLOYEE: Temp</span>
                    </div>
                </h3>

                <h4> Customer Information </h4>

                <div>
                    <input required type="text" name="firstname" value={this.props.firstname} placeholder="First Name" onChange={this.props.customerFirstNameUpdate}/>
                    <input required type="text" name="lastname" value={this.props.lastname} placeholder="Last Name" onChange={this.props.customerLastNameUpdate}/>
                    <input required type="email" name="email" value={this.props.email} placeholder="Email" onChange={this.props.customerEmailUpdate}/>
                    <input required type="tel" name="phone" value={this.props.phone} placeholder="Phone" onChange={this.props.customerPhoneUpdate}/>
                </div>

                <h4> Address </h4>

                <div>
                    <input required type="text" name="street" value={this.props.street} placeholder="Street" onChange={this.props.addressStreetUpdate}/>
                    <input required type="text" name="city" value={this.props.city} placeholder="City" onChange={this.props.addressCityUpdate}/>
                    <input required type="text" name="state" value={this.props.state} placeholder="State" onChange={this.props.addressStateUpdate}/>
                    <input required type="number" name="zip" value={this.props.zip} placeholder="Zip Code" onChange={this.props.addressZipUpdate}/>
                </div>

                <h4> Vehicle </h4>

                <div>
                    <input required type="text" name="make" value={this.props.street} placeholder="Make" onChange={this.props.vehicleMakeUpdate}/>
                    <input required type="text" name="model" value={this.props.city} placeholder="Model" onChange={this.props.vehicleModelUpdate}/>
                    <input required type="number" name="year" value={this.props.state} placeholder="Year" onChange={this.props.vehicleYearUpdate}/>
                    <input required type="text" name="plate" value={this.props.zip} placeholder="Plate" onChange={this.props.vehiclePlateUpdate}/>
                </div>

                <div style={{display: 'inline'}}>
                    <input required type="text" name="vin" value={this.props.street} placeholder="Vin" onChange={this.props.vehicleVinUpdate}/>
                </div>
                {/* <textarea placeholder="Notes"></textarea> */}
                

                <ul>
                    {quantity}
                    <li>Price: ${this.props.price.toFixed(2)}</li>
                </ul>

                <p>Continue to checkout...</p>
                
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <input className={classes.Input} value="CONTINUE" type="submit" onClick={this.props.purchaseContinued}/>
                
                </div>
                </form>
            </Aux>
        );
    };
}; 

export default OrderSummary;