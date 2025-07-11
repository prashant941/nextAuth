"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        router.push("/login");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-blue-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
          Sign Up
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-sm text-center">
            {error}
          </div>
        )}
        <div className="relative">
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="peer w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
            autoComplete="name"
          />
          <label
            htmlFor="name"
            className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-focus:-translate-y-2 peer-focus:scale-90 peer-focus:text-blue-500 dark:peer-focus:text-blue-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none"
          >
            Name
          </label>
        </div>
        <div className="relative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="peer w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
            autoComplete="email"
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-focus:-translate-y-2 peer-focus:scale-90 peer-focus:text-blue-500 dark:peer-focus:text-blue-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none"
          >
            Email
          </label>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="peer w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
            autoComplete="new-password"
          />
          <label
            htmlFor="password"
            className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-focus:-translate-y-2 peer-focus:scale-90 peer-focus:text-blue-500 dark:peer-focus:text-blue-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 pointer-events-none"
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.4-3.217 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.875-4.575A9.978 9.978 0 0122 9c0 5.523-4.477 10-10 10a9.978 9.978 0 01-4.575-1.125" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.021-2.021A9.956 9.956 0 0121 12c0 5.523-4.477 10-10 10-2.21 0-4.257-.715-5.979-1.929M4.929 4.929A9.956 9.956 0 013 12c0 5.523 4.477 10 10 10 2.21 0 4.257-.715 5.979-1.929" /></svg>
            )}
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Already have an account? <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
