import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENT,
  FETCH_INGREDIENTS_FAILED
} from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = ingredientName => {
  return { type: ADD_INGREDIENT, payload: { ingredientName } };
};

export const removeIngredient = ingredientName => {
  return { type: REMOVE_INGREDIENT, payload: { ingredientName } };
};

export const setIngredient = ingredients => {
  return { type: SET_INGREDIENT, payload: { ingredients } };
};

export const fetchIngredientsFailed = () => {
  return { type: FETCH_INGREDIENTS_FAILED };
};

export const getIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(res => {
        dispatch(setIngredient(res.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
