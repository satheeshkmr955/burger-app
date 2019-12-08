import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from "./actionTypes";
import axios from "axios";

import { FIREBASE_API_KEY } from "../../config";

const authInstance = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1"
});

export const authStart = () => {
  return { type: AUTH_START };
};

export const authSuccess = payload => {
  return { type: AUTH_SUCCESS, payload };
};

export const authFail = error => {
  return { type: AUTH_FAIL, error };
};

export const auth = payload => {
  return async dispatch => {
    try {
      dispatch(authStart());
      const authBody = { ...payload, returnSecureToken: true };
      const apiRes = await authInstance.post(
        `accounts:signUp?key=${FIREBASE_API_KEY}`,
        authBody
      );
      console.log(apiRes);
      dispatch(authSuccess(apiRes.data));
    } catch (err) {
      dispatch(authFail(err));
    }
  };
};
