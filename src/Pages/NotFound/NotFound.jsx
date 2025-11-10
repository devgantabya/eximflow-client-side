import React from "react";
import { Link } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import errorImg from "../../assets/error-404-page.webp";

const NotFound = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <title>Eximflow - 404</title>
      <header className="border-b border-gray-200">
        <Navbar />
      </header>

      <main className="flex-grow flex justify-center items-center bg-linear-to-r from-blue-100 to-blue-50 px-4 py-12 md:py-20">
        <div className="text-center">
          <img
            src={errorImg}
            alt="404 - Page Not Found"
            className="mx-auto max-w-sm w-full"
          />
          <div className="text-center py-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Oops, page <span className="text-primary">not found!</span>
            </h1>
            <p className="text-gray-600">
              We couldn't find the page you requested.
            </p>
          </div>
          <Link to="/" className="btn btn-primary btn-sm md:btn-md">
            Back To Home
          </Link>
        </div>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default NotFound;
