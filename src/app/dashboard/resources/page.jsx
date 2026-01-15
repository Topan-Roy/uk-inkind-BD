"use client";
import { useState } from "react";

export default function ResourcesPage() {
  const [messages] = useState([
    {
      text: "Beautifully simple. Incredibly easy to use but can be customized to your hiring workflow and needs.",
      author: "Mike Preuss, Co-founder and CEO, Visible.vc",
    },
    {
      text: "Beautifully simple. Incredibly easy to use but can be customized to your hiring workflow and needs.",
      author: "Mike Preuss, Co-founder and CEO, Visible.vc",
    },
    {
      text: "Beautifully simple. Incredibly easy to use but can be customized to your hiring workflow and needs.",
      author: "",
    },
    {
      text: "Beautifully simple. Incredibly easy to use but can be customized to your hiring workflow and needs.",
      author: "",
    },
    {
      text: "Beautifully simple. Incredibly easy to use but can be customized to your hiring workflow and needs.",
      author: "",
    },
  ]);

  return (
    <div className="backdrop-blur-xs border border-white/20 rounded-2xl p-2">
      <div className="text-center pb-6 mt-5">
        <h1 className="text-3xl  text-[#000000] font-normal mb-3">
          EMDR Companion
        </h1>
        <p className="text-[#000000] text-base leading-relaxed max-w-2xl mx-auto">
          I'm here to gently guide you through preparing for your first EMDR
          session.
          <br />
          We'll work together at your pace.
        </p>
      </div>
      <div className="p-5">
        <div className="relative backdrop-blur-xs rounded-3xl overflow-hidden shadow-lg border border-white/20">
          <div className=" backdrop-blur-md border-b border-stone-200/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#0F1912] text-[20px]">
                  EMDR Companion
                </span>
                <div className="flex items-center text-[#1EC970]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                    className="lucide lucide-badge-check"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path
                      d="m9 12 2 2 4-4"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-8 ">
            {messages.map((message, index) => (
              <div key={index} className="flex justify-start">
                <div className="">
                  <div className="bg-[#FBFBFC]/80 backdrop-blur-md rounded-2xl rounded-tl-sm px-6 py-4 shadow-sm border border-white/40">
                    <p className="text-stone-800 text-sm leading-relaxed mb-1">
                      "{message.text}"
                    </p>
                    {message.author && (
                      <p className="text-stone-500 text-[10px] italic">
                        — {message.author}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className=" backdrop-blur-md border-t border-stone-200/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-xl  border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#4A7C59]/50 text-stone-900 placeholder-stone-400"
              />
              <button className="w-12 h-10 rounded-xl bg-[#4A7C59] hover:bg-[#3d6649] text-white flex items-center justify-center transition-all shadow-sm active:scale-95">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
