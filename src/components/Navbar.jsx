import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center">
      {/* Logo - Left */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        CRM
      </Link>

      {/* Center Links */}
      <div className="flex-1 flex items-center justify-center gap-8">
        <Link to="/" className="hover:text-blue-600 font-medium">
          Home
        </Link>
        <Link to="/about" className="hover:text-blue-600 font-medium">
          About
        </Link>
        <Link to="/contact" className="hover:text-blue-600 font-medium">
          Contact
        </Link>
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-4">
        <Link
          to="/signup"
          className="px-4 py-1 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
        >
          Signup
        </Link>
        <Link
          to="/login"
          className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
