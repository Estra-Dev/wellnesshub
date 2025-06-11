"use client";

import "../globals.css";
import { NavBar } from "@/components/NavBar";
import { useAuth } from "@/components/Auth-Provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render the dashboard layout if authenticated
  if (!isAuthenticated) {
    return null; // Auth provider will handle redirect
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="min-h-screen">
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
