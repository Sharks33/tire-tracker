import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utilitie';

const initialState = {
    tireQuantity: null,
    totalPrice: 0,
    error: false
};

const TIRE_PRICES = {
    quantity: 50,
};

const addQuantity = ( state, action ) => {
    const updatedQnt = { [action.tireQuantityName]: state.tireQuantity[action.tireQuantityName] + 1 };
    const updatedQuantity = updateObject(state.tireQuantity, updatedQnt);
    const updatedState = {
        tireQuantity: updatedQuantity,
        totalPrice: state.totalPrice + TIRE_PRICES[action.tireQuantityName]
    }
    return updateObject(state, updatedState);
}

const removeQuantity = ( state, action ) => {
    const updatedQntRemove = { [action.tireQuantityName]: state.tireQuantity[action.tireQuantityName] - 1 };
    const updatedQuantityRemove = updateObject(state.tireQuantity, updatedQntRemove);
    const updatedStateRemove = {
        tireQuantity: updatedQuantityRemove,
        totalPrice: state.totalPrice + TIRE_PRICES[action.tireQuantityName]
    }
    return updateObject(state, updatedStateRemove);
}

const setQuantity = ( state, action ) => {
    return updateObject(state, {
        tireQuantity: action.tireQuantity,
        totalPrice: 0,
        error: false
    });
}

const fetchQuantityFailed = ( state, action ) => {
    return updateObject(state, { error: true });
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_QUANTITY: return addQuantity(state, action);
        case actionTypes.REMOVE_QUANTITY: return removeQuantity(state, action);
        case actionTypes.SET_QUANTITY: return setQuantity(state, action);
        case actionTypes.FETCH_QUANTITY_FAILED: return fetchQuantityFailed(state, action);
        default: return state;
    }
};

export default reducer;