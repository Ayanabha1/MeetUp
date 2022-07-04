import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import "./modal.css";
import { AiOutlineClose } from "react-icons/ai";
import { useDataLayerValue } from "../../Datalayer/DataLayer";
import GoogleLogin from "react-google-login";
import { Api } from "../../Api/axios";
import { CircularProgress } from "@mui/material";
import { Error, Success } from "../ErrorSuccess/ErrorSuccess";
import jwt_decode from "jwt-decode";

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });

export const LoginModal = () => {
  const [{ loginModalOpen, loggedIn }, dispatch] = useDataLayerValue();
  const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const [succMessage, setSuccMessage] = useState();
  const loginButtonRef = useRef(null);

  const handleCallbackResponse = (res) => {
    let userObject = jwt_decode(res.credential);
    localStorage.setItem("AUTH_TOKEN", res.credential);
    if (userObject) {
      dispatch({
        type: "SET_USER_DETAILS",
        user: userObject,
      });
      dispatch({
        type: "SET_LOGIN_MODAL_OPEN",
        loginModalOpen: false,
      });
      dispatch({
        type: "SET_SIGNUP_MODAL_OPEN",
        signUpModalOpen: false,
      });
      dispatch({
        type: "SET_LOGIN_STATUS",
        loggedIn: true,
      });
      dispatch({
        type: "SET_GOOGLE_LOGGEDIN",
        googleLoggedIn: true,
      });
    }
  };

  useEffect(() => {
    const src = "https://accounts.google.com/gsi/client";
    const id =
      "795383774862-6spm3aje429bn41um8g4jvv255rik809.apps.googleusercontent.com";

    loadScript(src)
      .then(() => {
        /*global google*/
        google.accounts.id.initialize({
          client_id:
            "795383774862-6spm3aje429bn41um8g4jvv255rik809.apps.googleusercontent.com",
          callback: handleCallbackResponse,
        });
        google.accounts.id.renderButton(loginButtonRef.current, {
          theme: "outlined",
          size: "large",
          width: "100%",
        });
      })
      .catch((err) => console.log(err));

    // return () => {
    //   const scriptTag = document.querySelector(`script[src="${src}"]`);
    //   if (scriptTag) document.body.removeChild(scriptTag);
    // };
  }, []);

  const closeModalFunc = () => {
    dispatch({
      type: "SET_LOGIN_MODAL_OPEN",
      loginModalOpen: false,
    });
  };
  const openSignUpModalFunc = () => {
    dispatch({
      type: "SET_LOGIN_MODAL_OPEN",
      loginModalOpen: false,
    });
    dispatch({
      type: "SET_SIGNUP_MODAL_OPEN",
      signUpModalOpen: true,
    });
  };

  const changeLoginCreds = (e) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };
  const loginFunc = async (e) => {
    e.preventDefault();
    setLoading(true);
    await Api.post("/auth/login", loginData)
      .then((res) => {
        localStorage.setItem("AUTH_TOKEN", res.data.token);
        dispatch({
          type: "SET_LOGIN_STATUS",
          loggedIn: true,
        });
        dispatch({
          type: "SET_USER_DETAILS",
          user: res.data.user,
        });
        closeModalFunc();
        setErrMessage();
      })
      .catch((err) => {
        setErrMessage(err?.response?.data?.message);
      });
    setLoading(false);
  };

  return (
    <div
      className={`modal-container ${loginModalOpen && "modal-container-open"}`}
    >
      <div className="modal-closer">
        <button onClick={() => closeModalFunc()}>
          <AiOutlineClose size={18} />
        </button>
      </div>
      <p className="modal-heading">Login to your account</p>

      <form className="modal-inps" onSubmit={(e) => loginFunc(e)}>
        <div id="signInContainer" ref={loginButtonRef}></div>
        <div className="modal-separator">
          <div className="sep"></div>
          <p>or</p>
          <div className="sep"></div>
        </div>
        <TextField
          label="Email id"
          variant="outlined"
          className="modal-inp"
          type="email"
          id="email"
          onChange={(e) => changeLoginCreds(e)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          className="modal-inp"
          type="password"
          id="password"
          inputProps={{ minLength: 6 }}
          onChange={(e) => changeLoginCreds(e)}
          required
        />{" "}
        <Box
          display="flex"
          justifyContent="space-between"
          className="modal-ops"
        >
          <p onClick={() => openSignUpModalFunc()}>Don't have an account?</p>
          <p>Forgot password?</p>
        </Box>
        {errMessage ? (
          <Error message={errMessage} />
        ) : succMessage ? (
          <Success message={errMessage} />
        ) : (
          ""
        )}
        <Button variant="contained" className="modal-inp" type="submit">
          {loading ? (
            <CircularProgress size={22} sx={{ color: "white" }} />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
};

export const SignUpModal = () => {
  const [{ signUpModalOpen }, dispatch] = useDataLayerValue();
  const [newUserData, setNewUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const [succMessage, setSuccMessage] = useState();
  const loginButtonRef = useRef(null);

  const handleCallbackResponse = (res) => {
    let userObject = jwt_decode(res.credential);
    localStorage.setItem("AUTH_TOKEN", res.credential);
    if (userObject) {
      dispatch({
        type: "SET_USER_DETAILS",
        user: userObject,
      });
      dispatch({
        type: "SET_LOGIN_MODAL_OPEN",
        loginModalOpen: false,
      });
      dispatch({
        type: "SET_SIGNUP_MODAL_OPEN",
        signUpModalOpen: false,
      });
      dispatch({
        type: "SET_LOGIN_STATUS",
        loggedIn: true,
      });
      dispatch({
        type: "SET_GOOGLE_LOGGEDIN",
        googleLoggedIn: true,
      });
    }
  };

  useEffect(() => {
    const src = "https://accounts.google.com/gsi/client";
    const id =
      "795383774862-6spm3aje429bn41um8g4jvv255rik809.apps.googleusercontent.com";

    loadScript(src)
      .then(() => {
        /*global google*/
        google.accounts.id.initialize({
          client_id:
            "795383774862-6spm3aje429bn41um8g4jvv255rik809.apps.googleusercontent.com",
          callback: handleCallbackResponse,
        });
        google.accounts.id.renderButton(loginButtonRef.current, {
          theme: "outlined",
          size: "large",
          width: "100%",
        });
      })
      .catch((err) => console.log(err));

    // return () => {
    //   const scriptTag = document.querySelector(`script[src="${src}"]`);
    //   if (scriptTag) document.body.removeChild(scriptTag);
    // };
  }, []);

  const closeModalFunc = () => {
    dispatch({
      type: "SET_SIGNUP_MODAL_OPEN",
      signUpModalOpen: false,
    });
  };
  const openLoginModalFunc = () => {
    dispatch({
      type: "SET_LOGIN_MODAL_OPEN",
      loginModalOpen: true,
    });
    dispatch({
      type: "SET_SIGNUP_MODAL_OPEN",
      loginModalOpen: false,
    });
  };

  const changeUserData = (e) => {
    const { id, value } = e.target;
    setNewUserData({ ...newUserData, [id]: value });
  };

  const signUpFunc = async (e) => {
    e.preventDefault();
    if (newUserData.password === newUserData.confirmPassword) {
      setLoading(true);
      const dataToPush = {
        name: newUserData.name,
        email: newUserData.email,
        password: newUserData.password,
      };
      await Api.post("/auth/addUser", dataToPush)
        .then((res) => {
          localStorage.setItem("AUTH_TOKEN", res.data.token);
          dispatch({
            type: "SET_LOGIN_STATUS",
            loggedIn: true,
          });
          dispatch({
            type: "SET_USER_DETAILS",
            user: res.data.user,
          });
          closeModalFunc();
          setErrMessage();
        })
        .catch((err) => {
          setSuccMessage();
          setErrMessage(err?.response?.data?.message);
        });
      setLoading(false);
    } else {
      setSuccMessage();
      setErrMessage("Passwords did not match");
    }
  };

  return (
    <div
      className={`modal-container ${signUpModalOpen && "modal-container-open"}`}
    >
      <div className="modal-closer">
        <button onClick={() => closeModalFunc()}>
          <AiOutlineClose size={18} />
        </button>
      </div>

      <form className="modal-inps" onSubmit={(e) => signUpFunc(e)}>
        <div id="signInContainer" ref={loginButtonRef}></div>
        <div className="modal-separator">
          <div className="sep"></div>
          <p>or</p>
          <div className="sep"></div>
        </div>
        <p className="modal-heading">Create a new account</p>
        <TextField
          label="Name"
          variant="outlined"
          className="modal-inp"
          type="text"
          id="name"
          onChange={(e) => changeUserData(e)}
          required
        />
        <TextField
          label="Email id"
          variant="outlined"
          className="modal-inp"
          type="email"
          id="email"
          onChange={(e) => changeUserData(e)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          className="modal-inp"
          type="password"
          id="password"
          inputProps={{ minLength: 6 }}
          onChange={(e) => changeUserData(e)}
          required
        />{" "}
        <TextField
          label="Confirm Password"
          variant="outlined"
          className="modal-inp"
          type="password"
          id="confirmPassword"
          onChange={(e) => changeUserData(e)}
          inputProps={{ minLength: 6 }}
          required
        />{" "}
        <Box
          display="flex"
          justifyContent="space-between"
          className="modal-ops"
        >
          <p onClick={() => openLoginModalFunc()}>Already have an account?</p>
        </Box>
        {errMessage ? (
          <Error message={errMessage} />
        ) : succMessage ? (
          <Success message={errMessage} />
        ) : (
          ""
        )}
        <Button variant="contained" className="modal-inp" type="submit">
          {loading ? (
            <CircularProgress size={22} sx={{ color: "white" }} />
          ) : (
            "Login"
          )}{" "}
        </Button>
      </form>
    </div>
  );
};
