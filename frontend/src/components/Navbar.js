import { NavLink, Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // เคลียร์ token + อัปเดต state
    navigate("/login"); // ✅ เด้งไปหน้า Login ทันที
  };

  const linkBase = "px-3 py-2 text-white text-xl hover:text-purple-400 transition";
  const linkActive = "text-purple-400 font-semibold border-b-2 border-purple-400";

  return (
    <header>
      <nav className="container-page flex items-center justify-around h-14 px-6">
        <Link to="/" className="font-bold text-xl text-white flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-8" />
          TIDWAEN CINEMA
        </Link>

        <div className="flex gap-10">
          <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>Home</NavLink>
          <NavLink to="/cinema" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>Cinema</NavLink>

          {/* ถ้าจะลิงก์ไป booking ที่ต้องใช้ :id จริง ให้ใส่ id จริงตอนสร้างลิงก์ หรือทำเป็นปุ่มจากหน้ารายการ */}
          <NavLink to="/booking/1" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>Booking</NavLink>

          <NavLink to="/history" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>History</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/search" className="text-white text-xl hover:text-purple-400 transition">
            <FiSearch />
          </Link>

          <button className="px-2 py-1 border border-gray-400 text-sm text-white rounded">
            TH
          </button>

          {!isLoggedIn ? (
            <>
              <NavLink to="/register">
                <button className="px-4 py-1 rounded-full text-white text-sm bg-gradient-to-r from-[#560081] via-[#5335FF] to-[#1091FB] hover:opacity-90 transition">
                  Register
                </button>
              </NavLink>
              <NavLink to="/login">
                <button className="px-4 py-1 rounded-full text-white text-sm bg-gradient-to-r from-[#560081] via-[#5335FF] to-[#1091FB] hover:opacity-90 transition">
                  Login
                </button>
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded-full text-white text-sm bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
