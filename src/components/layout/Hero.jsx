'use client'

import React from "react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-rose-100 via-pink-50 to-purple-50 overflow-hidden">
      {/* Background illustration */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE2E2" />
              <stop offset="100%" stopColor="#F5D0FE" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 flex flex-col md:flex-row items-center md:justify-between gap-10">
        {/* Left content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            TrueFeelings: <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 bg-clip-text text-transparent">Your Heart, Your Story</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-8">
            Discover love advice, relationship tips, couple guides, and personal stories that inspire, heal, and connect hearts.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link
              href="/blogs"
              className="px-6 py-3 bg-rose-500 text-white rounded-lg shadow-lg font-semibold hover:bg-rose-600 transition-colors duration-200 text-center"
            >
              Explore Blogs
            </Link>
            <Link
              href="/love-stories"
              className="px-6 py-3 border border-rose-500 text-rose-500 rounded-lg font-semibold hover:bg-rose-50 transition-colors duration-200 text-center"
            >
              Read Love Stories
            </Link>
          </div>
        </div>

        {/* Right content / image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src="https://res.cloudinary.com/dsc5aznps/image/upload/v1764423345/posts/b4h68sz4bxoy5g9tcecl.png"
            alt="Couple illustration"
            className="w-full max-w-md animate-float"
          />
        </div>
      </div>

      {/* Floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
