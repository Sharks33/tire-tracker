import React, { Component } from 'react';
import axios from 'axios';

import classes from './BuildControl.css';

class BuildControl extends Component {
    state = {
        tires: null,
        error: false,
        valueSize: 1,
        valueBrand: 1,
        dropdownDisabled: true,
        buttonDisabled: true,
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

    componentWillUpdate() {
        console.log('[BuildControl] will update]');
    }
    
    render () {

        let sizeArr = [];
        let brandArr = [];
        let sizeOptions = [];
        let brandOptions = [];

        if ( this.state.tires ) {
            
            Object.keys(this.state.tires).map( (tKey) => {
                return ( 
                    sizeArr.push(this.state.tires[tKey].size)    
                )
            });

            Object.keys(this.state.tires).map( (tKey) => {
                return ( 
                    brandArr.push(this.state.tires[tKey].brand)    
                )
            });

            const uniqArr = (arrArg) => {
                return arrArg.filter((elem, pos, arr) => {
                    return arr.indexOf(elem) === pos;
                });
            }

            let uniqSizeArr = uniqArr(sizeArr);
            let uniqBrandArr = uniqArr(brandArr);
            
            uniqSizeArr.forEach(function (value) {
                sizeOptions.push(<option key={value}>{value}</option>);
            });

            uniqBrandArr.forEach(function (value) {
                brandOptions.push(<option key={value}>{value}</option>);
            });
        }
            
        return (
            <div className={classes.BuildControl}>

                <select value={this.state.valueSize} 
                    onChange={(e) => {this.setState({valueSize: e.target.value, dropdownDisabled: false})}} 
                    className={classes.UserInput}>
                    <option value="1" disabled>Select Size</option>
                    {sizeOptions}
                </select>

                <select value={this.state.valueBrand} 
                    onChange={(e)=>{this.setState({valueBrand: e.target.value, buttonDisabled: false})}} 
                    className={classes.UserInput}
                    disabled={this.state.dropdownDisabled ? "disabled" : ""} >
                    <option value="1" disabled>Select Brand</option>
                    {brandOptions}
                </select>

                <div>
                    <button className={classes.QuantityBtn} 
                        onClick={this.props.removeQuantity} 
                        disabled={this.props.disabled}> 
                        Less 
                    </button>

                    <button className={classes.QuantityBtn} 
                        onClick={this.props.addQuantity} 
                        disabled={this.state.buttonDisabled ? "disabled" : ""}> 
                        More 
                    </button>
                </div>
                
            </div>  
        );
    };
};

export default BuildControl;