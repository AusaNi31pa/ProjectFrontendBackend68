import { NavLink, Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";

const Navbar = () => {


  const linkBase = "px-3 py-2 text-white text-xl hover:text-purple-400 transition";
  const linkActive = "text-purple-400 font-semibold";
  return (
    <header>
      <nav className="container-page flex items-center justify-around h-14 px-6">
        <Link to="/" className="font-bold text-xl text-white flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-8" />
          TIDWAEN CINEMA
        </Link>
        <div className="flex gap-10">
          <NavLink to="/" end className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : ""}`
          }>
            Home
          </NavLink>
          <NavLink to="/movie" className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : ""}`
          }>
            Movie
          </NavLink>
          <NavLink to="/cinema" className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : ""}`
          }>
            Cinema
          </NavLink>
          <NavLink to="/booking" className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : ""}`
          }>
            Booking
          </NavLink>
          <NavLink to="/history" className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : ""}`
          }>
            History
          </NavLink>
        </div>
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <Link to="/search" className="text-white text-xl hover:text-purple-400 transition">
            <FiSearch />
          </Link>
          {/* Language Button */}
          <button className="px-2 py-1 border border-gray-400 text-sm text-white rounded">
            TH
          </button>
          {/* Register */}
          <button className="px-4 py-1 rounded-full text-white text-sm bg-gradient-to-r from-[#560081] via-[#5335FF] to-[#1091FB] hover:opacity-90 transition">
            <NavLink to="/register">
              Register
            </NavLink>
          </button>
          {/* Login */}
          <button className="px-4 py-1 rounded-full text-white text-sm bg-gradient-to-r from-[#560081] via-[#5335FF] to-[#1091FB] hover:opacity-90 transition">
            <NavLink to="/login">
              Login
            </NavLink>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar