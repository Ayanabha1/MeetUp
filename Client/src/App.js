import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import { Backdrop, CircularProgress } from "@mui/material";
import { LoginModal, SignUpModal } from "./Components/Modals/LoginSignupModal";
import { useDataLayerValue } from "./Datalayer/DataLayer";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import Panel from "./Components/Panel/Panel";

function App() {
  const loginModalStyle = {};
  const [
    {
      loginModalOpen,
      signUpModalOpen,
      loggedIn,
      googleLoggedIn,
      loading,
      user,
    },
    dispatch,
  ] = useDataLayerValue();

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });

  useEffect(() => {
    if (loggedIn === false && googleLoggedIn === false) {
      const src = "https://accounts.google.com/gsi/client";
      const id =
        "795383774862-6spm3aje429bn41um8g4jvv255rik809.apps.googleusercontent.com";

      loadScript(src)
        .then(() => {
          /*global google*/
          if (!(loggedIn || googleLoggedIn)) {
            google.accounts.id.prompt();
          }
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn, googleLoggedIn]);

  useEffect(() => {
    initialLogin();
  }, []);

  const initialLogin = () => {
    const auth_token = localStorage.getItem("AUTH_TOKEN");
    if (auth_token) {
      const userObject = jwt_decode(auth_token);
      console.log(userObject);
      if (userObject.data) {
        dispatch({
          type: "SET_USER_DETAILS",
          user: userObject.data,
        });
        dispatch({
          type: "SET_LOGIN_STATUS",
          loggedIn: true,
        });
      } else if (userObject) {
        dispatch({
          type: "SET_USER_DETAILS",
          user: userObject,
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
    }
  };

  return (
    <div className="App">
      <div className="dock">
        <div className="dock-container">
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/conference/:id" element={<Panel />} />
            </Routes>
          </Router>

          {/* Login modal */}
          <LoginModal />
          <SignUpModal />
          <Backdrop
            sx={{ color: "#fff" }}
            open={loginModalOpen || signUpModalOpen}
            onClick={() => {
              dispatch({
                type: "SET_LOGIN_MODAL_OPEN",
                loginModalOpen: false,
              });
              dispatch({
                type: "SET_SIGNUP_MODAL_OPEN",
                signUpModalOpen: false,
              });
            }}
          ></Backdrop>

          {/* Loading spinner */}
          <Backdrop sx={{ color: "#fff" }} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </div>
    </div>
  );
}

export default App;
