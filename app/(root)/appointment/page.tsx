"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Bell,
  Plus,
} from "lucide-react";

import { CreateAppointmentModal } from "@/components/create-appointment-modal";
import AppointmentDetails from "@/components/AppointmentDetails";
import { RescheduleAppointment } from "@/components/RescheduleAppointment";
import { AppointmentTable } from "@/components/AppointmentTable";
import { DoctorProfileModal } from "@/components/doctor-profile-modal";

const appointments = [
  {
    id: 1,
    doctor: "Dr. Mae Uzoh",
    time: "10:00 am - 11:00 am",
    date: new Date(2025, 0, 2), // Jan 2, 2025
    avatar: "/placeholder.svg?height=32&width=32",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: 2,
    doctor: "Dr. William",
    time: "10:00 am - 11:00 am",
    date: new Date(2025, 0, 4), // Jan 4, 2025
    avatar: "/placeholder.svg?height=32&width=32",
    color: "bg-orange-100 border-orange-300",
  },
  {
    id: 3,
    doctor: "Dr. Peter",
    time: "10:00 am - 11:00 am",
    date: new Date(2025, 0, 6), // Jan 6, 2025
    avatar: "/placeholder.svg?height=32&width=32",
    color: "bg-green-100 border-green-300",
  },
  {
    id: 4,
    doctor: "Dr. Peter",
    time: "10:00 am - 11:00 am",
    date: new Date(2025, 0, 12), // Jan 12, 2025
    avatar: "/placeholder.svg?height=32&width=32",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: 5,
    doctor: "Dr. Sarah",
    time: "2:00 pm - 3:00 pm",
    date: new Date(2025, 0, 16), // Jan 16, 2025
    avatar: "/placeholder.svg?height=32&width=32",
    color: "bg-purple-100 border-purple-300",
  },
  {
    id: 6,
    doctor: "Dr. Mike",
    time: "9:00 am - 10:00 am",
    date: new Date(2025, 0, 18), // Jan 18, 2025
    avatar: "/placeholder.svg?height=32&width=32",
    color: "bg-pink-100 border-pink-300",
  },
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const sampleDoctor = {
  id: 1,
  name: "Dr. Matthew Damilola",
  specialty: "Cardiologist",
  avatar: "/placeholder.svg?height=64&width=64",
  patients: 300,
  experience: 10,
  location: "Abuja",
  onlinePrice: "100,000",
  inPersonPrice: "150,000",
  about:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et mauris consectetur, ultricies mauris. Maecenas et amet sapien finibus, mollis quam consectetur, ultricies mauris. Maecenas et amet sapien finibus, mollis quam consectetur, ultricies mauris. Maecenas et amet sapien finibus, mollis quam.",
  timeSlots: [
    {
      day: "Monday",
      slots: {
        am: ["10:00", "11:00"],
        pm: ["12:00", "01:00"],
      },
    },
    {
      day: "Tuesday",
      slots: {
        am: ["10:00", "11:00"],
        pm: ["12:00", "01:00", "02:00", "03:00"],
      },
    },
    {
      day: "Wednesday",
      slots: {
        am: ["10:00", "11:00"],
        pm: ["12:00", "01:00"],
      },
    },
    {
      day: "Friday",
      slots: {
        am: ["10:00", "11:00"],
        pm: ["12:00", "01:00"],
      },
    },
  ],
  reviews: [
    {
      id: 1,
      name: "Frank Miles",
      date: "10/11/2023",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et mauris consectetur, ultricies mauris. Maecenas et amet sapien finibus, mollis quam consectetur, ultricies mauris.",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Robert Fox",
      date: "10/11/2023",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et mauris consectetur, ultricies mauris. Maecenas et amet sapien finibus, mollis quam consectetur, ultricies mauris.",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "Courtney Henry",
      date: "10/11/2023",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et mauris consectetur, ultricies mauris. Maecenas et amet sapien finibus, mollis quam consectetur, ultricies mauris.",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
};

export default function AppointmentsPage() {
  const [viewMode, setViewMode] = useState("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // Start with January 2025
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [openAppointmentDetails, setOpentAppointmentDetails] = useState(false);
  const [openReschedule, setOpenReschedule] = useState(false);
  const [isDoctorProfileOpen, setIsDoctorProfileOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(sampleDoctor);
  const today = new Date();

  // Generate calendar days for the current month
  useEffect(() => {
    const days = generateCalendarDays(currentDate);
    setCalendarDays(days);
  }, [currentDate]);

  // Function to generate calendar days
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Get first day of the month and last day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    const startDayOfWeek = firstDay.getDay();

    // Calculate how many days from previous month to show
    const daysFromPrevMonth = startDayOfWeek;

    // Calculate how many days from next month to show
    const daysInMonth = lastDay.getDate();
    const totalCells = Math.ceil((daysFromPrevMonth + daysInMonth) / 7) * 7;
    const daysFromNextMonth = totalCells - daysFromPrevMonth - daysInMonth;

    const days: Date[] = [];

    // Add days from previous month
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      days.push(
        new Date(year, month - 1, new Date(year, month, 0).getDate() - i)
      );
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    // Add days from next month
    for (let i = 1; i <= daysFromNextMonth; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  // Function to navigate to the previous month
  const goToPreviousMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(newDate);
  };

  // Function to navigate to the next month
  const goToNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(newDate);
  };

  // Function to get appointment for a specific day
  const getAppointmentForDay = (day: Date) => {
    return appointments.find(
      (apt) =>
        apt.date.getDate() === day.getDate() &&
        apt.date.getMonth() === day.getMonth() &&
        apt.date.getFullYear() === day.getFullYear()
    );
  };

  // Function to check if a date is today
  const isToday = (day: Date) => {
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  };

  // Function to check if a date is in the current month
  const isCurrentMonth = (day: Date) => {
    return (
      day.getMonth() === currentDate.getMonth() &&
      day.getFullYear() === currentDate.getFullYear()
    );
  };

  // Format month and year
  const formatMonthYear = (date: Date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Format date range
  const formatDateRange = () => {
    if (calendarDays.length === 0) return "";
    const firstDay = calendarDays[0];
    const lastDay = calendarDays[calendarDays.length - 1];

    const formatDate = (date: Date) => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${months[date.getMonth()]} ${date.getDate()}`;
    };

    return `Showing ${formatDate(firstDay)} - ${formatDate(
      lastDay
    )} ${lastDay.getFullYear()}`;
  };

  // Format appointment date for mobile view
  const formatAppointmentDate = (date: Date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  const openDoctorProfile = () => {
    setIsDoctorProfileOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Create Appointment Modal */}
      <CreateAppointmentModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
      {/* Appointment details */}
      <AppointmentDetails
        open={openAppointmentDetails}
        onOpenChange={setOpentAppointmentDetails}
      />

      {/* Reschedule Appointment */}
      <RescheduleAppointment
        open={openReschedule}
        onOpenChange={setOpenReschedule}
      />

      {/* Doctor Profile */}
      <DoctorProfileModal
        open={isDoctorProfileOpen}
        onOpenChange={setIsDoctorProfileOpen}
        doctor={selectedDoctor}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <div className="h-16 bg-white shadow-md flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-900 ml-12 lg:ml-0">
              Appointments
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
                  alt="Albert Flores"
                />
                <AvatarFallback>AF</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-sm">
                <p className="font-medium">Albert Flores</p>
                <p className="text-xs text-gray-500">Patient</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-3 sm:p-4 lg:p-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white mb-4 sm:mb-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">
                  Manage your Appointments
                </h2>
                <p className="text-blue-100 text-sm sm:text-base">
                  Stay on schedule with upcoming visits and checkups.
                </p>
              </div>
              <Button
                className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mb-4 sm:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for anything"
                className="pl-10 w-full !outline-none !ring-0 !border-[0.5px] border-gray-200 !focus:ring-0 !focus:outline-none"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col space-y-4 mb-4 sm:mb-6 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="font-medium">All Appointments</span>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search for an appointment"
                  className=" !outline-none !ring-0 !border-[0.5px] border-gray-200 !focus:ring-0 !focus:outline-none pl-10 w-full sm:w-64"
                />
              </div>

              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-auto">
                <option>Week</option>
                <option>Month</option>
                <option>Day</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Header */}
          <div className="flex flex-col space-y-2 mb-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">
                {formatMonthYear(currentDate)}
              </h3>
              <Button variant="ghost" size="sm" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500">{formatDateRange()}</p>
          </div>

          {/* Calendar Grid - Desktop */}
          {viewMode === "list" ? (
            <AppointmentTable onViewDoctor={openDoctorProfile} />
          ) : (
            <div className="hidden md:block bg-white rounded-lg border-[0.5px] border-gray-200 overflow-hidden">
              {/* Days of Week Header */}
              <div className="grid grid-cols-7 border-b-[0.5px] border-gray-200">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="p-3 lg:p-4 text-center text-sm font-medium text-gray-500 border-r last:border-r-0"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => {
                  const appointment = getAppointmentForDay(day);
                  const isCurrentMonthDay = isCurrentMonth(day);
                  const isTodayDate = isToday(day);

                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] lg:min-h-[120px] p-2 lg:p-3 border-r-[0.5px] border-b-[0.5px] border-gray-200 last:border-r-0 ${
                        !isCurrentMonthDay ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <div
                        className={`text-sm font-medium mb-2 ${
                          !isCurrentMonthDay
                            ? "text-gray-400"
                            : isTodayDate
                            ? "text-blue-600 font-bold"
                            : "text-gray-900"
                        }`}
                      >
                        {day.getDate()}
                      </div>

                      {appointment && (
                        <div
                          onClick={() => setOpentAppointmentDetails(true)}
                          className={`p-1 lg:p-2 rounded-lg border-l-4 ${appointment.color} cursor-pointer`}
                        >
                          <div className="flex items-center space-x-1 lg:space-x-2 mb-1">
                            <Avatar className="h-4 w-4 lg:h-6 lg:w-6">
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
                            <span className="text-xs font-medium text-gray-900 truncate">
                              {appointment.doctor}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 hidden lg:block">
                            {appointment.time}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mobile List View */}
          {viewMode !== "list" && (
            <div className="md:hidden space-y-3">
              <h3 className="text-lg font-semibold mb-4">
                Upcoming Appointments
              </h3>
              {appointments
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`p-4 rounded-lg border-l-4 ${appointment.color} bg-white shadow-sm`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={appointment.avatar}
                            alt={appointment.doctor}
                          />
                          <AvatarFallback>
                            {appointment.doctor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{appointment.doctor}</h4>
                          <p className="text-sm text-gray-600">
                            {appointment.time}
                          </p>
                        </div>
                      </div>
                      <Badge>{formatAppointmentDate(appointment.date)}</Badge>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto cursor-pointer"
                        onClick={() => setOpenReschedule(true)}
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
