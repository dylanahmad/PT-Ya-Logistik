import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // Mengambil status login dari context
import logoYA from "../assets/logo-ya-logistik.webp";
const Navbar = () => {
  const { user } = useAuth();  // Mengambil status user dari context

  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <header className="flex items-center justify-between px-12 py-4 shadow bg-white sticky top-0 z-50">
      <img src={logoYA} alt="YA LOGISTIK" className="h-10 object-contain" />
        <nav className="flex space-x-12 text-[15px] font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/service"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
            }
          >
            Our Service
          </NavLink>
          <NavLink
            to="/complaint"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
            }
          >
            Complaint
          </NavLink>

          {/* Admin Dashboard link hanya ditampilkan jika user adalah admin */}
          {user && user.role === "admin" && (
            <NavLink to="/admin/dashboard" className="text-blue-600 font-semibold">
              Admin Dashboard
            </NavLink>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;