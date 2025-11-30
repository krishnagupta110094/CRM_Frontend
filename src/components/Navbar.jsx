import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        CRM
      </Link>

      {/* Desktop (lg only) */}
      <div className="hidden lg:flex items-center justify-center gap-8 flex-1">
        <Link to="/" className="hover:text-blue-600 font-medium">
          Home
        </Link>
        <Link to="/certificate-generator" className="hover:text-blue-600 font-medium">
          Certificate Generator
        </Link>
        <Link to="/about" className="hover:text-blue-600 font-medium">
          About
        </Link>
        <Link to="/contact" className="hover:text-blue-600 font-medium">
          Contact
        </Link>
      </div>

      {/* Desktop Buttons (lg only) */}
      <div className="hidden lg:flex items-center gap-4">
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

      {/* Hamburger Button (visible on sm + md only) */}
      <button
        className="lg:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile + Medium Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-6 flex flex-col gap-4 lg:hidden z-50">
          <Link
            to="/"
            className="font-medium hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/certificate-generator"
            className="font-medium hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Certificate Generator
          </Link>
          <Link
            to="/about"
            className="font-medium hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="font-medium hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 w-full text-center"
            onClick={() => setOpen(false)}
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full text-center"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
