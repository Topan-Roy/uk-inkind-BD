"use client";
import React from "react";

export const environments = [
  {
    id: 1,
    name: "Mountain Sanctuary",
    image: "/homeImage/img2.jpg",
  },
  {
    id: 2,
    name: "Sunset Beach",
    image: "/homeImage/img1.jpg",
  },
  {
    id: 3,
    name: "Forest Glade",
    image: "/homeImage/img3.jpg",
  },
  {
    id: 4,
    name: "Starry Night",
    image: "/homeImage/img4.jpg",
  },
  {
    id: 5,
    name: "Calm Lake",
    image: "/homeImage/img5.jpg",
  },
];

export default function VisualEnvironmentSelector({ selectedId, onSelect }) {
  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/20">
      <h3 className="text-xl font-serif text-[#0F1912] mb-4">Visual</h3>
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {environments.map((env) => (
          <div
            key={env.id}
            onClick={() => onSelect(env.id)}
            className={`flex-shrink-0 w-48 h-32 rounded-2xl overflow-hidden relative cursor-pointer border-2 transition-all ${
              selectedId === env.id
                ? "border-[#4A7C59] scale-95"
                : "border-transparent opacity-80 hover:opacity-100"
            }`}
          >
            <img
              src={env.image}
              alt={env.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-2 text-center">
              <span className="text-white text-sm font-medium">{env.name}</span>
            </div>
            {selectedId === env.id && (
              <div className="absolute top-2 right-2 bg-[#4A7C59] rounded-full p-1">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
