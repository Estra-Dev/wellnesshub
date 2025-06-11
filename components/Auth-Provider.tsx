"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (userData: any) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Auth routes that don't require authentication
  const authRoutes = [
    "/auth/signin",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/verify-email",
  ];
  const isAuthRoute = authRoutes.some(
    (route) => pathname?.startsWith(route) || false
  );

  useEffect(() => {
    // Check authentication status on mount
    checkAuthStatus();
  }, []);

  useEffect(() => {
    // Handle routing based on auth status
    if (!isLoading) {
      if (isAuthenticated && isAuthRoute) {
        // If user is authenticated and on auth page, redirect to dashboard
        router.push("/");
      } else if (!isAuthenticated && !isAuthRoute && pathname !== "/") {
        // If user is not authenticated and not on auth page, redirect to login
        router.push("/auth/signin");
      } else if (!isAuthenticated && pathname === "/") {
        // If user is not authenticated and on root page, redirect to login
        router.push("/auth/signin");
      }
    }
  }, [isAuthenticated, isLoading, isAuthRoute, pathname, router]);

  const checkAuthStatus = () => {
    try {
      // Only run on client side
      if (typeof window !== "undefined") {
        const authStatus = localStorage.getItem("isAuthenticated");
        const userData = localStorage.getItem("userData");

        if (authStatus === "true" && userData) {
          setIsAuthenticated(true);
          setUser(JSON.parse(userData));
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData: any) => {
    try {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userData", JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
      router.push("/");
    } catch (error) {
      console.error("Error during signin:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userData");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("emailVerified");
      localStorage.removeItem("pendingUser");
      setIsAuthenticated(false);
      setUser(null);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
