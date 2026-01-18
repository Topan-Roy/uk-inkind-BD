"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import VisualEnvironmentSelector from "@/components/dashboard/bilateral/VisualEnvironmentSelector";
import VisualIconSelector from "@/components/dashboard/bilateral/VisualIconSelector";
import SoundSelector from "@/components/dashboard/bilateral/SoundSelector";
import BilateralSpeedSelector from "@/components/dashboard/bilateral/BilateralSpeedSelector";
import BilateralDirectionSelector from "@/components/dashboard/bilateral/BilateralDirectionSelector";
import { Save, Play } from "lucide-react";

export default function BilateralSettingsPage() {
  const router = useRouter();
  const [selections, setSelections] = useState({
    environment: 1,
    icon: "ball",
    sound: "gentle",
    speed: "medium",
    direction: "horizontal",
  });

  const updateSelection = (key, value) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  };

  const handleBeginSession = () => {
    const params = new URLSearchParams(selections);
    router.push(`/dashboard/resources/bilateral/session?${params.toString()}`);
  };

  return (
    <div className="min-h-screen relative bg-fixed bg-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none rounded-2xl"></div>

      <div className="relative z-10 py-12 px-6">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-serif text-[#0F1912] mb-3">
            Bilateral Stimulation
          </h1>
          <p className="text-stone-700 font-serif opacity-80 italic">
            Customise your calming experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Top Row: Environment Selector */}
          <VisualEnvironmentSelector
            selectedId={selections.environment}
            onSelect={(id) => updateSelection("environment", id)}
          />

          {/* Middle Row: Icons and Sounds */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VisualIconSelector
              selectedId={selections.icon}
              onSelect={(id) => updateSelection("icon", id)}
            />
            <SoundSelector
              selectedId={selections.sound}
              onSelect={(id) => updateSelection("sound", id)}
            />
          </div>

          {/* Bottom Row: Speed and Direction */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BilateralSpeedSelector
              selectedId={selections.speed}
              onSelect={(id) => updateSelection("speed", id)}
            />
            <BilateralDirectionSelector
              selectedId={selections.direction}
              onSelect={(id) => updateSelection("direction", id)}
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-12 flex justify-end gap-4">
          <button className="flex items-center gap-2 px-8 py-3 bg-white/80 backdrop-blur-md border border-stone-300 rounded-xl font-medium text-stone-700 hover:bg-white transition-all shadow-sm active:scale-95 cursor-pointer">
            <Save size={18} />
            Save Settings
          </button>
          <button
            onClick={handleBeginSession}
            className="flex items-center gap-2 px-8 py-3 bg-[#4A7C59] text-white rounded-xl font-medium hover:bg-[#3d6649] transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            <Play size={18} fill="currentColor" />
            Begin Session
          </button>
        </div>
      </div>
    </div>
  );
}
