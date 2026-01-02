"use client";
import React from "react";
import { motion } from "framer-motion";

const WhoWeAre = () => {
  return (
    <section style={{ backgroundColor: "#FCF9F4" }} className="py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ color: "#2D312D" }}
          className="text-4xl md:text-5xl font-serif mb-4"
        >
          Who We Are
        </motion.h2>

        <motion.p
          transition={{ delay: 0.2 }}
          style={{ color: "#92B09B" }}
          className="font-medium tracking-wide mb-8 text-lg"
        >
          A Team That Cares Deeply About Your Wellbeing
        </motion.p>

        <motion.p
          transition={{ delay: 0.4 }}
          style={{ color: "#4A4A4A" }}
          className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light"
        >
          We are a compassionate team of mental health innovators, clinical psychologists, and developers...
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#3d664a" }}
          whileTap={{ scale: 0.95 }}
          style={{ 
            backgroundColor: "#4A7C59", 
            color: "#FFFFFF",
            padding: "1rem 2.5rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer"
          }}
          className="font-medium shadow-md transition-all mt-10 duration-300"
        >
          Start Your Journey
        </motion.button>
      </div>
    </section>
  );
};

export default WhoWeAre;