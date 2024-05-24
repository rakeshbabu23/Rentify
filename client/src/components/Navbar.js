// Navbar.js
import React from "react";
import { useDispatch } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa"; // Importing an icon
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">Rentify</div>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center"
        onClick={handleLogout}
      >
        <FaSignOutAlt size={20} className="mr-2" /> Logout
      </button>
    </nav>
  );
};

export default Navbar;
