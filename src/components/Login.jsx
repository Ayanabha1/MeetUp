import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDataLayerValue } from "../Datalayer/DataLayer";
import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";

const Login = () => {
  const logo =
    "https://ik.imagekit.io/Ayanabha1/logo%20-%20Copy.png?updatedAt=1706025236906";
  const [loginData, setLoginData] = useState({});
  const { loginFunc } = useDataLayerValue();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginData((loginData) => ({ ...loginData, [id]: value }));
  };
  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      const res = await loginFunc(loginData);
      console.log(res);
      navigate("/");
    } catch (err) {
      console.log("Error in login ... Try again");
    }
  };

  useEffect(() => {
    document.title = "Login - Meetup";
  }, []);

  return (
    <div className="flex bg-primary w-[100vw] h-[100vh] overflow-hidden justify-center items-center relative ">
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 left-0 pink__gradient_2 " />
      <div className="absolute z-[0] w-[50%] h-[50%] bottom-0 right-0 blue__gradient_2 " />
      <button
        className="hidden absolute left-10 top-10 p-3 pr-6 sm:flex gap-1 items-center bg-[rgba(255,255,255,0.15)] rounded-lg shadow-xl z-50 text-white"
        onClick={() => {
          navigate("/");
        }}
      >
        <ChevronLeft className="h-6 w-6" /> Back
      </button>
      <div className="auth-container z-10 flex flex-col text-white font-poppins w-[75%] ss:w-[60%] md:w-[30%] max-w-[450px] min-w-[300px] ">
        <div className="flex flex-col justify-center items-center">
          <img src={logo} alt="meetup" className="w-[154px] h-[55px] mb-5" />

          <h2 className="font-semibold text-[24px] mb-[5px]">Account Login</h2>
          <span className="text-[rgb(179,180,183)] mb-[10px]">
            Please enter your details
          </span>
        </div>
        <form className="flex flex-col" onSubmit={(e) => handleLoginClick(e)}>
          <label htmlFor="email" className="my-1 mt-5 text-[rgb(179,180,183)]">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => handleChange(e)}
            placeholder="Enter Email id"
            className="p-2 rounded-[5px] mb-4
             bg-[rgb(24,24,35)]"
            required
          />
          <label
            htmlFor="password"
            className="my-1 mt-5 text-[rgb(179,180,183)]"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="******"
            onChange={(e) => handleChange(e)}
            className="p-2 rounded-[5px] mb-4
            bg-[rgb(24,24,35)]"
            required
          />
          <span className="text-[rgb(179,180,183)]">
            Don't have an account?{" "}
            <Link to="/signup" className=" font-semibold text-white underline">
              SignUp
            </Link>
          </span>
          <button
            type="submit"
            className="my-7 btn-blue-gradient p-2 text-[black] font-semibold rounded-[5px] cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
