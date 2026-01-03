import React, { useState, useEffect, useRef, use } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { toast } from "react-toastify";
import {
  FaBars,
  FaUser,
  FaBoxOpen,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, signOutUser } = use(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const navItemClass = ({ isActive }) =>
    `px-2 py-2 text-base font-medium transition-all duration-200 
     ${
       isActive
         ? "text-emerald-500 border-b-2 border-emerald-500"
         : "text-gray-700 dark:text-gray-200 hover:text-emerald-500"
     }`;

  const links = (
    <>
      <li onClick={() => setMenuOpen(false)}>
        <NavLink to="/" className={navItemClass}>
          Home
        </NavLink>
      </li>

      <li onClick={() => setMenuOpen(false)}>
        <NavLink to="/allProducts" className={navItemClass}>
          Products
        </NavLink>
      </li>

      <li onClick={() => setMenuOpen(false)}>
        <NavLink to="/about-us" className={navItemClass}>
          About
        </NavLink>
      </li>

      <li onClick={() => setMenuOpen(false)}>
        <NavLink to="/contact-us" className={navItemClass}>
          Contact
        </NavLink>
      </li>

      {user && (
        <>
          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/myImports" className={navItemClass}>
              My Imports
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              <FaBars size={20} />
            </button>

            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-wide text-gray-800 dark:text-white">
                Exim<span className="text-emerald-500">Flow</span>
              </span>
            </Link>
          </div>

          <ul className="hidden lg:flex items-center gap-6">{links}</ul>

          <div className="flex items-center gap-3">
            {user ? (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-emerald-500 overflow-hidden hover:ring-2 hover:ring-emerald-500 transition"
                >
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co.com/fGMNLM9Z/Sample-User-Icon.png"
                    }
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-b-2xl bg-white dark:bg-gray-800 shadow-xl border-0 dark:border-gray-700 overflow-hidden">
                    {/* User Info */}
                    <div className="px-4 py-4 border-b dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu */}
                    <ul className="py-2">
                      <li>
                        <NavLink
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 text-sm transition
                          ${
                            isActive
                              ? "text-emerald-500 bg-emerald-100 dark:bg-emerald-900 font-semibold rounded-md"
                              : "text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-700"
                          }`
                          }
                        >
                          <FaUser className="text-emerald-500" />
                          Profile
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/myExports"
                          onClick={() => setDropdownOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 text-sm transition
                          ${
                            isActive
                              ? "text-emerald-500 bg-emerald-100 dark:bg-emerald-900 font-semibold rounded-md"
                              : "text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-700"
                          }`
                          }
                        >
                          <FaUser className="text-emerald-500" />
                          My Products
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/addProduct"
                          onClick={() => setDropdownOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 text-sm transition
                          ${
                            isActive
                              ? "text-emerald-500 bg-emerald-100 dark:bg-emerald-900 font-semibold rounded-md"
                              : "text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-700"
                          }`
                          }
                        >
                          <FaUser className="text-emerald-500" />
                          Add Product
                        </NavLink>
                      </li>
                    </ul>

                    {/* Logout */}
                    <div className="border-t dark:border-gray-700">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 transition"
                      >
                        <FaSignOutAlt className="text-red-600" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-8 py-2 rounded-full
                bg-emerald-500 text-white font-semibold
                hover:bg-emerald-600
                transition transform hover:scale-105
                shadow-lg"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <ul
          ref={menuRef}
          className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-md px-4 py-4 space-y-2"
        >
          {links}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
