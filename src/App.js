import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeDock from "./components/HomeDock";
import MeetingPage from "./components/MeetingPage";
import Login from "./components/Login";
import Signup from "./components/signup";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeDock />} />
        <Route path="/meet" element={<MeetingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
