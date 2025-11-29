import React from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Love Stories", href: "/love-stories" },
    { name: "Relationship Advice", href: "/relationship-advice" },
    { name: "Breakup Healing", href: "/healing" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
  ]

  return (
    <footer className="bg-[#fefce8] text-gray-800 border-t border-[#e5ddc6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & About */}
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-rose-500 mb-4">TrueFeelings</h3>
            <p className="text-base text-gray-700 leading-relaxed">
              A place where hearts heal, souls connect, and stories are shared. Whether you're in love, healing, or learning — we're here for every phase of your journey.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center">
            <h4 className="text-xl font-semibold text-rose-500 mb-4">Explore</h4>
            <ul className="space-y-2">
              {links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-rose-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-right">
            <h4 className="text-xl font-semibold text-rose-500 mb-4">Stay Connected</h4>
            <div className="flex justify-center md:justify-end gap-4 mb-4">
              <Link href="https://facebook.com" target="_blank" className="text-gray-700 hover:text-rose-500 transition-colors duration-200">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="text-gray-700 hover:text-rose-500 transition-colors duration-200">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-gray-700 hover:text-rose-500 transition-colors duration-200">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="text-gray-700 hover:text-rose-500 transition-colors duration-200">
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
            <p className="text-sm text-gray-600">
              Email:{" "}
              <Link
                href="mailto:connect@loveconnect.com"
                className="hover:text-rose-500 transition-colors duration-200"
              >
                connect@loveconnect.com
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
          © 2025 <span className="text-rose-500 font-medium">TrueFeelings</span>. Love deeply, heal gently, grow always.
        </div>
      </div>
    </footer>
  )
}
