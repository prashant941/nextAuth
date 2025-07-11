"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  avatar: string;
  bio?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user data from /api/auth/me after login
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          
          setUser({
            name: data.userObj.name,
            email: data.userObj.email,
            avatar: data.userObj.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.userObj.name)}`,
          });
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
