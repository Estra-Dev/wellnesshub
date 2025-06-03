"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MessageCircle,
  FileText,
  Search,
  Settings,
  Home,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, badge: 0 },
  { name: "Appointments", href: "/appointment", icon: Calendar, badge: 0 },
  { name: "Messages", href: "/messages", icon: MessageCircle, badge: 10 },
  { name: "Medical Record", href: "/medical-record", icon: FileText, badge: 0 },
  { name: "Explore", href: "/explore", icon: Search, badge: 0 },
  { name: "Settings", href: "/settings", icon: Settings, badge: 0 },
];

export function NavBar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle window resize to close sidebar on larger screens
  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-sm transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${className}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b-[0.2px] border-b-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center">
              <Image
                src={"/logo.png"}
                alt="logo"
                width={200}
                height={200}
                className=" w-full object-cover"
              />
            </div>
            <span className="text-xl font-semibold text-blue-600">
              WellnessHub
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </div>
                    {item.badge > 0 && (
                      <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t-[0.2px] border-t-gray-200 bg-white">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Albert Flores"
              />
              <AvatarFallback>AF</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Albert Flores
              </p>
              <p className="text-xs text-gray-500 truncate">
                albertflores@gmail.com
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </aside>
    </>
  );
}
