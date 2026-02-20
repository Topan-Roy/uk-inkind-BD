"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Play, Lock, Music } from "lucide-react";

const thoughtsData = [
    {
        id: 1,
        type: "main",
        title: "Observing Your Mind",
        description: "Our thoughts can feel very real and powerful, but learning to observe them with some distance can be transformative. These exercises are designed to help you develop a new relationship with your thoughts.",
        icon: <Brain className="w-8 h-8 text-[#4A90E2]" />,
    },
    {
        id: 2,
        type: "audio",
        tag: "Audio",
        title: "Counting Thoughts",
        description: "A guided practice in observing and counting your thoughts.",
        icon: <Music className="w-4 h-4" />,
        status: "active",
    },
    {
        id: 3,
        type: "coming-soon",
        tag: "Coming Soon",
        title: "Thanking the Mind",
        description: "Practice acknowledging thoughts without getting caught up in them.",
        status: "locked",
    },
    {
        id: 4,
        type: "coming-soon",
        tag: "Coming Soon",
        title: "Mindfulness",
        description: "A mindfulness meditation to cultivate present-moment awareness.",
        status: "locked",
    },
];

export default function ThoughtsPage() {
    return (
        <div className=" py-12 px-6">
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-6xl font-serif text-center mb-16 text-[#1A1A1A] tracking-tight"
            >
                Thoughts
            </motion.h1>

            <div className="space-y-8">
                {thoughtsData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
                        className={`bg-white/40 backdrop-blur-sm rounded-[20px] p-3 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-start gap-8 transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group ${item.status === "locked" ? "bg-white/70" : ""
                            }`}
                    >
                        {/* Left Side: Number or Icon */}
                        <div className="flex-shrink-0 pt-1">
                            {item.type === "main" ? (
                                <div className="w-16 h-16 rounded-full bg-[#F0F7FF] flex items-center justify-center shadow-sm border border-blue-50/50">
                                    <Brain className="w-8 h-8 text-[#4A90E2]" />
                                </div>
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#B0B0B0] font-bold text-lg">
                                    {item.id}
                                </div>
                            )}
                        </div>

                        {/* Middle: Content */}
                        <div className="flex-grow">
                            <div className="flex flex-col gap-3">
                                {item.tag && (
                                    <div>
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase ${item.type === "audio"
                                                    ? "bg-[#E8F5EE]/40 text-[#6E967A]"
                                                    : "bg-[#F0F0F0]/40 text-[#A0A0A0]"
                                                }`}
                                        >
                                            {item.type === "audio" && <Music className="w-3.5 h-3.5" />}
                                            {item.tag}
                                        </span>
                                    </div>
                                )}
                                <h2 className={`text-2xl font-bold tracking-tight ${item.status === 'locked' ? 'text-[#888888]' : 'text-[#333333]'}`}>
                                    {item.title}
                                </h2>
                                <p className={`text-lg leading-relaxed max-w-3xl ${item.status === 'locked' ? 'text-[#A0A0A0]' : 'text-[#666666]'}`}>
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Action Icon */}
                        <div className="flex-shrink-0 self-center">
                            {item.status === "active" && (
                                <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-8 h-8 text-[#BDBDBD] fill-[#BDBDBD]/10" />
                                </div>
                            )}
                            {item.status === "locked" && (
                                <div className="w-12 h-12 flex items-center justify-center opacity-40">
                                    <Lock className="w-6 h-6 text-[#9E9E9E]" />
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
