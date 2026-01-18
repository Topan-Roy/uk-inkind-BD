"use client";
import React from "react";

const iconList = [
  { id: "ball", name: "Ball", img: "/homeImage/Ellipse 1002.png" },
  { id: "feather", name: "Feather", img: "/homeImage/Frame (1).png" },
  { id: "star", name: "Star", img: "/homeImage/Frame (2).png" },
  { id: "leaf", name: "Leaf", img: "/homeImage/Frame (3).png" },
  { id: "ball2", name: "Ball", img: "/homeImage/Ellipse 1002.png" },
  { id: "ball3", name: "Ball", img: "/homeImage/Ellipse 1002.png" },
  { id: "ball4", name: "Ball", img: "/homeImage/Ellipse 1002.png" },
  { id: "ball5", name: "Ball", img: "/homeImage/Ellipse 1002.png" },
];

export default function VisualIconSelector({ selectedId, onSelect }) {
  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-4 sm:p-6 border border-white/20">
      <h3 className="text-lg sm:text-xl font-serif text-[#0F1912] mb-4">
        Visual
      </h3>

      {/* ✅ lg = 4 cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {iconList.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex flex-col items-center justify-center p-4 aspect-square rounded-2xl cursor-pointer transition-all
              ${
                selectedId === item.id
                  ? "bg-white shadow-md border-2 border-dashed border-blue-400"
                  : "bg-white/60 hover:bg-white/80"
              }
            `}
          >
            <div className="w-8 h-8 flex items-center justify-center mb-1">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-stone-900 text-sm font-bold">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
