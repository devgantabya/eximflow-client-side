import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Message sent successfully!");
      e.target.reset();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <title>EximFlow - Contact Us</title>

      <section className="bg-emerald-50 dark:bg-gray-800 py-16 px-4">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact <span className="text-emerald-500">Us</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Have questions or need support? We're here to help you grow your
            global business.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              Get in <span className="text-emerald-500">Touch</span>
            </h2>

            <p className="text-gray-600 dark:text-gray-400">
              Reach out to us anytime. Our team will respond as quickly as
              possible.
            </p>

            <ContactItem
              icon={<FaEnvelope />}
              title="Email"
              value="support@eximflow.com"
            />

            <ContactItem
              icon={<FaPhoneAlt />}
              title="Phone"
              value="+880 1234 567 890"
            />

            <ContactItem
              icon={<FaMapMarkerAlt />}
              title="Office"
              value="Dhaka, Bangladesh"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                  rows="5"
                  required
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactItem = ({ icon, title, value }) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-emerald-500 text-white text-xl">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{value}</p>
    </div>
  </div>
);

export default Contact;
