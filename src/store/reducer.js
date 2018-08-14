import * as actionTypes from './actions';

const initialState = {
    tireQuantity: {
        quantity: 0,
    },
    totalPrice: 0,
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
        default:
            return state;
    }
};

export default reducer;