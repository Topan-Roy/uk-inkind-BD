"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "My EMDR", href: "/dashboard" },
    { name: "My Progress", href: "/dashboard/progress" },
    { name: "My Homework", href: "/dashboard/homework" },
    { name: "My Resources", href: "/dashboard/resources" },
  ];

  return (
    <div className="w-64 h-screen   text-white flex flex-col relative overflow-hidden border-r border-white/20">
      <div className="absolute inset-0 bg-[url('/sidebar-bg.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="p-6 relative z-10 flex flex-col h-full">
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24  flex items-center justify-center mb-2">
            <img
              src="/homeImage/loginimg.png"
              alt="UK Inkind"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard" ||
                  pathname.startsWith("/dashboard/assessments") ||
                  pathname.startsWith("/dashboard/new-roadmap") ||
                  pathname.startsWith("/dashboard/EMDRCompanion")
                : pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 rounded-lg text-[16px] font-medium transition-colors ${
                  isActive
                    ? "bg-[#4A7C59] text-[#FBFBFC] shadow-sm"
                    : "text-black bg-[#FBFBFC] hover:bg-[#6B9071]/50 hover:text-[#FBFBFC]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="mb-50">
          <Link href="/authentication/login">
            <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-black bg-white hover:bg-[#6B9071]/50 hover:text-[#FBFBFC] transition-colors w-full rounded-lg shadow-sm cursor-pointer">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
