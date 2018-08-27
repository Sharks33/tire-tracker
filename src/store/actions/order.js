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

export const fetchOrderSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = ( token ) => {
    return dispatch => {
        dispatch( fetchOrderStart() );
        axios.get( 'orders.json?auth=' + token )
        .then( res => {
            const fetchedOrders = [];
            for ( let key in res.data ) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch( fetchOrderSuccess( fetchedOrders ) );
        })
        .catch( err => {
            dispatch( fetchOrderFail( err ) );
        });
    }
}