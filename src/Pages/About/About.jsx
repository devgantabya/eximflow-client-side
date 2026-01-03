import React, { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { FaGlobe, FaHandshake, FaShippingFast } from "react-icons/fa";

const About = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <title>EximFlow - About Us</title>

      <section className="bg-emerald-50 dark:bg-gray-800 py-16 px-4">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-emerald-500">EximFlow</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
            EximFlow is a global export-import marketplace connecting exporters
            and buyers worldwide with trust, transparency, and efficiency.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Our <span className="text-emerald-500">Mission</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our mission is to simplify international trade by providing a
              secure, user-friendly platform where exporters can showcase their
              products and buyers can source globally with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <InfoCard icon={<FaGlobe />} title="Global Reach" />
            <InfoCard icon={<FaHandshake />} title="Trusted Partners" />
            <InfoCard icon={<FaShippingFast />} title="Fast Logistics" />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800 py-16 px-4">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose <span className="text-emerald-500">Us</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature
              title="Verified Exporters"
              desc="We ensure trusted exporters with verified profiles."
            />
            <Feature
              title="Secure Transactions"
              desc="Your payments and data are always protected."
            />
            <Feature
              title="Global Marketplace"
              desc="Access products from multiple countries in one place."
            />
            <Feature
              title="24/7 Support"
              desc="Our support team is available anytime you need help."
            />
            <Feature
              title="Transparent Pricing"
              desc="No hidden fees. Clear and honest pricing."
            />
            <Feature
              title="Scalable Platform"
              desc="Perfect for small exporters to large enterprises."
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Grow Your <span className="text-emerald-500">Business</span>?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Join EximFlow today and connect with global buyers effortlessly.
        </p>
        <Link
          to="/login"
          className="px-8 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

const InfoCard = ({ icon, title }) => (
  <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-900 shadow-md">
    <div className="text-emerald-500 text-3xl mb-3">{icon}</div>
    <h4 className="font-semibold">{title}</h4>
  </div>
);

const Feature = ({ title, desc }) => (
  <div className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow-md">
    <h4 className="font-semibold mb-2">{title}</h4>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{desc}</p>
  </div>
);

export default About;
