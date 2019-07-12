import React, { useReducer } from "react";
import PropTypes from "prop-types";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_HEADERS,
  USER_LOADED,
  SAVE_MOCK_EMAIL
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: false, // default was true
    userInfo: null, // user info, no. reports visible, etc.
    email: null,
    // error: null, // handle error
    headers: { "Content-Type": "application/json" }
  };
  // Deconstruct from Use reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login User
  const login = async formData => {
    console.log("login!!");
    const { user, headers } = formData;
    dispatch({
      type: SAVE_MOCK_EMAIL,
      payload: user
    });
    // console.log(form, headers);
    try {
      const res = await fetch("/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { ...headers }
      });
      const freshToken = await res.json();
      // console.log(res);
      // console.log(freshToken);
      if ("accessToken" in freshToken) {
        const { accessToken } = freshToken;
        console.log("we are setting the header");
        dispatch({
          type: SET_HEADERS,
          payload: { Authorization: `Bearer ${accessToken}` }
        });
        dispatch({
          type: LOGIN_SUCCESS,
          payload: freshToken
        });
      } else {
        console.log("accessToken not in freshToken");
      }
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL
      });
    }
  };

  // Load User
  const loadUser = async formData => {
    console.log("loadUser!!");
    // hard-code check jwt && query
    const { email, headers } = formData;
    console.log(email, headers);
    if ("Authorization" in headers) {
      try {
        console.log(email);
        const res = await fetch(
          `/users?email=${email}`, // &password=${form.password}`
          {
            method: "GET",
            headers: { ...headers }
          }
        );
        const userData = await res.json();
        console.log(userData);
        dispatch({
          type: USER_LOADED,
          payload: userData
        });
      } catch (err) {
        console.log("load user error", err);
        // dispatch({ type: AUTH_ERROR });
      }
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  const { children } = props;
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        // error: state.error,
        headers: state.headers,
        userInfo: state.userInfo,
        email: state.email,
        login,
        logout,
        loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthState.propTypes = {
  children: PropTypes.node.isRequired
};
export default AuthState;
