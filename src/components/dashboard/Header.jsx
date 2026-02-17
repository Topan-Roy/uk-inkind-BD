"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoNotificationsOutline,
  IoBookOutline,
  IoCalendarOutline,
  IoStatsChartOutline,
  IoCheckmarkCircleOutline
} from "react-icons/io5";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-end px-8 py-6 bg-transparent relative z-[100]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xl rounded-full p-1.5 shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-white/60 relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-full transition-all duration-500 cursor-pointer relative group ${showNotifications ? "bg-[#5a7c5a] text-white" : "text-stone-500 hover:text-[#5a7c5a] hover:bg-[#5a7c5a]/5"
              }`}
          >
            <IoNotificationsOutline className={`w-5 h-5 transition-transform duration-300 ${showNotifications ? "" : "group-hover:rotate-12"}`} />

            <AnimatePresence>
              {notifications.some(n => n.unread) && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm"
                />
              )}
            </AnimatePresence>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="absolute top-full right-0 mt-5 w-[360px] bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] border border-white/50 overflow-hidden origin-top-right"
              >
                {/* Custom Gradient Header */}
                <div className="p-6 bg-gradient-to-br from-[#5a7c5a]/10 via-transparent to-transparent flex items-center justify-between">
                  <div>
                    <h3 className="text-stone-800 font-bold text-xl tracking-tight">Activity Center</h3>
                    <p className="text-stone-400 text-[11px] font-medium uppercase tracking-[1.2px] mt-0.5">Your updates for today</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#5a7c5a] text-white px-3 py-1.5 rounded-full shadow-lg shadow-[#5a7c5a]/20">
                    <span className="text-[10px] font-bold">{notifications.filter(n => n.unread).length}</span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wide">New</span>
                  </div>
                </div>

                <div className="px-3 pb-3 max-h-[420px] overflow-y-auto space-y-2">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`group p-4 rounded-[24px] transition-all duration-300 cursor-pointer relative ${notification.unread
                          ? "bg-[#5a7c5a]/5 hover:bg-[#5a7c5a]/10"
                          : "bg-stone-50/50 hover:bg-stone-100/80"
                        }`}
                    >
                      <div className="flex gap-4">
                        {/* Unique Icon Design */}
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 ${notification.color} text-white`}>
                          {notification.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`text-sm font-bold truncate transition-colors duration-300 ${notification.unread ? "text-stone-800" : "text-stone-600"}`}>
                              {notification.title}
                            </h4>
                            <span className="text-[9px] text-stone-400 font-bold whitespace-nowrap ml-2">{notification.time}</span>
                          </div>
                          <p className="text-stone-500 text-[12px] leading-snug line-clamp-2">
                            {notification.description}
                          </p>
                        </div>

                        {notification.unread && (
                          <div className="w-1.5 h-1.5 bg-[#5a7c5a] rounded-full self-center ml-1 shadow-[0_0_8px_rgba(90,124,90,0.6)]" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-stone-50/40 border-t border-stone-100/50 text-center">
                  <button className="flex items-center justify-center gap-2 w-full py-2.5 text-[#5a7c5a] text-[13px] font-bold hover:text-[#4a6b4a] transition-all group cursor-pointer">
                    View Complete History
                    <IoCheckmarkCircleOutline className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-9 h-9 bg-stone-100 rounded-full overflow-hidden border-2 border-white shadow-sm cursor-pointer hover:border-[#5a7c5a]/30 transition-all">
            <img
              className="w-full h-full object-cover"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
