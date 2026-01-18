"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, X } from "lucide-react";
import { environments } from "@/components/dashboard/bilateral/VisualEnvironmentSelector";

function SessionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(25);
  const totalSteps = 34;

  const envId = parseInt(searchParams.get("environment") || "1");
  const selectedEnv =
    environments.find((e) => e.id === envId) || environments[0];

  const settings = {
    icon: searchParams.get("icon") || "ball",
    speed: searchParams.get("speed") || "medium",
    direction: searchParams.get("direction") || "horizontal",
  };

  const speedDurations = {
    slow: 8,
    medium: 4,
    fast: 2,
  };
  const duration = speedDurations[settings.speed] || 4;

  const variants = {
    horizontal: {
      x: ["-40vw", "40vw"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: duration,
          ease: "easeInOut",
        },
      },
    },
    vertical: {
      y: ["-30vh", "30vh"],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: duration,
          ease: "easeInOut",
        },
      },
    },
    "diagonal-up": {
      x: ["-40vw", "40vw"],
      y: ["30vh", "-30vh"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: duration,
          ease: "easeInOut",
        },
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: duration,
          ease: "easeInOut",
        },
      },
    },
    "diagonal-down": {
      x: ["-40vw", "40vw"],
      y: ["-30vh", "30vh"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: duration,
          ease: "easeInOut",
        },
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: duration,
          ease: "easeInOut",
        },
      },
    },
  };

  const getIcon = () => {
    const iconMap = {
      ball: "/homeImage/Ellipse 1002.png",
      feather: "/homeImage/Frame (1).png",
      star: "/homeImage/Frame (2).png",
      leaf: "/homeImage/Frame (3).png",
    };
    return iconMap[settings.icon] || iconMap.ball;
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#F5F3EF] flex flex-col">
      <div className="absolute inset-0 z-0">
        <img
          src={selectedEnv.image}
          alt={selectedEnv.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5"></div>
      </div>

      <div className="relative z-50 flex justify-between items-start p-8 w-full pointer-events-none">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-widest text-white/80 drop-shadow-md font-serif">
            THE UK INKIND PSYCHOLOGY CLINIC
          </span>
          <h2 className="text-2xl font-serif text-white drop-shadow-lg leading-tight uppercase tracking-wide">
            {selectedEnv.name}
          </h2>
        </div>
        <div className="font-serif text-white/80 drop-shadow-md text-sm mt-2">
          {progress} of {totalSteps}
        </div>
      </div>

      <div className="flex-1 relative z-40 flex items-center justify-center">
        {!isPaused && (
          <motion.div
            animate={variants[settings.direction] || variants.horizontal}
            className="w-16 h-16 flex items-center justify-center"
          >
            <img
              src={getIcon()}
              alt="stimulation icon"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>
        )}
        {isPaused && (
          <div className="w-16 h-16 flex items-center justify-center">
            <img
              src={getIcon()}
              alt="stimulation icon"
              className="w-full h-full object-contain drop-shadow-lg opacity-50"
            />
          </div>
        )}
      </div>

      <div className="absolute bottom-10 right-6 z-50">
        <button
          onClick={() => router.back()}
          className="px-8 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-xs font-serif tracking-widest uppercase hover:bg-white/40 transition-all active:scale-95 cursor-pointer shadow-sm"
        >
          pause
        </button>
      </div>
    </div>
  );
}

export default function BilateralSessionPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen bg-[#F5F3EF] flex items-center justify-center font-serif">
          Loading your sanctuary...
        </div>
      }
    >
      <SessionContent />
    </Suspense>
  );
}
