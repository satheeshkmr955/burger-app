import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENT,
  FETCH_INGREDIENTS_FAILED
} from "../actions/actionTypes";
import { updateObj } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 5,
  loading: false,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.5,
  meat: 1.5,
  bacon: 1.3
};

const addIngredient = (state, action) => {
  const { payload } = action;
  const updatedIngredient = {
    [payload.ingredientName]: state.ingredients[payload.ingredientName] + 1
  };
  const updatedIngredients = updateObj(state.ingredients, updatedIngredient);
  return updateObj(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[payload.ingredientName]
  });
};

const removeIngredient = (state, action) => {
  const { payload } = action;
  const updatedIngredient = {
    [payload.ingredientName]: state.ingredients[payload.ingredientName] - 1
  };
  const updatedIngredients = updateObj(state.ingredients, updatedIngredient);
  return updateObj(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[payload.ingredientName]
  });
};

const setIngredient = (state, action) => {
  const { payload } = action;
  return updateObj(state, {
    ingredients: {
      salad: payload.ingredients.salad,
      cheese: payload.ingredients.cheese,
      bacon: payload.ingredients.bacon,
      meat: payload.ingredients.meat
    },
    totalPrice: initialState.totalPrice,
    error: false
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObj(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return addIngredient(state, action);
    case REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case SET_INGREDIENT:
      return setIngredient(state, action);
    case FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
