import React, { useState, useEffect, useRef, use } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { FaGlobe, FaBars } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, signOutUser } = use(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef();
  const dropdownRef = useRef();

  /* ------------------ Outside Click Close ------------------ */
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

  /* ------------------ Nav Links ------------------ */
  const navItemClass = ({ isActive }) =>
    `px-3 py-2 text-base font-medium transition-all duration-200 
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
          All Products
        </NavLink>
      </li>

      {user && (
        <>
          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/myExports" className={navItemClass}>
              My Exports
            </NavLink>
          </li>

          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/myImports" className={navItemClass}>
              My Imports
            </NavLink>
          </li>

          <li onClick={() => setMenuOpen(false)}>
            <NavLink to="/addProduct" className={navItemClass}>
              Add Export
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
          {/* ---------------- Logo ---------------- */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              <FaBars size={20} />
            </button>

            <Link to="/" className="flex items-center gap-2">
              <FaGlobe className="text-emerald-500 text-2xl" />
              <span className="text-2xl font-extrabold tracking-wide text-gray-800 dark:text-white">
                Exim<span className="text-emerald-500">Flow</span>
              </span>
            </Link>
          </div>

          {/* ---------------- Desktop Menu ---------------- */}
          <ul className="hidden lg:flex items-center gap-6">{links}</ul>

          {/* ---------------- Right Side ---------------- */}
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
                  <div className="absolute right-0 mt-3 w-52 rounded-xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
                    <p className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">
                      {user.displayName || "User"}
                    </p>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-500/90 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- Mobile Menu ---------------- */}
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
