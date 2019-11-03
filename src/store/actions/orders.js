import axios from "../../axios-orders";
import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  GET_ORDERS_START,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL
} from "./actionTypes";

export const purchaseBurgerSuccess = (orderId, orderData) => {
  return { type: PURCHASE_BURGER_SUCCESS, payload: { orderId, orderData } };
};

export const purchaseBurgerFail = error => {
  return { type: PURCHASE_BURGER_FAIL, payload: { error } };
};

export const purchaseBurgerStart = () => {
  return { type: PURCHASE_BURGER_START };
};

export const purchaseBurger = orderBody => {
  return async dispatch => {
    await dispatch(purchaseBurgerStart());
    try {
      const orderRes = await axios.post("/orders.json", orderBody);
      console.log(orderRes);
      dispatch(purchaseBurgerSuccess(orderRes.data.name, orderBody));
    } catch (err) {
      dispatch(purchaseBurgerFail(err));
    }
  };
};

export const purchaseInit = () => {
  return { type: PURCHASE_INIT };
};

export const getOrdersSuccess = orders => {
  return { type: GET_ORDERS_SUCCESS, payload: { orders } };
};

export const getOrdersFail = error => {
  return { type: GET_ORDERS_FAIL, payload: { error } };
};

export const getOrdersStart = () => {
  return { type: GET_ORDERS_START };
};

export const getOrders = () => {
  return async dispatch => {
    dispatch(getOrdersStart());
    const fetchedOrders = [];
    try {
      const apiRes = await axios.get("/orders.json");
      const orderDetails = apiRes.data;
      for (const key in orderDetails) {
        fetchedOrders.push({ ...orderDetails[key], id: key });
      }
      dispatch(getOrdersSuccess(fetchedOrders));
    } catch (err) {
      dispatch(getOrdersFail(err));
    }
  };
};
