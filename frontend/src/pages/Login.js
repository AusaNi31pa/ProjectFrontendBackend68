import React from "react";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="flex text-white h-[885px]">
      {/* Left side - Image */}
      <div className="hidden md:flex w-1/2 items-end justify-center">
        <img
          src="/pic1.png"
          alt="Cinema Robot"
          className="w-[90%] max-w-[650px] max-h-[90%] drop-shadow-2xl rounded-xl"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="flex flex-col w-full md:w-1/2 justify-center items-center p-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Welcome To <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300">
            TIDWAEN CINEMA
          </span>
        </h2>

        <div className="w-full max-w-sm space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-full bg-gray-900 text-white 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 
                       transition duration-300 ease-in-out focus:scale-105"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-full bg-gray-900 text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       transition duration-300 ease-in-out focus:scale-105"
          />
          <div className="text-right text-sm text-gray-300 cursor-pointer hover:underline">
            Forget Password
          </div>
          <button className="w-full py-3 rounded-full font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition">
            Login
          </button>
        </div>

        {/* Social login */}
        <div className="flex gap-6 mt-8">
          {/* Google */}
          <button className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow hover:scale-105 transition">
            <FcGoogle size={22} className="text-[#000000]" />
          </button>

          {/* Apple */}
          <button className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow hover:scale-105 transition">
            <FaApple size={24} className="text-black" />
          </button>

          {/* Facebook */}
          <button className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow hover:scale-105 transition">
            <FaFacebookF size={22} className="text-[#1877F2]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
