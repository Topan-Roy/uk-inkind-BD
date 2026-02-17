"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoArrowBack,
  IoPersonOutline,
  IoShieldCheckmarkOutline,
  IoDiamondOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoSparklesOutline,
  IoFingerPrintOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const userData = {
    name: "Felix Inkind",
    email: "felix.inkind@example.com",
    plan: "Prime+",
    level: "Lvl 12 Serenity",
    joined: "Jan 2024",
    bundles: [
      {
        name: "Anxiety Relief Pack",
        date: "Feb 12",
        color: "from-rose-400 to-orange-400",
      },
      {
        name: "Deep Sleep Protocol",
        date: "Jan 25",
        color: "from-indigo-400 to-purple-400",
      },
      {
        name: "Trauma Healing Tool",
        date: "Jan 10",
        color: "from-emerald-400 to-teal-400",
      },
    ],
  };

  return (
    <div className="min-h-screen backdrop-blur-sm bg-[#ffff]/30 rounded-2xl relative overflow-hidden p-4 md:p-10 font-serif">
      {/* Ambient Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#5a7c5a]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#81c784]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Unique Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            {/* <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] flex items-center justify-center text-stone-400 hover:text-[#5a7c5a] transition-colors border border-stone-100/50"
              >
                <IoArrowBack size={24} />
              </motion.button>
            </Link> */}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-800 to-stone-500 bg-clip-text text-transparent tracking-tight">
                Personal Sanctum
              </h1>
              <p className="text-stone-400 font-sans text-xs uppercase tracking-[3px] font-bold mt-1">
                Self-Care Workspace
              </p>
            </div>
          </div>

          {/* Integrated Switcher */}
          <div className="bg-stone-100 p-1.5 rounded-[24px] flex gap-1 border border-stone-200/50 self-start md:self-center">
            {["profile", "security"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-[20px] text-sm font-bold font-sans transition-all duration-500 relative ${
                  activeTab === tab
                    ? "text-white"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#5a7c5a] rounded-[20px] shadow-[0_8px_20px_rgba(90,124,90,0.3)]"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2 capitalize">
                  {tab === "profile" ? (
                    <IoPersonOutline />
                  ) : (
                    <IoShieldCheckmarkOutline />
                  )}
                  {tab} settings
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Floating Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 bg-white rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-stone-100 text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#5a7c5a]/5 rounded-bl-[100px]" />

            <div className="relative mb-6 inline-block">
              <div className="w-32 h-32 rounded-[45px] overflow-hidden border-4 border-white shadow-2xl transition-transform duration-500 group-hover:rotate-6">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl shadow-xl flex items-center justify-center text-amber-500 border border-amber-100">
                <IoDiamondOutline size={20} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-stone-800 mb-1">
              {userData.name}
            </h2>
            <p className="text-[#5a7c5a] font-sans font-bold text-xs uppercase tracking-widest bg-[#5a7c5a]/5 inline-block px-4 py-1 rounded-full mb-6">
              {userData.level}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-stone-50 font-sans">
              <div className="text-left">
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1 italic">
                  Member Since
                </p>
                <p className="text-stone-800 font-bold text-sm tracking-tighter">
                  {userData.joined}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1 italic">
                  Plan Status
                </p>
                <p className="text-[#5a7c5a] font-bold text-sm tracking-tighter">
                  {userData.plan}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === "profile" ? (
                <motion.div
                  key="profile-grid"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Subscriptions Card */}
                  <div className="md:col-span-2 bg-gradient-to-br from-white to-stone-50 rounded-[40px] p-8 shadow-sm border border-stone-100/50">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner">
                          <IoSparklesOutline size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-stone-800">
                          Your Premium Bundles
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold text-[#5a7c5a] bg-white px-3 py-1 rounded-full shadow-sm">
                        3 Active
                      </span>
                    </div>

                    <div className="space-y-4">
                      {userData.bundles.map((bundle, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ x: 10 }}
                          className="flex items-center justify-between p-5 bg-white rounded-[24px] shadow-sm border border-stone-50 transition-all hover:bg-white hover:shadow-md cursor-pointer group"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-3 h-3 rounded-full bg-gradient-to-r ${bundle.color} shadow-lg shadow-black/5`}
                            />
                            <div>
                              <p className="text-stone-800 font-bold text-sm">
                                {bundle.name}
                              </p>
                              <p className="text-stone-400 font-sans text-[10px] font-medium tracking-wide">
                                Secured on {bundle.date}
                              </p>
                            </div>
                          </div>
                          <IoCheckmarkCircle
                            className="text-[#5a7c5a]/20 group-hover:text-[#5a7c5a] transition-colors"
                            size={24}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-[40px] shadow-sm border border-stone-100 flex flex-col items-center justify-center text-center gap-4 hover:shadow-lg transition-all duration-500 cursor-pointer group">
                    <div className="w-16 h-16 bg-[#5a7c5a]/5 rounded-full flex items-center justify-center text-[#5a7c5a] group-hover:scale-110 transition-transform">
                      <IoDiamondOutline size={30} />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-800 text-lg">
                        Elite Membership
                      </h4>
                      <p className="text-stone-400 text-xs font-sans mt-1">
                        Unlock all exclusive therapy models
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#5a7c5a] p-8 rounded-[40px] shadow-lg shadow-[#5a7c5a]/20 flex flex-col items-center justify-center text-center gap-4 hover:scale-[1.02] transition-all duration-500 cursor-pointer">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white">
                      <IoSparklesOutline size={30} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg font-sans underline decoration-white/30 underline-offset-8 decoration-2">
                        Manage Tiers
                      </h4>
                      <p className="text-white/60 text-xs font-sans mt-2">
                        Adjust your current session limit
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="security-grid"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Email Section */}
                  <div className="bg-white rounded-[40px] p-5 shadow-sm border border-stone-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
                      <IoFingerPrintOutline size={120} />
                    </div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                        <IoMailOutline size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-stone-800 font-serif">
                        Cloud Vault Email
                      </h3>
                    </div>
                    <div className="flex items-center justify-between bg-stone-50/80 p-6 rounded-[24px] border border-stone-100">
                      <div>
                        <p className="text-stone-700 font-sans font-bold text-sm mb-0.5">
                          {userData.email}
                        </p>
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest ">
                          Immutable Identity
                        </p>
                      </div>
                      <div className="px-4 py-1.5 bg-white rounded-full shadow-sm text-[10px] font-bold">
                        Locked System Property
                      </div>
                    </div>
                  </div>

                  {/* Advanced Password Section */}
                  <div className="bg-white rounded-[40px] p-5 shadow-sm border border-stone-100 transition-all duration-500">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
                          <IoLockClosedOutline size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-stone-800 font-serif">
                          Core Password
                        </h3>
                      </div>
                      {!isEditingPassword && (
                        <button
                          onClick={() => setIsEditingPassword(true)}
                          className="bg-stone-50 hover:bg-[#5a7c5a] hover:text-white text-stone-500 px-6 py-2.5 rounded-full font-bold text-xs font-sans transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#5a7c5a]/20 cursor-pointer"
                        >
                          Modify Access
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {isEditingPassword ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
                        >
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-sans ml-2">
                              Current Secret
                            </label>
                            <input
                              type="password"
                              placeholder="••••••••"
                              className="w-full bg-stone-50/50 border-2 border-transparent focus:border-[#5a7c5a]/20 focus:bg-white rounded-[20px] p-4 text-sm font-sans outline-none transition-all shadow-inner"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-sans ml-2">
                              New Key
                            </label>
                            <input
                              type="password"
                              placeholder="New sensitive data"
                              className="w-full bg-stone-50/50 border-2 border-transparent focus:border-[#5a7c5a]/20 focus:bg-white rounded-[20px] p-4 text-sm font-sans outline-none transition-all shadow-inner"
                            />
                          </div>
                          <div className="md:col-span-2 flex gap-4 mt-4">
                            <button
                              onClick={() => setIsEditingPassword(false)}
                              className="flex-1 bg-[#5a7c5a] text-white py-4 rounded-[20px] font-bold font-sans shadow-lg shadow-[#5a7c5a]/20 hover:scale-[1.02] active:scale-95 transition-all text-sm cursor-pointer"
                            >
                              Sync New Credentials
                            </button>
                            <button
                              onClick={() => setIsEditingPassword(false)}
                              className="px-10 py-4 bg-stone-100 text-stone-500 rounded-[20px] font-bold font-sans text-sm hover:bg-stone-200 transition-all cursor-pointer"
                            >
                              Discard
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="bg-stone-50/40 border-2 border-dashed border-stone-100 rounded-[24px] p-8 text-center">
                          <p className="text-stone-300 font-sans font-bold text-sm tracking-[8px]">
                            ••••••••••••••••
                          </p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
