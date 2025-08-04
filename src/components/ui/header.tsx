"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Github, Youtube, Menu, X } from "lucide-react";

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-black/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Header Left - Navigation Links */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className="font-medium text-white transition-colors duration-200 hover:text-[#70cd35]"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="font-medium text-white transition-colors duration-200 hover:text-[#70cd35]"
            >
              Blog
            </Link>
          </nav>

          {/* Header Right - Contact and Socials */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/contact"
              className="font-medium text-white transition-colors duration-200 hover:text-[#70cd35]"
            >
              Contact
            </Link>

            {/* Socials Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 font-medium text-white transition-colors duration-200 hover:text-[#70cd35]"
              >
                <span>Socials</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-700 bg-gray-900 shadow-lg">
                  <div className="py-1">
                    <a
                      href="https://github.com/PinewoodRobotics"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-gray-800"
                    >
                      <Github className="mr-3 h-4 w-4" />
                      GitHub
                    </a>
                    <a
                      href="https://youtube.com/@pinewoodrobotics"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-gray-800"
                    >
                      <Youtube className="mr-3 h-4 w-4" />
                      YouTube
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-[#70cd35] focus:ring-2 focus:ring-[#70cd35] focus:outline-none focus:ring-inset"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 bg-black/90 px-2 pt-2 pb-3 backdrop-blur-md">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-[#70cd35]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-[#70cd35]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-[#70cd35]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Socials */}
            <div className="border-t border-gray-700 pt-4">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-gray-400">Socials</p>
                <div className="mt-2 space-y-1">
                  <a
                    href="https://github.com/PinewoodRobotics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center rounded-md px-3 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    <Github className="mr-3 h-4 w-4" />
                    GitHub
                  </a>
                  <a
                    href="https://youtube.com/@pinewoodrobotics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center rounded-md px-3 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    <Youtube className="mr-3 h-4 w-4" />
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {(isDropdownOpen || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => {
            setIsDropdownOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </header>
  );
}
