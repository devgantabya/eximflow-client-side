import React from "react";
import { FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="text-3xl font-extrabold text-emerald-500 dark:text-emerald-400 flex items-center gap-2"
            >
              EximFlow
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Export • Import • Simplified
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            {["About", "Contact", "Careers", "Press"].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-emerald-500 hover:text-white transition-all duration-300"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              <IoLogoYoutube size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <FaFacebookF size={18} />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-emerald-500 dark:text-emerald-400">
              EximFlow
            </span>{" "}
            — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
