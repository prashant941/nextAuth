"use client";
import React from "react";
import Link from "next/link";

import { useUser } from "../context/UserContext";

export default function Header() {
  const { user } = useUser();
  
  return (
    <header className="w-full bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4 md:px-8">
        {/* Logo / App Name */}
        <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          MyApp
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/profile" className="hover:text-blue-600 transition">Profile</Link>
          <Link href="/login" className="hover:text-blue-600 transition">Login</Link>
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-3">
          <span className="hidden md:block text-gray-600">{user ? user.name : "Guest"}</span>
          <img
            src={user?.avatar || "https://ui-avatars.com/api/?name=Guest"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-blue-500 shadow"
          />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
            aria-label="Open menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
