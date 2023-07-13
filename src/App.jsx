import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeDock from "./components/HomeDock";
import MeetingPage from "./components/MeetingPage";
import Login from "./components/Login";
import Signup from "./components/signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Loader from "./components/Loader";
import { useDataLayerValue } from "./Datalayer/DataLayer";
const App = () => {
  const { state, getUser } = useDataLayerValue();
  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    getUser(token);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomeDock />} />
          <Route path="/meet" element={<MeetingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
      <ToastContainer />
      {state.loading && <Loader />}
    </>
  );
};

export default App;
