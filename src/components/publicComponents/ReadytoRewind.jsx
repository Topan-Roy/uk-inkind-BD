"use client";

import React from "react";
import { motion } from "framer-motion";

const ReadytoRewind = ({ 
  title = "Ready to Rewind and Reprocess?", 
  subtitle = "Think of it as therapy that escaped from the clinic and learned how to have fun. Evidence-based EMDR treatment turned into an interactive digital experience.", 
  buttonText = "Get Started Today",
  bgImage = "/homeImage/emdr backround image 3 1.png" 
}) => {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#fdfdfb]">

      <div
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="absolute inset-0 z-0 scale-105" 
      />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 md:gap-6"
        >

        
          <h1 className="max-w-2xl mx-auto text-4xl md:text-7xl lg:text-7xl font-serif text-[#0F1912] leading-wide">
            {title}
          </h1>

          <p className="max-w-4xl mx-auto text-[24px] md:text-2xl text-[#0F1912] font-normal tracking-wide">
            {subtitle}
          </p>
        </motion.div>
         <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#56825e] hover:bg-[#456b4c] text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-[#56825e]/30 active:scale-95 mt-5"
          >
            {buttonText}
          </motion.button>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />
    </section>
  );
};

export default ReadytoRewind;