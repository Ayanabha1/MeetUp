import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";

const Login = () => {
  return (
    <div className="flex bg-primary w-[100vw] h-[100vh] overflow-hidden justify-center items-center relative ">
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 left-0 pink__gradient_2 " />
      <div className="absolute z-[0] w-[50%] h-[50%] bottom-0 right-0 blue__gradient_2 " />
      <div className="auth-container z-10 flex flex-col text-white font-poppins w-[75%] ss:w-[60%] md:w-[30%] max-w-[450px] min-w-[300px] ">
        <div className="flex flex-col justify-center items-center">
          <img src={logo} alt="meetup" className="w-[154px] h-[55px] mb-5" />

          <h2 className="font-semibold text-[24px] mb-[5px]">Account Login</h2>
          <span className="text-[rgb(179,180,183)] mb-[10px]">
            Please enter your details
          </span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="my-1 mt-5 text-[rgb(179,180,183)]">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter Email id"
            className="p-2 rounded-[5px] mb-4
             bg-[rgb(24,24,35)]"
          />
          <label
            htmlFor="password"
            className="my-1 mt-5 text-[rgb(179,180,183)]"
          >
            Password
          </label>
          <input
            type="text"
            id="password"
            placeholder="******"
            className="p-2 rounded-[5px] mb-4
             bg-[rgb(24,24,35)]"
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
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
