import { LOGIN, LOGIN_ADMIN } from "../types";

const initialState = {
  accessToken: false,
  data: false,
};

const authReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        data: payload.data,
        accessToken: payload.data.accessToken,
      };

    case LOGIN_ADMIN:
      return {
        ...state,
        data: payload.data,
        accessToken: payload.data.accessToken,
      };

    default:
      return state;
  }
};

export default authReducers;
