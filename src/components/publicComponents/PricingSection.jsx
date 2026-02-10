"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const PricingSection = () => {
  const router = useRouter();
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
      features: [
        "Includes homework",
        "Progress tracking",
        "Full program access",
      ],
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
            Flexible pricing options to support your healing journey – cancel
            anytime.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch ">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-[20px] p-6 flex flex-col transition-all duration-300 w-full ${plan.recommended
                ? "border-[2.5px] border-[#4A7C59] scale-105 z-10 shadow-xl"
                : "border border-gray-200 shadow-sm"
                }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FDC700] rounded-2xl   px-4 py-0.5 z-20">
                  <span className="text-[14px] text-[#101828] font-semibold  tracking-widest ">
                    Recommended
                  </span>
                </div>
              )}

              {/* Top Info */}
              <div className="text-left mb-6">
                <h3 className="text-2xl font-semibold text-[#101828] mb-1">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl font-serif text-[#101828]">
                    {plan.price}
                  </span>
                  <span className="text-[#101828] text-[12px] font-medium">
                    {plan.duration}
                  </span>
                </div>
                <p className="text-[#4A7C59] text-[14px] mt-2 leading-snug min-h-[32px]">
                  {plan.subText}
                </p>
              </div>

              {plan.hasSpots && (
                <div className="border border-[#DBE5DE] bg-[#FFF8F0] rounded-lg p-3 mb-6 text-center">
                  <div className="text-xl font-bold text-[#1C2C2E]">
                    {plan.spots}
                  </div>
                  <div className="text-[9px] text-gray-500 uppercase font-black tracking-tighter">
                    Spots Available
                  </div>
                </div>
              )}

              <div className="flex-grow mb-8 space-y-3">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-2 text-[#4A7C59]">
                    <Check className="w-3.5 h-3.5 text-[#364153] mt-0.5 shrink-0" />
                    <span className="text-[14px] text-[#364153] leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-20">
                <button
                  onClick={() => router.push('/assessment')}
                  className={`w-full py-2.5 rounded-lg text-[16px] font-medium border-[1.5px] border-[#4A7C59] transition-all  ${plan.recommended
                    ? "bg-white border-[#4A7C59] text-[#4A7C59] hover:bg-[#456b4c] hover:text-white"
                    : "bg-white border-gray-300 text-gray-700 hover:border-[#4A7C59] hover:text-[#4A7C59]"
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
