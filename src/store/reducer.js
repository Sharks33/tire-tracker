import * as actionTypes from './actions';

const initialState = {
    tireQuantity: {
        quantity: 0,
    },
    totalPrice: 0,
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_QUANTITY:
            return {
                ...state,
                tireQuantity: {
                    ...state.tireQuantity,
                    [action.tireQuantityName]: state.tireQuantity[action.tireQuantityName] + 1
                }
            };
        case actionTypes.REMOVE_QUANTITY:
            return {
                ...state,
                tireQuantity: {
                    ...state.tireQuantity,
                    [action.tireQuantityName]: state.tireQuantity[action.tireQuantityName] - 1
                }
            };
        default:
            return state;
    }
};

export default reducer;