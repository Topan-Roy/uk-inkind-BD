"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
export default function EMDRSession() {
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState({});
  const [videoEnded, setVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const questions = [
    {
      id: 1,
      question: "How did this session make you feel?",
      options: [
        "Calm and relaxed",
        "Slightly uncomfortable",
        "Emotionally triggered",
      ],
    },
    {
      id: 2,
      question: "Were you able to focus on the bilateral stimulation?",
      options: [
        "Yes, throughout the entire session",
        "Partially, I got distracted",
        "No, I found it difficult to focus",
      ],
    },
    {
      id: 3,
      question: "Did any memories or emotions surface during the session?",
      options: [
        "Yes, and I was able to process them",
        "Yes, but I felt overwhelmed",
        "No, nothing came up",
      ],
    },
  ];
  const handleCheck = (questionId, optionIndex) => {
    setCheckedItems({
      ...checkedItems,
      [`${questionId}-${optionIndex}`]:
        !checkedItems[`${questionId}-${optionIndex}`],
    });
  };
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const handleVideoEnd = () => {
    setVideoEnded(true);
    setIsPlaying(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-300 to-stone-400 flex items-center justify-center p-3 rounded-2xl">
      <div className="relative w-full ">
        <div className="relative">
          <video
            ref={videoRef}
            src="/homeImage/Video 1.mp4"
            className="w-full h-auto rounded-3xl shadow-2xl"
            onEnded={handleVideoEnd}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          {!isPlaying && !videoEnded && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <button
                onClick={handlePlayPause}
                className="w-20 h-20 bg-teal-700/80 hover:bg-teal-700 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110"
              >
                <svg
                  className="w-10 h-10 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          )}
          {videoEnded && (
            <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 w-80 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-lg font-serif text-stone-900 mb-6">
                Session Reflection
              </h2>
              <div className="space-y-6 max-h-[500px] overflow-y-auto">
                {questions.map((question) => (
                  <div key={question.id}>
                    <h3 className="font-semibold text-stone-900 mb-3 text-sm">
                      {question.id}. {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, index) => (
                        <label
                          key={index}
                          className="flex items-start gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={
                              checkedItems[`${question.id}-${index}`] || false
                            }
                            onChange={() => handleCheck(question.id, index)}
                            className="mt-0.5 w-4 h-4 rounded border-2 border-stone-300 text-teal-600 focus:ring-2 focus:ring-teal-500 cursor-pointer"
                          />
                          <span className="text-sm text-stone-700 group-hover:text-stone-900 leading-snug">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() =>
                  router.push("/dashboard/EMDRCompanion/session/next")
                }
                className="w-full mt-6 bg-[#4A7C59] hover:bg-[#3d6649] text-white py-3 rounded-xl font-medium transition-all shadow-lg active:scale-95"
              >
                Complete Session
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
