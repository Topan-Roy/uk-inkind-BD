"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  IoNotificationsOutline,
  IoBookOutline,
  IoCalendarOutline,
  IoStatsChartOutline,
  IoCheckmarkCircleOutline,
  IoPersonOutline,
  IoShieldCheckmarkOutline,
  IoLogOutOutline,
  IoChevronDown,
  IoDiamondOutline,
  IoSparklesSharp
} from "react-icons/io5";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationsRef = useRef(null);
  const profileMenuRef = useRef(null);

  const notifications = [
    {
      id: 1,
      type: "homework",
      title: "Homework Assignment",
      description: "Breathwork practice added for your evening routine.",
      time: "2 mins ago",
      unread: true,
      icon: <IoBookOutline className="w-5 h-5" />,
      color: "bg-blue-500"
    },
    {
      id: 2,
      type: "session",
      title: "Preparation Reminder",
      description: "Start your pre-session grounding in 45 minutes.",
      time: "1 hour ago",
      unread: true,
      icon: <IoCalendarOutline className="w-5 h-5" />,
      color: "bg-purple-500"
    },
    {
      id: 3,
      type: "milestone",
      title: "New Milestone!",
      description: "Congratulations! You've maintained consistency for 7 days.",
      time: "5 hours ago",
      unread: false,
      icon: <IoStatsChartOutline className="w-5 h-5" />,
      color: "bg-amber-500"
    },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-end px-8 py-6 bg-transparent relative z-[100]">
      <div className="flex items-center gap-4">
        {/* Glow Container */}
        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-[20px] rounded-[30px] p-1 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-white/60 relative group">

          {/* Notifications Button */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-1.5 rounded-2xl transition-all duration-500 cursor-pointer relative group/bell ${showNotifications ? "bg-[#5a7c5a] text-white" : "text-stone-400 hover:text-[#5a7c5a] hover:bg-white"
                }`}
            >
              <IoNotificationsOutline className={`w-5 h-5 transition-transform duration-300 ${showNotifications ? "" : "group-hover/bell:rotate-[15deg]"}`} />

              <AnimatePresence>
                {notifications.some(n => n.unread) && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white shadow-sm"
                  />
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 15, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: 10, x: 10 }}
                  className="absolute top-full right-0 mt-6 w-[380px] bg-white/95 backdrop-blur-[30px] rounded-[35px] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.25)] border border-white/50 overflow-hidden origin-top-right"
                >
                  <div className="p-7 bg-stone-50/50 flex items-center justify-between border-b border-stone-100/50">
                   
                      <h3 className="text-stone-800  text-xl font-semibold">Notification</h3>
                    
                   
                  </div>

                  <div className="p-3 max-h-[450px] overflow-y-auto space-y-2">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-5 rounded-[28px] transition-all duration-500 cursor-pointer relative ${notification.unread ? "bg-[#5a7c5a]/5" : "bg-transparent hover:bg-stone-50"
                          }`}
                      >
                        <div className="flex gap-4">
                          <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center shrink-0 shadow-lg shadow-black/5 ${notification.color} text-white`}>
                            {notification.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-0.5">
                              <h4 className="text-[14px] font-black text-stone-800">{notification.title}</h4>
                              <span className="text-[9px] text-stone-300 font-bold uppercase tracking-wider">{notification.time}</span>
                            </div>
                            <p className="text-stone-500 text-[11px] leading-relaxed line-clamp-2 italic">{notification.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-[1px] h-4 bg-stone-200" />

          {/* Unique Profile Trigger */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2  bg-white/20 hover:bg-white rounded-[22px] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer border border-transparent hover:border-[#5a7c5a]/10"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-stone-200 rounded-full overflow-hidden border border-white shadow-inner">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#5a7c5a] rounded-full border-2 border-white flex items-center justify-center animate-pulse">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
              </div>
              {/* <div className="hidden md:block text-left">
                <p className="text-[11px] font-black text-stone-800 leading-none">Felix I.</p>
                <p className="text-[9px] font-bold text-[#5a7c5a] leading-none mt-1 uppercase tracking-tight">Prime+</p>
              </div> */}
              <IoChevronDown className={`w-3 h-3 text-stone-300 transition-transform duration-500 ${showProfileMenu ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 10 }}
                  className="absolute top-full right-0 mt-6 w-[280px] bg-white/95 backdrop-blur-[30px] rounded-[35px] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.25)] border border-white/50 overflow-hidden origin-top-right p-3"
                >
                  <div className="flex flex-col gap-2">
                    <Link href="/dashboard/profile" onClick={() => setShowProfileMenu(false)}>
                      <motion.div
                        whileHover={{ scale: 1.02, backgroundColor: "rgb(250, 250, 249)" }}
                        className="flex items-center gap-4 p-2 rounded-[25px] transition-all group cursor-pointer"
                      >
                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12">
                          <IoPersonOutline size={14} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[13px] font-black text-stone-800">My Sanctum</p>
                          <p className="text-[9px] font-bold text-stone-400 uppercase tracking-tighter italic">Personal Workspace</p>
                        </div>
                      </motion.div>
                    </Link>

                    <Link href="/dashboard/profile" onClick={() => setShowProfileMenu(false)}>
                      <motion.div
                        whileHover={{ scale: 1.02, backgroundColor: "rgb(250, 250, 249)" }}
                        className="flex items-center gap-4 p-4 rounded-[25px] transition-all group cursor-pointer"
                      >
                        <div className="w-10 h-10 bg-[#5a7c5a]/10 text-[#5a7c5a] rounded-2xl flex items-center justify-center transition-transform group-hover:-rotate-12">
                          <IoShieldCheckmarkOutline size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[13px] font-black text-stone-800">Security Core</p>
                          <p className="text-[9px] font-bold text-stone-400 uppercase tracking-tighter italic">Auth & Privacy</p>
                        </div>
                      </motion.div>
                    </Link>

                    {/* <div className="p-4 mt-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[28px] relative overflow-hidden group cursor-pointer">
                      <div className="relative z-10 flex items-center justify-between text-white">
                        <div>
                          <p className="text-[12px] font-black">Elite Hub</p>
                          <p className="text-[9px] font-bold opacity-70">Expand access</p>
                        </div>
                        <IoSparklesSharp className="animate-pulse" />
                      </div>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl group-hover:scale-150 transition-transform duration-700" />
                    </div> */}

                    <div className="mt-2 pt-2 border-t border-stone-100 px-2 pb-2">
                      <Link href="/authentication/login">
                        <button className="w-full flex items-center justify-between px-6 py-4 rounded-[22px] hover:bg-rose-50 text-stone-400 hover:text-rose-500 transition-all font-black text-[11px] uppercase tracking-[1.5px] group cursor-pointer">
                          Logout
                          <IoLogOutOutline size={18} className="transition-transform group-hover:translate-x-1" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </header>
  );
}
