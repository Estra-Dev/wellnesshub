"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import {
  Star,
  Users,
  Clock,
  MapPin,
  X,
  Home,
  Video,
  ArrowBigRightDashIcon,
  ArrowBigRight,
} from "lucide-react";

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface TimeSlot {
  day: string;
  slots: {
    am: string[];
    pm: string[];
  };
}

interface DoctorProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor?: {
    id: number;
    name: string;
    specialty: string;
    avatar: string;
    patients: number;
    experience: number;
    location: string;
    onlinePrice: string;
    inPersonPrice: string;
    about: string;
    timeSlots: TimeSlot[];
    reviews: Review[];
  };
}

export function DoctorProfileModal({
  open,
  onOpenChange,
  doctor,
}: DoctorProfileModalProps) {
  const [activeTab, setActiveTab] = useState("about");

  if (!doctor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-0 bg-white">
        <div className="relative ">
          <div className=" bg-blue-200/20">
            <DialogTitle className=" text-gray-800 text-center py-3">
              Doctor <span className=" text-blue-500">Profile</span>
            </DialogTitle>
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Doctor Header */}
          <div className="p-6 flex items-center space-x-4 bg-blue-200/20">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={doctor.avatar || "/placeholder.svg?height=64&width=64"}
                alt={doctor.name}
              />
              <AvatarFallback>
                {doctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p className="text-blue-600">{doctor.specialty}</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            defaultValue="about"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="">
              <TabsList className="w-full h-auto p-0 bg-transparent border-b-[0.5px] border-gray-100 rounded-none">
                <TabsTrigger
                  value="about"
                  className={`flex-1 py-3 rounded-none border-b-4 ${
                    activeTab === "about"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent"
                  }`}
                >
                  About
                </TabsTrigger>
                <TabsTrigger
                  value="available-time"
                  className={`flex-1 py-3 rounded-none border-b-4 ${
                    activeTab === "available-time"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent"
                  }`}
                >
                  Available Time
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className={`flex-1 py-3 rounded-none border-b-4 ${
                    activeTab === "reviews"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent"
                  }`}
                >
                  Reviews
                </TabsTrigger>
              </TabsList>
            </div>

            {/* About Tab Content */}
            <TabsContent value="about" className="p-6 space-y-6 mt-0">
              <p className="text-gray-700 text-sm">{doctor.about}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-blue-600 font-semibold">
                    {doctor.patients}+
                  </div>
                  <div className="text-xs text-gray-500">Patients</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-blue-600 font-semibold">
                    {doctor.experience}+
                  </div>
                  <div className="text-xs text-gray-500">Experience</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-blue-600 font-semibold">
                    {doctor.location}
                  </div>
                  <div className="text-xs text-gray-500">Location</div>
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <Home className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-blue-600 font-semibold">Available</div>
                  <div className="text-xs text-gray-500">Home Service</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <Video className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-blue-600 font-semibold">
                    ₦{doctor.onlinePrice}
                  </div>
                  <div className="text-xs text-gray-500">
                    Online Consultation
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-blue-600 font-semibold">
                    ₦{doctor.inPersonPrice}
                  </div>
                  <div className="text-xs text-gray-500">In-Person</div>
                </div>
              </div>
            </TabsContent>

            {/* Available Time Tab Content */}
            <TabsContent value="available-time" className="p-6 space-y-6 mt-0">
              {doctor.timeSlots.map((daySlot) => (
                <div
                  key={daySlot.day}
                  className="space-y-3 flex justify-between"
                >
                  <h3 className="font-medium text-blue-600">{daySlot.day}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {daySlot.slots.am.map((time, index) => (
                      <div
                        key={`am-${index}`}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm">{time}</span>
                        <span className="text-xs text-gray-500">AM</span>
                      </div>
                    ))}

                    {daySlot.slots.pm.map((time, index) => (
                      <div
                        key={`pm-${index}`}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm">{time}</span>
                        <span className="text-xs text-gray-500">PM</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Reviews Tab Content */}
            <TabsContent value="reviews" className="p-6 space-y-6 mt-0">
              {doctor.reviews.map((review) => (
                <div key={review.id} className="space-y-2 pb-4 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            review.avatar ||
                            "/placeholder.svg?height=32&width=32"
                          }
                          alt={review.name}
                        />
                        <AvatarFallback>
                          {review.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{review.name}</p>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          {/* Book Now Button */}
          <div className="p-6 border-t">
            <Button
              className="w-full bg-blue-500 text-white py-[20px] hover:bg-blue-600"
              onClick={() => onOpenChange(false)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
