"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface RescheduleAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment?: {
    id: number;
    doctor: string;
    specialty: string;
    originalDate: Date;
    originalTime: string;
    avatar: string;
  };
}

export function RescheduleAppointment({
  open,
  onOpenChange,
  appointment,
}: RescheduleAppointmentModalProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0, 1)); // January 2025

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Available time slots
  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const handleConfirmReschedule = () => {
    if (selectedDate && selectedTimeSlot) {
      // Handle reschedule logic here
      console.log(`Rescheduling to ${selectedDate} at ${selectedTimeSlot}`);
      onOpenChange(false);
    }
  };

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

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 bg-white">
        <DialogHeader className="p-6">
          <div className="flex items-center justify-center">
            <DialogTitle className=" text-gray-800 text-xl">
              Reschedule <span className="text-blue-600">Appointment</span>
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Doctor Info */}
          {appointment && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              {/* <Avatar className="h-12 w-12">
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
              </Avatar> */}
              <div className="flex items-center gap-2 mt-2">
                <Image
                  src="/doctor-avatar.jpg"
                  alt="doctor"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <p className="text-sm ">With Dr Mike Uzoh</p>
              </div>
              {/* <div>
                <h4 className="font-medium">{appointment.doctor}</h4>
                <p className="text-sm text-gray-600">{appointment.specialty}</p>
              </div> */}
            </div>
          )}

          {/* Select New Date */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Select New Date</h4>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={goToPreviousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  {formatMonthYear(currentMonth)}
                </span>
                <Button variant="ghost" size="sm" onClick={goToNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Calendar */}
            <div className="rounded-lg overflow-hidden">
              {/* Days of Week Header */}
              <div className="grid grid-cols-7 bg-gray-50">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="p-2 text-center text-xs font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`p-2 text-center w-10 h-10 rounded-full text-sm ${
                      day === null
                        ? "text-gray-300"
                        : selectedDate === day
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 cursor-pointer"
                    }`}
                    onClick={() => day && setSelectedDate(day)}
                  >
                    {day || ""}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Select New Time */}
          <div className="space-y-4">
            <h4 className="font-medium">Select New Time</h4>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedTimeSlot || ""}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                >
                  <option value="">Select start time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-gray-500">—</span>
              <div className="flex-1">
                <select
                  className="w-full p-2 border-[0.5px] border-gray-200 rounded-md outline-none focus:outline-none"
                  disabled
                  value={
                    selectedTimeSlot
                      ? timeSlots[timeSlots.indexOf(selectedTimeSlot) + 1] || ""
                      : ""
                  }
                >
                  <option value="">End time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t">
          <Button
            onClick={handleConfirmReschedule}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            disabled={!selectedDate || !selectedTimeSlot}
          >
            Confirm New Schedule
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
