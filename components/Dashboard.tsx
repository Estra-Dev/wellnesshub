"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Search,
  Bell,
  Flame,
  Footprints,
  Heart,
  Moon,
  Plus,
} from "lucide-react";
import Image from "next/image";

const healthMetrics = [
  {
    id: 1,
    title: "Calories Burnt",
    value: "1000",
    unit: "kcal",
    status: "Good",
    icon: Flame,
    color: "text-red-500",
    bgColor: "bg-orange-50",
    description: "Average calories burnt over all activities",
  },
  {
    id: 2,
    title: "Steps Taken",
    value: "600",
    unit: "Steps",
    status: "Normal",
    icon: Footprints,
    color: "text-green-500",
    bgColor: "bg-green-50",
    description: "Average steps taken over the whole day",
  },
  {
    id: 3,
    title: "Heart Rate",
    value: "88",
    unit: "BPM",
    status: "Normal",
    icon: Heart,
    color: "text-orange-500",
    bgColor: "bg-red-50",
    description: "Average heart rate over the whole day",
  },
  {
    id: 4,
    title: "Sleeping Hours",
    value: "10",
    unit: "hours",
    status: "Normal",
    icon: Moon,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    description: "Average sleeping hours over the whole day",
  },
];

const todaysAppointments = [
  {
    id: 1,
    time: "08:00",
    title: "Physical Checkup",
    doctor: "Dr. Oliver Rodgers",
    avatar: "/placeholder.svg?height=32&width=32",
    position: { x: 8, y: 60 }, // Position on timeline
  },
  {
    id: 2,
    time: "12:00",
    title: "Physical Checkup",
    doctor: "Brooklyn Simmons",
    avatar: "/placeholder.svg?height=32&width=32",
    position: { x: 33, y: 20 }, // Position on timeline
  },
  {
    id: 3,
    time: "15:00",
    title: "Physical Checkup",
    doctor: "Kristin Watson",
    avatar: "/placeholder.svg?height=32&width=32",
    position: { x: 50, y: 80 }, // Position on timeline
  },
  {
    id: 4,
    time: "18:00",
    title: "Physical Checkup",
    doctor: "Leslie Alexander",
    avatar: "/placeholder.svg?height=32&width=32",
    position: { x: 75, y: 40 }, // Position on timeline
  },
  {
    id: 5,
    time: "19:00",
    title: "Physical Checkup",
    doctor: "Jane Cooper",
    avatar: "/placeholder.svg?height=32&width=32",
    position: { x: 83, y: 150 }, // Position on timeline
  },
];

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good":
        return "text-green-600";
      case "Normal":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <div className="h-16 bg-white border-b-[0.2px] border-b-gray-100 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-blue-600 ml-10 border-b-2 border-b-blue-500 lg:ml-0">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search - Hide on small screens */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for anything"
                className="pl-10 w-32 md:w-60 lg:w-80 !outline-none !ring-0 !border-[0.5px] border-gray-200 !focus:ring-0 !focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="Vivian Nwadineke"
                />
                <AvatarFallback>VN</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-sm">
                <p className="font-medium">Vivian Nwadineke</p>
                <p className="text-xs text-gray-500">vivian@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-3 sm:p-4 lg:p-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-300 sm:via-blue-200 sm:to-blue-200 rounded-xl p-4 pb-0 sm:pt-4 text-white mb-6 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between max-w-6xl w-full mx-auto">
              <div className="mb-4 lg:mb-0">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">
                  Welcome back Nwadineke 👋
                </h2>
                <span className=" flex flex-col sm:flex-row sm:gap-3 sm:items-center font-semibold">
                  <p className="text-white text-sm sm:text-base">
                    Have a healthy day ahead
                  </p>
                  <p className="text-white sm:text-sm text-sm">
                    Sunday 12th January, 2025,{" "}
                    <span className=" text-blue-500">10:00 am</span>
                  </p>
                </span>
              </div>
              <div className="hidden lg:block h-20 sm:h-32">
                <Image
                  src="/cuate.png"
                  alt="Health illustration"
                  width={500}
                  height={400}
                  className="h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mb-6 sm:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for anything"
                className="pl-10 w-full !outline-none !ring-0 !border-[0.5px] border-gray-200 !focus:ring-0 !focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Health Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {healthMetrics.map((metric) => (
              <Card
                key={metric.id}
                className="hover:shadow-md transition-shadow border-0"
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-lg ${metric.bgColor} flex-shrink-0`}
                    >
                      <metric.icon
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${metric.color}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-medium ${metric.color} mb-1 text-sm sm:text-base`}
                      >
                        {metric.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-tight hidden sm:block">
                        {metric.description}
                      </p>
                      <div className="flex items-baseline space-x-1 mt-1">
                        <span
                          className={`${metric.color} text-lg sm:text-xl font-bold`}
                        >
                          {metric.value}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          {metric.unit}
                        </span>{" "}
                        <span className=" text-xs text-gray-500">|</span>
                        <span className={`text-xs font-medium text-gray-700`}>
                          {metric.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Today's Appointments */}
          <Card className=" border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
                <h3 className="text-lg font-semibold flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Today's Appointments
                </h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-1 text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 font-medium"
                    >
                      Day
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      Week
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      Month
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      Year
                    </Button>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Appointment
                  </Button>
                </div>
              </div>

              {/* Desktop Timeline */}
              <div className="hidden lg:block">
                <div className="relative">
                  {/* Time slots header */}
                  <div className="flex items-center mb-6">
                    {timeSlots.map((time, index) => (
                      <div
                        key={`${time}-${index}`}
                        className="flex-1 text-center"
                      >
                        <span className="text-xs text-gray-500">{time}</span>
                      </div>
                    ))}
                  </div>

                  {/* Timeline container */}
                  <div className="relative h-52">
                    {/* Main timeline line */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-300"></div>

                    {/* Time markers on timeline */}
                    {timeSlots.map((time, index) => (
                      <div
                        key={`marker-${time}-${index}`}
                        className="absolute top-0 w-0.5 h-full bg-gray-300/15"
                        style={{
                          left: `${(index / (timeSlots.length - 1)) * 100}%`,
                        }}
                      ></div>
                    ))}

                    {/* Appointments with connecting lines */}
                    {todaysAppointments.map((appointment) => (
                      <div key={appointment.id}>
                        {/* Timeline dot */}
                        <div
                          className="absolute w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-sm"
                          style={{
                            left: `${appointment.position.x}%`,
                            top: "-6px",
                            transform: "translateX(-50%)",
                          }}
                        ></div>

                        {/* Connecting line */}
                        <div
                          className="absolute w-0.5 bg-blue-300"
                          style={{
                            left: `${appointment.position.x}%`,
                            top: "6px",
                            height: `${appointment.position.y - 6}px`,
                            transform: "translateX(-50%)",
                          }}
                        ></div>

                        {/* Appointment card */}
                        <div
                          className="absolute bg-white border border-gray-200 rounded-full p-3 shadow-sm min-w-[160px]"
                          style={{
                            left: `${appointment.position.x}%`,
                            top: `${appointment.position.y}px`,
                            transform: "translateX(-50%)",
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={appointment.avatar || "/placeholder.svg"}
                                alt={appointment.doctor}
                              />
                              <AvatarFallback className="text-xs">
                                {appointment.doctor
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-blue-600 truncate">
                                {appointment.title}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {appointment.doctor}
                              </p>
                              <p className="text-xs text-gray-400">
                                {appointment.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Appointments List */}
              <div className="lg:hidden space-y-3">
                {todaysAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={appointment.avatar || "/placeholder.svg"}
                        alt={appointment.doctor}
                      />
                      <AvatarFallback>
                        {appointment.doctor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-blue-600">
                        {appointment.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appointment.doctor}
                      </p>
                    </div>
                    <Badge variant="outline">{appointment.time}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
