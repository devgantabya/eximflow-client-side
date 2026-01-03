import React from "react";
import { Link } from "react-router";

const JoinNow = () => {
  return (
    <section className="py-16 text-center bg-emerald-500 text-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to Get Started?
      </h2>
      <p className="mb-6">
        Join EximFlow and manage your export-import trade efficiently!
      </p>
      <Link
        to="/register"
        className="px-10 py-3 bg-white text-emerald-500 font-semibold rounded-lg hover:bg-gray-100 transition-all"
      >
        Join Now
      </Link>
    </section>
  );
};

export default JoinNow;
