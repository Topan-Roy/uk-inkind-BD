"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is EMDR therapy?",
    answer: "EMDR (Eye Movement Desensitization and Reprocessing) therapy is a psychotherapy technique used to help people process and recover from traumatic memories or distressing experiences.",
  },
  {
    question: "How do the online sessions work?",
    answer: "Our online sessions are conducted via a secure platform where you follow guided bilateral stimulation exercises, interactive tools, and video instructions from the comfort of your home.",
  },
  {
    question: "Is this program safe?",
    answer: "Yes, the program is designed with safety protocols and screening assessments to ensure it's appropriate for your current mental health state.",
  },
  {
    question: "Do I need previous therapy experience?",
    answer: "No, the program is designed to guide you from scratch, providing all the necessary context and tools needed for the sessions.",
  },
  {
    question: "How is my progress tracked?",
    answer: "We use standardized clinical assessments and progress trackers to monitor your symptoms and improvements over time.",
  },
  {
    question: "How is this different from Headspace or Calm?",
    answer: "Unlike general meditation apps, this is a structured therapeutic program based on EMDR protocols specifically designed for trauma and clinical mental health issues.",
  },
  {
    question: "Can this replace therapy or cure me?",
    answer: "While highly effective, this tool is designed to supplement or provide an accessible alternative. For complex cases, it works best alongside professional guidance.",
  },
  {
    question: "How do you protect my privacy?",
    answer: "We are fully GDPR compliant. All your data and session history are encrypted and stored securely to ensure maximum privacy.",
  },
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="mb-5">
      <div
        className={`bg-white rounded-xl border border-gray-200 shadow-[0px_2px_8px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 ${isOpen ? 'ring-1 ring-[#568261]/20' : ''}`}
      >
        <button
          onClick={onClick}
          className="w-full flex items-center justify-between p-5 md:p-6 text-left"
        >
          <span className="text-lg md:text-xl font-serif text-[#2D312D] opacity-90">
            {question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#568261] ml-4 shrink-0"
          >
            <ChevronDown size={20} strokeWidth={2.5} />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-6 pb-6 text-gray-500 text-base md:text-[17px] leading-relaxed max-w-[90%]">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#FCF9F4] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif text-[#2D312D] text-center mb-16"
        >
          Frequently Asked Questions
        </motion.h2>

        {/* FAQ List */}
        <div className="space-y-2">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;