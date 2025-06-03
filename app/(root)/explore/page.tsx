"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Star, MoreHorizontal, Bell } from "lucide-react";

// Mock data for doctors
const doctorsData = [
  {
    id: 1,
    name: "Dr. Matthew Damilola",
    specialty: "Cardiologist",
    rating: 5.0,
    price: "₦100,000",
    image: "/placeholder.svg?height=80&width=80",
    recommended: true,
    location: "2.5 km away",
  },
  {
    id: 2,
    name: "Dr. Brooklyn Simmons",
    specialty: "Cardiologist",
    rating: 5.0,
    price: "₦100,000",
    image: "/placeholder.svg?height=80&width=80",
    recommended: true,
    location: "3.1 km away",
  },
  {
    id: 3,
    name: "Dr. Bessie Cooper",
    specialty: "Cardiologist",
    rating: 5.0,
    price: "₦100,000",
    image: "/placeholder.svg?height=80&width=80",
    recommended: true,
    location: "4.2 km away",
  },
];

const DoctorCard = ({
  doctor,
  onBookAppointment,
}: {
  doctor: any;
  onBookAppointment: (doctor: any) => void;
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="text-center space-y-4">
        <div className="relative ">
          <Avatar className="h-20 w-20 mx-auto">
            <AvatarImage
              src={doctor.image || "/placeholder.svg"}
              alt={doctor.name}
            />
            <AvatarFallback>
              {doctor.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {doctor.recommended && (
            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-600 text-xs px-2 py-1">
              Highly Recommended
            </Badge>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-lg">{doctor.name}</h4>
          <p className="text-gray-600">{doctor.specialty}</p>
        </div>

        <div className="flex justify-center items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="h-4 w-4 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>

        <div className="text-xl font-bold text-blue-600">{doctor.price}</div>

        <div className="flex space-x-2">
          <Button
            onClick={() => onBookAppointment(doctor)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Book Appointment
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctorSearchQuery, setDoctorSearchQuery] = useState("");

  const handleBookAppointment = (doctor: any) => {
    console.log("Booking appointment with:", doctor.name);
    // Handle appointment booking logic here
  };

  const handleSeeAll = (section: string) => {
    console.log("See all doctors in:", section);
    // Handle navigation to full doctor list
  };

  const filteredDoctors = doctorsData.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(doctorSearchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(doctorSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <div className="h-16 bg-white flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-900 ml-12 lg:ml-0">
              Explore
            </h1>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search - Hide on small screens */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for anything"
                className="pl-10 w-32 md:w-60 lg:w-80"
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
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 px-7 sm:p-6 text-white mb-6 sm:mb-8 md:flex justify-between">
            <div className="max-w-2xl w-full">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                Explore Doctors
              </h2>
              <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">
                Track and review your medical history, lab results, and health
                trends.
              </p>
            </div>
            {/* Doctor Search */}
            <div className="relative hidden sm:block">
              {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /> */}
              <Input
                type="text"
                placeholder="Search for a Doctor"
                className="pl-10 w-32 md:w-60 lg:w-80 bg-white text-gray-900 border-0 h-12"
                value={doctorSearchQuery}
                onChange={(e) => setDoctorSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mb-6 sm:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for anything"
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Doctors close to you */}
          <section className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold">
                Doctors close to you
              </h3>
              <Button
                variant="link"
                className="text-blue-600 p-0"
                onClick={() => handleSeeAll("nearby")}
              >
                See All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {(doctorSearchQuery ? filteredDoctors : doctorsData)
                .slice(0, 3)
                .map((doctor) => (
                  <DoctorCard
                    key={`nearby-${doctor.id}`}
                    doctor={doctor}
                    onBookAppointment={handleBookAppointment}
                  />
                ))}
            </div>
          </section>

          {/* Recommended Doctors */}
          <section className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold">
                Recommended Doctors
              </h3>
              <Button
                variant="link"
                className="text-blue-600 p-0"
                onClick={() => handleSeeAll("recommended")}
              >
                See All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {(doctorSearchQuery ? filteredDoctors : doctorsData)
                .slice(0, 3)
                .map((doctor) => (
                  <DoctorCard
                    key={`recommended-${doctor.id}`}
                    doctor={doctor}
                    onBookAppointment={handleBookAppointment}
                  />
                ))}
            </div>
          </section>

          {/* Top Rated Doctors */}
          <section className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold">
                Top Rated Doctors
              </h3>
              <Button
                variant="link"
                className="text-blue-600 p-0"
                onClick={() => handleSeeAll("top-rated")}
              >
                See All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {(doctorSearchQuery ? filteredDoctors : doctorsData)
                .slice(0, 3)
                .map((doctor) => (
                  <DoctorCard
                    key={`top-rated-${doctor.id}`}
                    doctor={doctor}
                    onBookAppointment={handleBookAppointment}
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
