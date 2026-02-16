"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

const bgImages = {
  "/dashboard": "/homeImage/background.jpg",
  "/dashboard/progress":
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
  "/dashboard/homework":
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
  "/dashboard/emotions":
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
  "/dashboard/resources":
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop",
};

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const currentBg = bgImages[pathname] || "/homeImage/background.jpg";
  const isSessionPage = pathname === "/dashboard/resources/bilateral/session";

  return (
    <div className="flex h-screen w-full relative overflow-hidden">
      {!isSessionPage && (
        <div className="absolute inset-0 z-0">
          <img
            src={currentBg}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
            key={currentBg}
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      )}
      {!isSessionPage && (
        <div className="relative z-10 h-full">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 flex flex-col relative z-20 overflow-hidden">
        <div className="flex flex-col h-full overflow-hidden">
          {!isSessionPage && <Header />}
          <main
            className={`flex-1 overflow-y-auto ${isSessionPage ? "p-0" : "p-8 pt-2"
              }`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
