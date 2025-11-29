"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const menuItems = [
    { name: "Love Advice", slug: "/love-advice" },
    { name: "Relationship Tips", slug: "/relationship-tips" },
    { name: "Couple Guide", slug: "/couple-guide" },
    { name: "Breakup Help", slug: "/breakup-help" },
    { name: "Blogs", slug: "/blogs" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-8 h-8 transition-transform duration-300 group-hover:scale-110 text-rose-500"
            fill="currentColor"
          >
            <path d="M12 21s-6.5-4.2-9.2-7.2C.9 11.7 1.2 8.3 3.7 6.7c2.2-1.4 4.9-.7 6.3 1.1 1.4-1.8 4.1-2.5 6.3-1.1 2.5 1.6 2.8 5 .9 7.1C18.5 16.8 12 21 12 21z" />
          </svg>
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 bg-clip-text text-transparent">
              True
            </span>
            <span className="text-gray-800">feelings</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
          {menuItems.map((item, i) => (
            <Link key={i} href={item.slug}>
              <span
                className={`transition-all duration-200 px-2 py-1 rounded ${
                  isActive(item.slug)
                    ? "text-rose border-b-2 border-rose"
                    : scrolled
                    ? "text-gray-700 hover:text-rose"
                    : "text-rose-500 hover:text-rose hover:bg-white/10"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Mobile Icon */}
        <div className="md:hidden flex items-center">
          <Menu
            className="w-6 h-6 cursor-pointer text-black"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] h-screen backdrop-blur-lg bg-white flex flex-col px-6 py-4 animate-slide-in-right">
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-bold text-rose-500">Truefeelings</div>
            <X
              className="w-6 h-6 cursor-pointer text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>

          <hr className="my-2 border-gray-200" />

          <nav className="flex flex-col w-full space-y-2 font-semibold text-base">
            {menuItems.map((item, i) => (
              <Link key={i} href={item.slug} onClick={() => setIsMenuOpen(false)}>
                <span
                  className={`block px-4 py-2 rounded-md transition-all ${
                    isActive(item.slug)
                      ? "bg-rose-100 text-rose-500"
                      : "text-gray-700 hover:bg-rose-50 hover:text-rose-500"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex justify-center space-x-6 mt-6">
            <Facebook className="w-6 h-6 text-rose-500 hover:text-pink-500 cursor-pointer" />
            <Twitter className="w-6 h-6 text-rose-500 hover:text-pink-500 cursor-pointer" />
            <Instagram className="w-6 h-6 text-rose-500 hover:text-pink-500 cursor-pointer" />
            <Youtube className="w-6 h-6 text-rose-500 hover:text-pink-500 cursor-pointer" />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
