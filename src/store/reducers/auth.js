import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from "../actions/actionTypes";
import { updateObj } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: null
};

const authStart = (state, action) => {
  return updateObj(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  const { token, userId } = action.payload;
  return updateObj(state, { error: null, loading: false, token, userId });
};

const authFail = (state, action) => {
  const { error } = action.payload;
  return updateObj(state, { error, loading: false });
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    default:
      return state;
  }
};

export default reducers;
