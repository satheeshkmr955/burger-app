import {
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  GET_ORDERS_START,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL
} from "../actions/actionTypes";
import { updateObj } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = (state, action) => {
  return updateObj(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const { payload } = action;
  const newOrder = { ...payload.orderData, id: payload.orderId };
  return updateObj(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const purchaseBurgerFail = (state, action) => {
  return updateObj(state, { loading: false });
};

const getOrdersStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const getOrdersSuccess = (state, action) => {
  const { payload } = action;
  return updateObj(state, { orders: payload.orders, loading: false });
};

const getOrdersFail = (state, action) => {
  return updateObj(state, { loading: false });
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_INIT:
      return purchaseInit(state, action);
    case PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case GET_ORDERS_START:
      return getOrdersStart(state, action);
    case GET_ORDERS_SUCCESS:
      return getOrdersSuccess(state, action);
    case GET_ORDERS_FAIL:
      return getOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducers;
