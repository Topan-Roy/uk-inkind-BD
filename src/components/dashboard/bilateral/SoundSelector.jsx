"use client";
import React from "react";
import { Volume2, Music, Droplets, Wind, VolumeX } from "lucide-react";

const sounds = [
  { id: "gentle", name: "Gentle Tone", Icon: Volume2 },
  { id: "chime", name: "Soft Chime", Icon: Music },
  { id: "water", name: "Water Drop", Icon: Droplets },
  { id: "breath", name: "Soft Breath", Icon: Wind },
  { id: "bowl", name: "Singing Bowl", Icon: Music },
  { id: "silent", name: "Silent", Icon: VolumeX },
];

export default function SoundSelector({ selectedId, onSelect }) {
  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/20 h-full">
      <h3 className="text-xl font-serif text-[#0F1912] mb-4">Sound</h3>
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        {sounds.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
              selectedId === item.id
                ? "bg-white shadow-md scale-95 border-transparent"
                : "bg-white/50 hover:bg-white/80 border-transparent"
            }`}
          >
            <div
              className={`p-2 rounded-xl ${
                selectedId === item.id
                  ? "bg-teal-600/10 text-teal-600"
                  : "bg-stone-100 text-stone-400"
              }`}
            >
              <item.Icon size={20} />
            </div>
            <span className="text-stone-900 text-sm font-medium">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
