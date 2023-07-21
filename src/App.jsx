import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, lazy, useEffect } from "react";
import Loader from "./components/Loader";
import { useDataLayerValue } from "./Datalayer/DataLayer";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorBoundary";

const HomeDock = lazy(() => import("./components/HomeDock"));
const MeetingPage = lazy(() => import("./components/MeetingPage"));

const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));

const App = () => {
  const { state, getUser } = useDataLayerValue();
  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    getUser(token);
  }, []);
  return (
    <>
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense
            fallback={
              <h1 className="bg-[rgba(0,4,15)] w-[100vw] h-[100vh] overflow-hidden  flex justify-center items-center text-[30px] text-white">
                Loading...
              </h1>
            }
          >
            <Routes>
              <Route exact path="/" element={<HomeDock />} />

              <Route path="/meet/:roomId" element={<MeetingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
      <ToastContainer />
      {state.loading && <Loader />}
    </>
  );
};

export default App;
