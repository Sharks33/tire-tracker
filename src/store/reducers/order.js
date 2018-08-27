import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utilitie';
// import { purchaseTireFail } from '../actions/order';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = ( state, action ) => {
    return updateObject(state, { purchased: false });
};

const purchaseTireStart = ( state, action ) => {
    return updateObject(state, { loading: true });
};

const purchaseTireSuccess = ( state, action ) => {
    const newOrder = updateObject(action.orderData, { id: action.orderID });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
}

const purchaseTireFailed = (state, action) => {
    return updateObject(state, { loading: false });
};

const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, { 
        orders: action.orders,
        loading: false 
    });
}

const fetchOrderFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_TIRE_START: return purchaseTireStart(state, action);
        case actionTypes.PURCHASE_TIRE_SUCCESS: return purchaseTireSuccess(state, action);
        case actionTypes.PURCHASE_TIRE_FAIL: return purchaseTireFailed(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action);
        default: return state;
    }
};

export default reducer;