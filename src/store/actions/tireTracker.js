import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addQuantity = (name) => {
    return {
        type: actionTypes.ADD_QUANTITY,
        tireQuantityName: name
    }
};

export const removeQuantity = (name) => {
    return {
        type: actionTypes.REMOVE_QUANTITY,
        tireQuantityName: name
    }
};

export const setQuantity = ( tireQuantity ) => {
    return {
        type: actionTypes.SET_QUANTITY,
        tireQuantity: tireQuantity
    }
}

export const fetchQuantityFailed = () => {
    return {
        type: actionTypes.FETCH_QUANTITY_FAILED
    }
}

export const initQuantity = ( token ) => {
    return dispatch => {
        axios.get( 'https://react-tire-tracker.firebaseio.com/tireQuantity.json?auth=' + token )
        .then(response => {
            dispatch(setQuantity(response.data));
        })
        .catch(error => {
            dispatch(fetchQuantityFailed());
        });
    }
}