import React from "react";
import { FaShippingFast, FaShieldAlt, FaHeadset, FaStar } from "react-icons/fa";

const benefits = [
  {
    icon: <FaShippingFast className="text-emerald-500 text-4xl" />,
    title: "Fast Delivery",
    desc: "We ensure quick delivery for all your orders.",
  },
  {
    icon: <FaShieldAlt className="text-emerald-500 text-4xl" />,
    title: "Secure Payments",
    desc: "All transactions are safe and secure.",
  },
  {
    icon: <FaHeadset className="text-emerald-500 text-4xl" />,
    title: "24/7 Support",
    desc: "Our team is ready to assist you anytime.",
  },
  {
    icon: <FaStar className="text-emerald-500 text-4xl" />,
    title: "Top Quality",
    desc: "We offer only the best quality products.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 md:px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100">
            Why <span className="text-emerald-500">Choose Us</span>
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm md:text-base">
            We make shopping easy and reliable
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="
                flex flex-col items-center text-center
                p-6
                bg-white dark:bg-gray-800
                rounded-xl
                shadow-lg
                hover:shadow-2xl
                transform hover:-translate-y-1
                transition-all duration-300
              "
            >
              {item.icon}
              <h3 className="mt-4 text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">
                {item.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
