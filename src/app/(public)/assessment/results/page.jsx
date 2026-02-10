"use client";
import React from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle } from "lucide-react";
import Link from 'next/link';

export default function ResultsPage() {
    const { phq9Answers, gad7Answers, desAnswers } = useAssessment();
    const router = useRouter();

    const calculateScore = (answers) => {
        return Object.values(answers).reduce((a, b) => a + b, 0);
    };

    const getPhq9Severity = (score) => {
        if (score <= 4) return "Minimal";
        if (score <= 9) return "Mild";
        if (score <= 14) return "Moderate";
        if (score <= 19) return "Moderately Severe";
        return "Severe";
    };

    const getGad7Severity = (score) => {
        if (score <= 4) return "Minimal";
        if (score <= 9) return "Mild";
        if (score <= 14) return "Moderate";
        return "Severe";
    };

    const phq9Score = calculateScore(phq9Answers);
    const gad7Score = calculateScore(gad7Answers);

    const desQuestionsCount = 8;
    const desScore = Math.round(calculateScore(desAnswers) / desQuestionsCount);

    return (
        <div className="min-h-screen bg-[#FCF9F4] pt-24 px-6 md:px-10 font-sans pb-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#64748b] mb-3">INKIND EMDR</p>
                    <h2 className="text-4xl font-serif text-[#1e293b] mb-4">Mental Health Assessment</h2>
                    <p className="text-[#64748b] text-sm italic max-w-xl mx-auto">
                        Please complete these brief questionnaires to help us understand your current mental health needs and ensure our program is the right fit for you at this time.
                    </p>
                </div>

                {/* Warning / Important Box */}
                <div className="bg-[#FFF5F5] border-l-4 border-red-500 p-6 rounded-r-lg mb-8 shadow-sm">
                    <h3 className="text-[#1e293b] font-bold text-lg mb-4">Important: Additional Support Recommended</h3>
                    <p className="text-[#475569] text-sm mb-4 leading-relaxed">
                        Thank you for completing the assessment. Based on your responses, we believe you would benefit from immediate professional support before beginning a self-guided EMDR program.
                    </p>
                    <p className="text-[#475569] text-sm leading-relaxed">
                        Your wellbeing is our priority. The symptoms you're experiencing suggest that working with a mental health professional in person would be the safest and most effective approach at this time.
                    </p>
                </div>

                {/* Score Summary */}
                <div className="bg-[#FFFBF6] p-8 rounded-xl border border-[#F5EFE6] mb-8 shadow-sm">
                    <h3 className="text-2xl font-serif text-[#94a3b8] mb-6">Your Assessment Results</h3>

                    <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-4">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-[#94a3b8] font-serif text-lg">Depression (PHQ-9)</h4>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-[#1e293b] font-bold">{getPhq9Severity(phq9Score)}</span>
                                <span className="text-[#94a3b8] text-sm">(Score: {phq9Score}/27)</span>
                            </div>
                        </div>

                        <div className="border-b border-gray-100 pb-4">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-[#94a3b8] font-serif text-lg">Anxiety (GAD-7)</h4>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-[#1e293b] font-bold">{getGad7Severity(gad7Score)}</span>
                                <span className="text-[#94a3b8] text-sm">(Score: {gad7Score}/21)</span>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-[#94a3b8] font-serif text-lg">Dissociation (DES-II)</h4>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-[#1e293b] font-bold">Score: {desScore}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Immediate Support Section */}
                <div className="bg-[#FFFBF6] p-8 rounded-xl border border-[#F5EFE6] mb-8 shadow-sm">
                    <h3 className="text-2xl font-serif text-[#94a3b8] mb-6">Immediate Support Available</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-[#1e293b] font-semibold text-lg mb-1">Samaritans (24/7)</h4>
                            <p className="text-[#64748b] text-sm mb-1">Free emotional support for anyone in distress</p>
                            <p className="text-sm font-medium text-[#1e293b]">Call: 116 123 <span className="text-[#94a3b8] font-normal">(Free from any phone)</span></p>
                        </div>

                        <div>
                            <h4 className="text-[#1e293b] font-semibold text-lg mb-1">NHS Crisis Line</h4>
                            <p className="text-[#64748b] text-sm mb-1">Urgent mental health support</p>
                            <p className="text-sm font-medium text-[#1e293b]">Call: 111 <span className="text-[#94a3b8] font-normal">and select mental health option</span></p>
                        </div>

                        <div>
                            <h4 className="text-[#1e293b] font-semibold text-lg mb-1">SHOUT Crisis Text Line</h4>
                            <p className="text-[#64748b] text-sm mb-1">24/7 text support for anyone in crisis</p>
                            <p className="text-sm font-medium text-[#1e293b]">Text "SHOUT" to 85258</p>
                        </div>

                        <div>
                            <h4 className="text-[#1e293b] font-semibold text-lg mb-1">Your GP Surgery</h4>
                            <p className="text-[#64748b] text-sm mb-1">Contact your GP for an urgent appointment</p>
                            <p className="text-[#64748b] text-sm">They can provide immediate support and referrals</p>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center gap-4">
                    <button
                        onClick={() => router.push('/assessment/des')}
                        className="flex-1 bg-[#DBE5DE] text-[#334155] hover:bg-[#cfd6d3] px-6 py-4 rounded-md font-serif text-lg transition-colors shadow-sm"
                    >
                        Back
                    </button>

                    <Link href="/authentication/register" className="flex-1">
                        <button className="w-full bg-[#4A7C59] text-white hover:bg-[#456b4c] px-6 py-4 rounded-md font-serif text-lg transition-all shadow-md active:scale-95">
                            Continue
                        </button>
                    </Link>
                </div>

            </motion.div>
        </div>
    );
}
