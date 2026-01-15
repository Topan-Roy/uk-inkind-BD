"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RecoverCodePage() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp);
    router.push("/authentication/reset-password");
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-[#4A7C59] flex items-center justify-center px-16">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-[#FFFFFF] text-3xl font-normal mb-2">
              Recover Account
            </h1>
            <p className="text-white/90 text-[14px]">
              Enter your email and we will send you a recovery code
            </p>
          </div>
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div>
              <label className="block text-white text-sm mb-2">
                Recovery Code
              </label>
              <input
                type="email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Recovery Code"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/40 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                required
              />
            </div>
            <Link href="/authentication/reset-password">
              <button
                type="submit"
                className="w-full text-xl bg-[#FFE6C9] hover:bg-[#eddcc4] text-stone-900 font-semibold py-3 rounded-lg transition-colors duration-200 mt-4"
              >
                Next
              </button>
            </Link>
            <div className="text-center mt-4">
              <button
                type="button"
                className="text-white/90 text-sm hover:underline"
              >
                Didn't receive the code? Resend
              </button>
            </div>

            <Link
              href="/authentication/login"
              className="flex items-center justify-center gap-2 text-white/90 hover:text-white transition-colors mt-6 text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Login
            </Link>
          </form>
        </div>
      </div>

      <div className="w-1/2 bg-white">
        <img
          src="/homeImage/loginimg.png"
          alt="Recover Account"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
