"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function BehavioursPlanning() {
  const [selectedBehavior, setSelectedBehavior] = useState(null);
  const [stepInput, setStepInput] = useState("");

  const behaviors = [
    "Avoiding social situations",
    "Checking doors repeatedly",
    "Procrastinating on important tasks",
    "Avoiding conflict conversations",
    "Excessive reassurance seeking",
  ];

  return (
    <div className="min-h-screen py-6 px-4 font-serif rounded-2xl shadow-sm border border-white/20 bg-[#E3E6F0]/10 backdrop-blur-sm ">
      <div className="">
        {/* Header Container */}
        <div className=" text-center relative p-4 ">
          <h1 className="text-[32px] leading-tight text-[#383838] font-normal mb-2">
            Behavioral Exposure Planning
          </h1>
          <p className="text-[#7A7A7A] text-[16px]">
            I&apos;m here to gently guide you through preparing for your first
            EMDR session. We&apos;ll work together at your pace.
          </p>
        </div>

        {/* Main Glass Card */}
        <div className="bg-white/20 backdrop-blur-[25px] rounded-[40px]  border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-12 min-h-[750px] flex flex-col relative overflow-hidden">
          {/* Bot Message Section */}
          <div className="flex flex-col gap-8 mb-10 overflow-y-auto flex-1">
            <div className="flex items-center gap-4">
              {/* Green Status Dot */}
              <div className="w-4 h-4 rounded-full bg-[#5a7c5a] shadow-[0_0_12px_rgba(90,124,90,0.5)] border-2 border-white/50 shrink-0"></div>

              {/* Bot Bubble */}
              <div className="bg-white rounded-[20px] p-4 shadow-sm max-w-[340px] border border-stone-50">
                <p className="text-stone-700 text-[15px] leading-relaxed mb-1">
                  Welcome. I&apos;m here to support you with the behavioral
                  aspects of your therapy as part of your weekly homework plan.
                </p>
                <span className="text-[11px] text-stone-400 font-sans tracking-tight">
                  10:30 AM
                </span>
              </div>
            </div>

            {/* Question Text */}
            <div className="ml-8 text-stone-900 text-[16px] font-medium leading-[1]">
              Which behavior would you like to focus on?
            </div>

            {/* Behavior Options Buttons */}
            <div className="ml-8 flex flex-col gap-3.5 max-w-[580px]">
              {behaviors.map((behavior, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedBehavior(behavior)}
                  className={`bg-white border-2 border-transparent rounded-[18px] p-3 text-left text-stone-700 text-[17px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] ${
                    selectedBehavior === behavior
                      ? "!border-[#5a7c5a]/40 shadow-inner"
                      : ""
                  }`}
                >
                  {behavior}
                </button>
              ))}
            </div>

            {/* User Selected Response */}
            {selectedBehavior && (
              <div className="flex flex-col items-end pr-2 animate-in fade-in slide-in-from-right-8 duration-700 ease-out">
                <div className="bg-[#dce6dc]/90 backdrop-blur-md rounded-[22px] p-6 shadow-sm border border-white/40 max-w-[320px]">
                  <p className="text-stone-800 text-[16px] leading-[1.5] mb-2">
                    {selectedBehavior}
                  </p>
                  <div className="text-[10px] text-stone-500 text-right font-sans uppercase font-semibold">
                    10:30 AM
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Input Bar */}
          <div className="mt-auto px-2">
            <div className="bg-white rounded-[15px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-stone-100/50 flex items-center relative gap-3">
              <input
                type="text"
                value={stepInput}
                onChange={(e) => setStepInput(e.target.value)}
                placeholder="Describe a manageable first step..."
                className="flex-1 bg-transparent border-none outline-none pl-4 py-3 text-stone-700 text-[16px]  placeholder:text-stone-300"
              />
              <button className="bg-transparent border-none text-stone-400 hover:text-[#5a7c5a] p-3 pr-5 transition-all duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal-icon lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
