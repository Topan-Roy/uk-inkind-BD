"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateJourney() {
  const router = useRouter();
  const [journeyName, setJourneyName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(1);

  const images = [
    {
      id: 1,
      name: "Floral EMDR 1",
      theme: "spring",
      src: "/homeImage/MDER.jpg",
    },
    {
      id: 2,
      name: "Floral EMDR 2",
      theme: "summer",
      src: "/homeImage/MDER.jpg",
    },
    {
      id: 3,
      name: "Floral EMDR 3",
      theme: "autumn",
      src: "/homeImage/MDER.jpg",
    },
    {
      id: 4,
      name: "Floral EMDR 4",
      theme: "winter",
      src: "/homeImage/MDER.jpg",
    },
    {
      id: 5,
      name: "Floral EMDR 5",
      theme: "garden",
      src: "/homeImage/MDER.jpg",
    },
    {
      id: 6,
      name: "Floral EMDR 6",
      theme: "meadow",
      src: "/homeImage/MDER.jpg",
    },
    {
      id: 7,
      name: "Floral EMDR 7",
      theme: "forest",
      src: "/homeImage/MDER.jpg",
    },
    {
      id: 8,
      name: "Floral EMDR 8",
      theme: "sunset",
      src: "/homeImage/MDER.jpg",
    },
    {
      id: 9,
      name: "Floral EMDR 9",
      theme: "sunrise",
      src: "/homeImage/MDER.jpg",
    },
    {
      id: 10,
      name: "Floral EMDR 10",
      theme: "twilight",
      src: "/homeImage/MDER.jpg",
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <div className="bg-[#4B4B4B] rounded-3xl shadow-2xl p-8 lg:p-12 border border-stone-600">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif text-[#0F1912] mb-3">
              Create Your Journey
            </h1>
            <p className="text-[#7A7A7A] text-base">
              Give your healing journey a name and choose a visual theme.
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-[#0F1912] text-sm mb-2">
                Journey Name
              </label>
              <input
                type="text"
                value={journeyName}
                onChange={(e) => setJourneyName(e.target.value)}
                placeholder="e.g., Anxiety Management Journey"
                className="w-full px-5 py-4 rounded-xl bg-white text-[#7A7A7A] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-[#0F1912] text-sm mb-2">
                Description (Optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='e.g., Working through social anxiety and building confidence"'
                className="w-full px-5 py-4 rounded-xl bg-white text-[#7A7A7A] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-[#0F1912] text-sm mb-4">
                Choose Your Journey Image
              </label>
              <div className="grid grid-cols-5 gap-4">
                {images.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image.id)}
                    className={`aspect-square rounded-xl bg-white overflow-hidden hover:scale-105 transition-transform duration-200 relative ${
                      selectedImage === image.id
                        ? "ring-4 ring-emerald-600"
                        : ""
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Checkmark for selected */}
                    {selectedImage === image.id && (
                      <div className="absolute top-2 right-2 w-7 h-7 bg-emerald-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
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
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}

          <div className="flex justify-end mt-10">
            <button
              onClick={() => router.push("/dashboard/assessments")}
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-medium transition-colors duration-200 shadow-lg"
            >
              Save & Enter Space
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
