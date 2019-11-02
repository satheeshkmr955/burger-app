import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "../actions";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 5
};

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.5,
  meat: 1.5,
  bacon: 1.3
};

const reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [payload.ingredientName]:
            state.ingredients[payload.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[payload.ingredientName]
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [payload.ingredientName]:
            state.ingredients[payload.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[payload.ingredientName]
      };
    default:
      return state;
  }
};

export default reducer;
