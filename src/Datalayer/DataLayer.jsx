import React, { createContext, useContext, useReducer } from "react";
import { resetApiHeaders } from "../Api/Axios";
import { Api } from "../Api/Axios";
import { toast } from "react-toastify";

export const DataLayerContext = createContext();

export const DataLayer = ({ initialState, reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const showSuccess = (message) => {
    toast.success(message, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const showError = (message) => {
    toast.error(message, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const showInfo = (message) => {
    toast.info(message, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const showWarning = (message) => {
    toast.warning(message, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const startLoading = () => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
  };
  const stopLoading = () => {
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  };

  const changeLoginState = (userData, token) => {
    resetApiHeaders(token);
    localStorage.setItem("AUTH_TOKEN", token);
    dispatch({
      type: "SET_USER_DATA",
      userData: userData,
    });
    dispatch({
      type: "SET_LOGIN_STATUS",
      loggedIn: true,
    });
  };

  const logoutFunc = () => {
    resetApiHeaders();
    localStorage.removeItem("AUTH_TOKEN");
    dispatch({
      type: "SET_LOGIN_STATUS",
      loggedIn: false,
    });
    dispatch({
      type: "SET_USER_DATA",
      userData: null,
    });
  };

  const getUser = async (token) => {
    if (token === "" || token === undefined || token === null) {
      return;
    }
    startLoading();
    await Api.get("/auth/get-user")
      .then((res) => {
        const userData = res.data.user;
        changeLoginState(userData, token);
      })
      .catch((err) => {
        stopLoading();
        showError("Session timed out");
        logoutFunc();
      });
    stopLoading();
  };

  const loginFunc = async (data) => {
    startLoading();
    await Api.post("/auth/login", data)
      .then((res) => {
        const token = res.data.token;
        const userData = res.data.user;
        changeLoginState(userData, token);
        console.log(res.data);
        showSuccess("Login successful");
      })
      .catch((err) => {
        stopLoading();
        showError(err?.response?.data?.message);
        throw new Error("Login failed");
      });
    stopLoading();
  };
  const signupFunc = async (data) => {
    startLoading();
    await Api.post("/auth/signup", data)
      .then((res) => {
        const token = res.data.token;
        const userData = res.data.user;
        changeLoginState(userData, token);
        showSuccess("Signup successful");
      })
      .catch((err) => {
        stopLoading();
        showError(err?.response?.data?.message);
        throw new Error("Login failed");
      });
    stopLoading();
  };

  return (
    <DataLayerContext.Provider
      value={{
        state,
        loginFunc,
        signupFunc,
        logoutFunc,
        startLoading,
        stopLoading,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        getUser,
      }}
    >
      {children}
    </DataLayerContext.Provider>
  );
};

export const useDataLayerValue = () => useContext(DataLayerContext);
