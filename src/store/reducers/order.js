import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,

}

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.PURCHASE_TIRE_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_TIRE_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderID
            };
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_TIRE_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    };
}

export default reducer;