import React, { useState } from "react";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";  

const Register = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirm: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted: " + JSON.stringify(form, null, 2));
  };

  return (
    <div className="flex text-white h-[885px]">
      {/* Left visual */}
      <div className="hidden md:flex w-1/2 items-end justify-center">
        <img
          src="/pic1.png"
          alt="Cinema Robot"
          className="w-[90%] max-w-[650px] max-h-[90%] drop-shadow-2xl rounded-xl"
        />
      </div>

      {/* Right form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-center">Create Account</h2>
          <p className="text-center text-gray-300 mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300 font-semibold text-2xl md:text-3xl lg:text-4xl">
              TIDWAEN CINEMA
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              placeholder="First name"
              className="w-full px-4 py-3 rounded-full bg-gray-900 text-white 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 
                         transition duration-300 ease-in-out focus:scale-105"
              required
            />
            <input
              type="text"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              placeholder="Last name"
              className="w-full px-4 py-3 rounded-full bg-gray-900 text-white 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 
                         transition duration-300 ease-in-out focus:scale-105"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-full bg-gray-900 text-white 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         transition duration-300 ease-in-out focus:scale-105"
              required
            />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-full bg-gray-900 text-white 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         transition duration-300 ease-in-out focus:scale-105"
              required
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-full bg-gray-900 text-white 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 
                         transition duration-300 ease-in-out focus:scale-105"
              required
              minLength={6}
            />
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full px-4 py-3 rounded-full bg-gray-900 text-white 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 
                         transition duration-300 ease-in-out focus:scale-105"
              required
            />

            <label className="flex items-center gap-3 text-sm text-gray-300">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="accent-purple-600"
                required
              />
              I agree to the Terms & Privacy Policy
            </label>

            <button
              type="submit"
              className="w-full py-3 rounded-full font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition"
              disabled={!form.agree || form.password !== form.confirm}
              title={
                form.password !== form.confirm
                  ? "Passwords do not match"
                  : undefined
              }
            >
              Create account
            </button>
          </form>

          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-gray-300 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          <div className="flex gap-6 justify-center">
            <button className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-lg shadow hover:scale-105 transition">
              <FcGoogle size={22} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-lg shadow hover:scale-105 transition">
              <FaApple size={24} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-white text-blue-600 rounded-lg shadow hover:scale-105 transition">
              <FaFacebookF size={22} />
            </button>
          </div>

          <p className="text-center text-sm text-gray-300 mt-6">
            Already have an account?{" "}
            <a href="/login" className="underline decoration-purple-500">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;