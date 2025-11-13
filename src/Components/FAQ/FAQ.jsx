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
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left focus:outline-none"
        onClick={() => setOpenIndex(isOpen ? null : index)}
      >
        <span className="text-lg font-semibold">{faq.question}</span>
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{faq.answer}</p>}
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="my-16 px-4 md:px-0 container mx-auto">
      <h2 className="text-4xl font-bold text-center mb-2">
        Frequently Asked <span className="text-primary">Questions</span>
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        Here are some of the most common inquiries we receive from our users.
      </p>
      <div className="max-w-3xl mx-auto shadow-lg rounded-lg p-6">
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
