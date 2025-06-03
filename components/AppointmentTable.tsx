"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  List,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import { RescheduleAppointment } from "./RescheduleAppointment";
import { DoctorProfileModal } from "./doctor-profile-modal";

const appointmentsData = [
  {
    id: 1,
    doctor: "Dr. Matthew",
    specialty: "Cardiologist",
    location: "In Person",
    status: "Confirmed",
    date: "3rd January, 2025",
    time: "10:00 AM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    doctor: "Dr. Patel",
    specialty: "Neurologist",
    location: "Virtual",
    status: "Rescheduled",
    date: "3rd January, 2025",
    time: "2:00 PM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    doctor: "Annette Black",
    specialty: "Dentist",
    location: "In Person",
    status: "Pending",
    date: "3rd January, 2025",
    time: "4:00 PM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    doctor: "Albert Flores",
    specialty: "Optician",
    location: "Virtual",
    status: "Cancelled",
    date: "3rd January, 2025",
    time: "6:00 PM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    doctor: "Darrell Steward",
    specialty: "Cardiologist",
    location: "In Person",
    status: "Confirmed",
    date: "3rd January, 2025",
    time: "8:00 PM",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const statusColors = {
  Confirmed: "bg-green-100 text-green-800",
  Rescheduled: "bg-blue-100 text-blue-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

interface AppointmentsTableProps {
  onViewDoctor?: () => void;
}

export function AppointmentTable({ onViewDoctor }: AppointmentsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);

  const handleReschedule = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsRescheduleModalOpen(true);
  };

  const filteredAppointments = appointmentsData.filter(
    (appointment) =>
      appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="bg-white rounded-lg border borber-[0.5px] border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b borber-[0.5px] border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">
                  Doctor's Name
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Specialty
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Location
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Appointment Status
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Date & Time
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className=" hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
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
                      <button
                        className="font-medium hover:text-blue-600 transition-colors text-gray-800"
                        onClick={onViewDoctor}
                        title="View doctor profile"
                      >
                        {appointment.doctor}
                      </button>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{appointment.specialty}</td>
                  <td className="p-4 text-gray-600">{appointment.location}</td>
                  <td className="p-4">
                    <Badge
                      className={`${
                        statusColors[
                          appointment.status as keyof typeof statusColors
                        ]
                      } border-0`}
                    >
                      {appointment.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-gray-600">
                    <div>
                      <div>{appointment.date}</div>
                      <div className="text-sm text-gray-500">
                        {appointment.time}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {/* <Button
                        variant="outline"
                        size="sm"
                        onClick={onViewDoctor}
                        className="flex items-center space-x-1"
                        title="View doctor profile"
                      >
                        <Eye className="h-3 w-3" />
                        <span>View</span>
                      </Button>
                      {appointment.status !== "Cancelled" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReschedule(appointment)}
                        >
                          Reschedule
                        </Button>
                      )} */}
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reschedule Modal */}
      <RescheduleAppointment
        open={isRescheduleModalOpen}
        onOpenChange={setIsRescheduleModalOpen}
        appointment={selectedAppointment}
      />
    </div>
  );
}
