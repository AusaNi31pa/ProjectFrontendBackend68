import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {


  const linkBase = "px-3 py-2 rounded-md text-white text-xl hover:bg-blue-700";
  const linkActive = "bg-blue-700";
  return (
    <header className="border-b bg-black ">
      <nav className="container-page flex items-center justify-around h-14">
        <Link to="/" className="font-bold text-xl text-white">
          <img src="/logo.png" alt="logo" className="inline h-8 mr-2 mb-1" />
          TIDWAEN CINEMA
        </Link>
        <div className="flex gap-16">
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
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-full text-white text-lg bg-gradient-to-r from-[#560081] via-[#5335FF] to-[#1091FB] hover:opacity-90 transition">
            <NavLink to="/login">
              Login
            </NavLink>
          </button>
          <button className="px-3 py-1 rounded-full text-white text-lg bg-gradient-to-r from-[#560081] via-[#5335FF] to-[#1091FB] hover:opacity-90 transition">
            <NavLink to="/register">
              Register
            </NavLink>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar