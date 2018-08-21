import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tireQuantity: null,
    totalPrice: 0,
    error: false
};

const TIRE_PRICES = {
    quantity: 50,
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_QUANTITY:
            return {
                ...state,
                tireQuantity: {
                    ...state.tireQuantity,
                    [action.tireQuantityName]: state.tireQuantity[action.tireQuantityName] + 1
                },
                totalPrice: state.totalPrice + TIRE_PRICES[action.tireQuantityName]
            };
        case actionTypes.REMOVE_QUANTITY:
            return {
                ...state,
                tireQuantity: {
                    ...state.tireQuantity,
                    [action.tireQuantityName]: state.tireQuantity[action.tireQuantityName] - 1
                },
                totalPrice: state.totalPrice - TIRE_PRICES[action.tireQuantityName]
            };
        case actionTypes.SET_QUANTITY:
            return {
                ...state,
                tireQuantity: action.tireQuantity,
                error: false
            };
        case actionTypes.FETCH_QUANTITY_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;