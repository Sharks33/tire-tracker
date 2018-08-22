import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseTireSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.PURCHASE_TIRE_SUCCESS,
        orderID: id,
        orderData: orderData
    };
}

export const purchaseTireFail = ( error ) => {
    return {
        type: actionTypes.PURCHASE_TIRE_FAIL,
        error: error
    };
}

export const purchaseTireStart = () => {
    return {
        type: actionTypes.PURCHASE_TIRE_START
    }
}

export const purchaseTire = ( orderData ) => {
    return dispatch => {
        dispatch(purchaseTireStart());
        axios.post('/orders.json', orderData)
            .then( response => {
                console.log(response.data);
                dispatch( purchaseTireSuccess( response.data.name, orderData ) );
            })
            .catch( error => {
                dispatch( purchaseTireFail( error ) );
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}