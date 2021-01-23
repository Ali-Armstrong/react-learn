import * as actionTypes from './actions';

const initialState = {
    ingredients : {
        salad : 0,
        bacon : 0,
        cheese : 0,
        meat : 0
    },
    totalPrice : 3
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT : 
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredName] : state.ingredients[action.ingredName]+1
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredName]
            }
        case actionTypes.REMOVE_INGREDIENT : 
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredName] : state.ingredients[action.ingredName]-1
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredName]

            }
        default:
            return state;
    }
};

export default reducer;