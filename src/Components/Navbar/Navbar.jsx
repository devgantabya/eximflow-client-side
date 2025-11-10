import React, { useState, use, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { FaMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { toast } from "react-toastify";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, signOutUser } = use(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const menuRef = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch {
      toast.error("Logout failed! Try again.");
    }
  };

  const links = (
    <>
      <li onClick={() => setMenuOpen(false)}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 font-medium transition-colors duration-200 ${
              isActive
                ? "text-primary border-b-2"
                : "text-gray-600 hover:text-primary"
            }`
          }
        >
          Home
        </NavLink>
      </li>

      <li onClick={() => setMenuOpen(false)}>
        <NavLink
          to="/allProducts"
          className={({ isActive }) =>
            `px-3 py-2 font-medium transition-colors duration-200 ${
              isActive
                ? "text-primary border-b-2"
                : "text-gray-600 hover:text-primary"
            }`
          }
        >
          All Products
        </NavLink>
      </li>

      {user && (
        <>
          <li onClick={() => setMenuOpen(false)}>
            <NavLink
              to="/myExports"
              className={({ isActive }) =>
                `px-3 py-2 font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-primary border-b-2"
                    : "text-gray-600 hover:text-primary"
                }`
              }
            >
              My Exports
            </NavLink>
          </li>

          <li onClick={() => setMenuOpen(false)}>
            <NavLink
              to="/myImports"
              className={({ isActive }) =>
                `px-3 py-2 font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-primary border-b-2"
                    : "text-gray-600 hover:text-primary"
                }`
              }
            >
              My Imports
            </NavLink>
          </li>

          <li onClick={() => setMenuOpen(false)}>
            <NavLink
              to="/addProduct"
              className={({ isActive }) =>
                `px-3 py-2 font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-primary border-b-2"
                    : "text-gray-600 hover:text-primary"
                }`
              }
            >
              Add Export
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar container mx-auto px-0">
        <div className="navbar-start">
          <button
            className="lg:hidden btn bg-white border-0 shadow-none hover:bg-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>

          <Link to="/" className="text-3xl font-extrabold tracking-wide">
            Exim<span className="text-primary">Flow</span>
          </Link>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="text-sm menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end space-x-3">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === "light" ? (
              <FaMoon className="text-xl" />
            ) : (
              <GoSun className="text-xl" />
            )}
          </button>

          {user ? (
            <div className="dropdown dropdown-end relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full bg-green-100 border border-primary overflow-hidden">
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co.com/fGMNLM9Z/Sample-User-Icon.png"
                    }
                    alt={user.displayName || "User"}
                  />
                </div>
              </button>

              {dropdownOpen && (
                <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box absolute right-0 mt-3 w-52 p-2 shadow z-50">
                  <li className="font-semibold text-gray-700 px-3 py-2 border-b">
                    {user.displayName || "User"}
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="text-red-600 w-full text-base text-left hover:bg-red-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="btn btn-outline btn-primary btn-sm md:btn-md"
              >
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm md:btn-md">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {menuOpen && (
        <ul
          ref={menuRef}
          className="menu menu-sm bg-white rounded-box p-2 shadow absolute top-full left-0 w-full lg:hidden z-40"
        >
          {links}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
