"use client";
import React from "react";

import { useUser } from "../../context/UserContext";

export default function ProfilePage() {
  const { user } = useUser();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <div className="flex flex-col items-center">
          <img
            src={user?.avatar || "https://ui-avatars.com/api/?name=Guest"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4 shadow-md"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{user ? user.name : "Guest"}</h2>
          <p className="text-gray-500 mb-2">{user ? user.email : "Not logged in"}</p>
          {/* Add a bio or additional info if available */}
          {user && user.bio && (
            <p className="text-gray-600 mb-4">{user.bio}</p>
          )}
          <button
            className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
