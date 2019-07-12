import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_HEADERS,
  SAVE_MOCK_EMAIL
} from "../types";

export default (state, action) => {
  // console.log({ ...state.headers, ...action.payload });
  switch (action.type) {
    case SET_HEADERS:
      return {
        ...state,
        headers: { ...state.headers, ...action.payload }
      };
    case SAVE_MOCK_EMAIL:
      return {
        ...state,
        email: action.payload.email
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        userInfo: action.payload
      };
    case LOGIN_SUCCESS:
      // console.log(action.payload);
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGOUT:
      // localStorage.removeItem("token");
      return {
        ...state,
        // token: null,
        isAuthenticated: false,
        loading: false
        // user: null
        // error: action.payload
      };
    /* case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }; */
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
};
