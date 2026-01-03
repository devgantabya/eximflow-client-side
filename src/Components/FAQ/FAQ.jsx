import React, { useState } from "react";

const faqData = [
  {
    question: "How do I import products?",
    answer:
      "You can import products by navigating to the product details page and clicking the 'Import Now' button. Enter the quantity and submit.",
  },
  {
    question: "Can I track my imported products?",
    answer:
      "Yes! All your imported products are listed in the 'My Imports' section in your dashboard.",
  },
  {
    question: "Is there a limit on the quantity I can import?",
    answer:
      "You can only import up to the available quantity of the product as listed in its details.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team through the 'Contact Us' page or via the email provided in your account dashboard.",
  },
];

const FAQItem = ({ faq, index, openIndex, setOpenIndex }) => {
  const isOpen = openIndex === index;

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        className="w-full flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setOpenIndex(isOpen ? null : index)}
      >
        <span
          className={`text-lg font-semibold transition-colors duration-200 ${
            isOpen ? "text-emerald-500" : "text-gray-800 dark:text-gray-100"
          }`}
        >
          {faq.question}
        </span>
        <span
          className={`text-xl font-bold transform transition-transform duration-200 ${
            isOpen
              ? "rotate-180 text-emerald-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 mt-2" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="my-16 px-4 md:px-0 container mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2 text-gray-800 dark:text-gray-100">
        Frequently Asked <span className="text-emerald-500">Questions</span>
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
        Here are some of the most common inquiries we receive from our users.
      </p>

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl divide-y divide-gray-200 dark:divide-gray-700 p-6">
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            index={index}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
