import React from "react";
import { FaShippingFast, FaShieldAlt, FaHeadset, FaStar } from "react-icons/fa";

const benefits = [
  {
    icon: <FaShippingFast className="text-primary text-3xl" />,
    title: "Fast Delivery",
    desc: "We ensure quick delivery for all your orders.",
  },
  {
    icon: <FaShieldAlt className="text-primary text-3xl" />,
    title: "Secure Payments",
    desc: "All transactions are safe and secure.",
  },
  {
    icon: <FaHeadset className="text-primary text-3xl" />,
    title: "24/7 Support",
    desc: "Our team is ready to assist you anytime.",
  },
  {
    icon: <FaStar className="text-primary text-3xl" />,
    title: "Top Quality",
    desc: "We offer only the best quality products.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-primary/10 shadow-sm">
      <div className="my-16 px-4 md:px-0 py-12 container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">
            Why <span className="text-primary">Choose Us</span>
          </h2>
          <p className="text-gray-600 mt-2">
            We make shopping easy and reliable
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-4  rounded-lg shadow-xl hover:shadow-md transition-shadow"
            >
              {item.icon}
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-500 mt-2 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
