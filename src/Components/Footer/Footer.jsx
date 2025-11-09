import React from "react";
import { FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-blue-100">
      <div className="container mx-auto py-7">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link to={"/"} className="text-3xl font-extrabold text-primary">
              EximFlow
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              Export • Import • Simplified
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600">
            <a
              href="#"
              className="hover:text-primary transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-200"
            >
              Contact
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-200"
            >
              Careers
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-200"
            >
              Press
            </a>
          </nav>

          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="p-2 rounded-full bg-white shadow hover:bg-primary hover:text-white transition-all duration-300"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white shadow hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              <IoLogoYoutube size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white shadow hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <FaFacebookF size={18} />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-primary">EximFlow</span> — All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
