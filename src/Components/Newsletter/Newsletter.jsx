import React from "react";

const Newsletter = () => {
  return (
    <section className="py-16 px-4 md:px-0 container mx-auto bg-gray-50 dark:bg-gray-800 rounded-xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Contact <span className="text-emerald-500">Us</span>
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Send us a message or subscribe to our newsletter
      </p>
      <form className="max-w-2xl mx-auto grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
        />
        <textarea
          placeholder="Message"
          className="input input-bordered w-full col-span-2 h-32 dark:bg-gray-700 dark:text-gray-100"
        />
        <button className="col-span-2 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all">
          Submit
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
