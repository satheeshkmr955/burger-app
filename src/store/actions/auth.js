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

export const authFail = payload => {
  return { type: AUTH_FAIL, payload };
};

export const auth = payload => {
  return async dispatch => {
    try {
      dispatch(authStart());
      const { email, password, isSignup } = payload;
      const authBody = { email, password, returnSecureToken: true };
      let url = `accounts:signUp?key=${FIREBASE_API_KEY}`;
      if (!isSignup) {
        url = `accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
      }
      const apiRes = await authInstance.post(url, authBody);
      console.log(apiRes);
      const { localId: userId, idToken: token } = apiRes.data;
      dispatch(authSuccess({ userId, token }));
    } catch (err) {
      dispatch(authFail({ error: err.response.data.error }));
    }
  };
};
