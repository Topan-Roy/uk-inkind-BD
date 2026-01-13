
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Community Access",
      price: "Free",
      duration: "6 months",
      subText: "Community Access",
      features: ["Includes Prime Plan program", "Limited availability"],
      buttonText: "Apply for Access",
      hasSpots: true,
      spots: 12,
    },
    {
      name: "The Main Plan",
      price: "£45",
      duration: "/month",
      subText: "Affordable entry to virtual EMDR therapy",
      features: ["4 sessions/month", "Get Started"],
      buttonText: "Get Started",
    },
    {
      name: "Prime Plan",
      price: "£75",
      duration: "/month",
      subText: "Best value for consistent healing",
      features: ["Includes homework", "Progress tracking", "Full program access"],
      buttonText: "Get Started",
      recommended: true,
    },
    {
      name: "Hero Plan",
      price: "£120",
      duration: "/month",
      subText: "Support yourself and someone in need",
      features: ["Funds 1 Community Access monthly", "Full Prime Plan access"],
      buttonText: "Get Started",
    },
    {
      name: "Rockstar Plan",
      price: "£950",
      duration: "/6 months",
      subText: "Unlimited care, generous giving",
      features: ["Funds 2 community access plans", "Unlimited care access"],
      buttonText: "Get Started",
    },
  ];

  return (
    <section className="bg-[#FCF9F4] py-24 px-6 md:px-10">
      <div className="max-w-[90%] mx-auto">
        
        {/* Header Content */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-[#1C2C2E] mb-6"
          >
            Choose the Plan That’s Right for You
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#6E8B7A] text-xl font-medium"
          >
            Flexible pricing options to support your healing journey – cancel anytime.
          </motion.p>
        </div>

        <div className="block md:flex gap-4 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-[20px] p-6 flex flex-col transition-all duration-300 ${
                plan.recommended 
                  ? "border-[2.5px] border-black scale-105 z-10 shadow-xl" 
                  : "border border-gray-200 shadow-sm"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-[9] left-1/2 -translate-x-1/2 bg-white border-[2.5px] border-black px-4 py-0.5 z-20">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black">
                    Recommended
                  </span>
                </div>
              )}

              {/* Top Info */}
              <div className="text-left mb-6">
                <h3 className="text-lg font-bold text-[#1C2C2E] mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl font-serif text-[#1C2C2E]">{plan.price}</span>
                  <span className="text-gray-500 text-[12px] font-medium">{plan.duration}</span>
                </div>
                <p className="text-gray-600 text-[12px] mt-2 leading-snug min-h-[32px]">
                  {plan.subText}
                </p>
              </div>

              {plan.hasSpots && (
                <div className="border border-black rounded-lg p-3 mb-6 text-center">
                  <div className="text-xl font-bold text-[#1C2C2E]">{plan.spots}</div>
                  <div className="text-[9px] text-gray-500 uppercase font-black tracking-tighter">
                    Spots Available
                  </div>
                </div>
              )}

              <div className="flex-grow mb-8 space-y-3">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-black mt-0.5 shrink-0" />
                    <span className="text-[12px] text-gray-700 leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

             <div className="mt-auto">
                <button 
                  className={`w-full py-2.5 rounded-lg text-[13px] font-bold border-[1.5px] transition-all ${
                    plan.recommended 
                    ? "bg-white border-black text-black hover:bg-black hover:text-white" 
                    : "bg-white border-gray-300 text-gray-700 hover:border-black hover:text-black"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;