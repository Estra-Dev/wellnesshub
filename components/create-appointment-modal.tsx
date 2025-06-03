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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  Calendar,
  Search,
  ChevronDown,
  Sun,
  Moon,
  Plus,
  CreditCard,
  Eye,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa6";
import { RiPaypalFill } from "react-icons/ri";

// data for appointment types
const appointmentTypes = [
  { id: 1, name: "Regular Checkup", description: "Routine health examination" },
  {
    id: 2,
    name: "Specialist Consultation",
    description: "Consult with a specialist",
  },
  {
    id: 3,
    name: "Follow-up Visit",
    description: "Follow up on previous treatment",
  },
  { id: 4, name: "Emergency Care", description: "Urgent medical attention" },
];

//  data for specialties
const specialties = [
  { id: 1, name: "Cardiology", description: "Heart and cardiovascular system" },
  { id: 2, name: "Dermatology", description: "Skin, hair, and nails" },
  { id: 3, name: "Neurology", description: "Brain, spinal cord, and nerves" },
  { id: 4, name: "Orthopedics", description: "Bones, joints, and muscles" },
  { id: 5, name: "Pediatrics", description: "Children's health" },
  { id: 6, name: "Psychiatry", description: "Mental health" },
];

// data for doctors
const doctors = [
  {
    id: 1,
    name: "Dr. Matthew Damiola",
    specialty: "Cardiologist",
    rating: 5.0,
    reviews: "1k+ Bookings",
    price: "₦100,000",
    image: "",
    recommended: true,
  },
  {
    id: 2,
    name: "Dr. Brooklyn Simmons",
    specialty: "Cardiologist",
    rating: 5.0,
    reviews: "1k+ Bookings",
    price: "₦100,000",
    image: "",
    recommended: true,
  },
  {
    id: 3,
    name: "Dr. Bessie Cooper",
    specialty: "Cardiologist",
    rating: 5.0,
    reviews: "1k+ Bookings",
    price: "₦100,000",
    image: "",
    recommended: true,
  },
];

//data for time slots
const timeSlots = [
  "8:00 am - 9:00 am",
  "10:00 am - 11:00 am",
  "11:00 am - 12:00 pm",
];

// payment methods
const paymentMethods = [
  {
    id: 1,
    type: "Mastercard",
    last4: "6654",
    icon: "💳",
  },
  {
    id: 2,
    type: "Visa",
    last4: "3453",
    icon: "💳",
  },
];

interface CreateAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAppointmentModal({
  open,
  onOpenChange,
}: CreateAppointmentModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAppointmentType, setSelectedAppointmentType] =
    useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(3);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Morning");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(
    "09:00 - 11:00"
  );
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("1");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(5);
  const doctorsPerPage = 6;

  // Calculate current doctors to display based on pagination
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const [isAppointmentCreated, setIsAppointmentCreated] = useState(false);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle appointment creation
      // onOpenChange(false);
      // Reset form
      // resetForm();
      setIsAppointmentCreated(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedAppointmentType("");
    setSelectedSpecialty("");
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setAdditionalInfo("");
    setCurrentPage(1);
  };

  // January 2025 dates
  const januaryDates = [
    { day: "Sun", date: "01" },
    { day: "Mon", date: "02" },
    { day: "Tue", date: "03" },
    { day: "Wed", date: "04" },
    { day: "Thu", date: "05" },
    { day: "Fri", date: "06" },
    { day: "Sat", date: "07" },
  ];

  const selectedDoctorInfo = doctors.find((d) => d.id === selectedDoctor);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] md:max-w-[900px] p-0 max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center w-full justify-between space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-xl text-center flex-1">
                Create an <span className="text-blue-600">Appointment</span>
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex justify-center py-6">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === currentStep
                      ? "bg-blue-600 text-white"
                      : step < currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step}
                </div>
                {step < 5 && (
                  <div
                    className={`w-8 h-1 ${
                      step < currentStep ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Select Appointment Type */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="flex justify-center mb-8">
                <img
                  src="/doc-apt.png"
                  alt="Doctors illustration"
                  className="h-48 object-contain"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Select Appointment Type
                </h3>

                <Select
                  value={selectedAppointmentType}
                  onValueChange={setSelectedAppointmentType}
                >
                  <SelectTrigger className="w-full h-12 outline-none focus:outline-none ring-0 focus:ring-0">
                    <SelectValue placeholder="Select an appointment type" />
                  </SelectTrigger>
                  <SelectContent className=" bg-white">
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Choose Specialty and Doctor */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Choose Specialty or Service
                </h3>

                <Select
                  value={selectedSpecialty}
                  onValueChange={setSelectedSpecialty}
                >
                  <SelectTrigger className="w-full h-12 outline-none focus:outline-none ring-0 focus:ring-0">
                    <SelectValue placeholder="Select a Specialty" />
                  </SelectTrigger>
                  <SelectContent className=" bg-white outline-none focus:outline-none">
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty.id} value={specialty.name}>
                        {specialty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Select a Cardiologist
                  </h3>
                  <Button variant="link" className="text-blue-600 p-0">
                    See All
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="p-4 border-[0.5px] border-gray-300/40 rounded-lg"
                    >
                      <div className=" space-y-3">
                        <div className="relative">
                          <Avatar className="h-16 w-16 mx-auto">
                            <AvatarImage src={doctor.image} alt={doctor.name} />
                          </Avatar>
                          {doctor.recommended && (
                            <Badge className="absolute -top-2 -right-2 bg-blue-100 text-blue-600 text-xs px-2 py-1">
                              Highly Recommended
                            </Badge>
                          )}
                        </div>

                        <div>
                          <h4 className="font-medium">{doctor.name}</h4>
                          <p className="text-sm text-gray-600">
                            {doctor.specialty}
                          </p>
                        </div>

                        <div className="flex justify-between">
                          <>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="h-4 w-4 text-yellow-400 fill-yellow-400"
                              />
                            ))}
                          </>
                          <div className="text-sm font-semibold text-blue-600">
                            #100,000
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            disabled={selectedDoctor === doctor.id}
                            className={`flex-1 text-white hover:bg-blue-600 ${
                              selectedDoctor === doctor.id
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-blue-500"
                            }`}
                            onClick={() => setSelectedDoctor(doctor.id)}
                          >
                            Select
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full text-blue-500"
                          >
                            <Eye className="h-4 w-4 text-blue-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Select Time Slot */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Select a Time Slot</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">January 2025</h4>

                  {/* Calendar Week View */}
                  <div className="grid grid-cols-7 gap-2">
                    {januaryDates.map((dateObj) => (
                      <div key={dateObj.date} className="text-center">
                        <div className="text-sm text-gray-600 mb-1">
                          {dateObj.day}
                        </div>
                        <div
                          className={`p-3 rounded-full cursor-pointer ${
                            selectedDate === parseInt(dateObj.date)
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() =>
                            setSelectedDate(parseInt(dateObj.date))
                          }
                        >
                          {dateObj.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Period</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div
                      className={`p-3 rounded-lg border text-center cursor-pointer ${
                        selectedPeriod === "Morning"
                          ? "bg-blue-600 text-white"
                          : ""
                      }`}
                      onClick={() => setSelectedPeriod("Morning")}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>Morning</span>
                        <Sun className="h-4 w-4 text-yellow-300" />
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded-lg border text-center cursor-pointer ${
                        selectedPeriod === "Afternoon"
                          ? "bg-blue-600 text-white"
                          : ""
                      }`}
                      onClick={() => setSelectedPeriod("Afternoon")}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>Afternoon</span>
                        <Sun className="h-4 w-4 text-yellow-300" />
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded-lg border text-center cursor-pointer ${
                        selectedPeriod === "Night"
                          ? "bg-blue-600 text-white"
                          : ""
                      }`}
                      onClick={() => setSelectedPeriod("Night")}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>Night</span>
                        <Moon className="h-4 w-4 text-yellow-300" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Slots</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <div
                        key={slot}
                        className={`p-3 text-center border rounded-lg cursor-pointer ${
                          selectedTimeSlot === slot
                            ? "bg-blue-600 text-white border-blue-600"
                            : "hover:border-blue-300"
                        }`}
                        onClick={() => setSelectedTimeSlot(slot)}
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Confirm Details</h3>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={selectedDoctorInfo?.image || "/placeholder.svg"}
                    alt={selectedDoctorInfo?.name}
                  />
                  <AvatarFallback>
                    {selectedDoctorInfo?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">{selectedDoctorInfo?.name}</h4>
                  <p className="text-sm text-gray-600">
                    {selectedDoctorInfo?.specialty}
                  </p>
                </div>
                <div className="bg-blue-600 text-white p-2 rounded-full">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">3rd Jan 2025</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-medium">09:00 - 11:00</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">30 Mins</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">In-Person</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Additional Information</h4>
                <textarea
                  className="w-full p-3 border-[0.5px] rounded-md focus:outline-none focus:ring-0"
                  rows={4}
                  placeholder="Add additional information, allergies, etc."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 5: Make Payment */}
          {currentStep === 5 && !isAppointmentCreated && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Make Payment</h3>
                <Button variant="link" className="text-blue-600 p-0">
                  View All Cards
                </Button>
              </div>

              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
              >
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center space-x-3 p-4 border-[0.5px] border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <div
                          className={`w-10 h-6 rounded flex items-center justify-center`}
                        >
                          <span className=" text-xs font-bold">
                            {method.type === "Mastercard" ? (
                              <div className="flex -space-x-2">
                                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                                <div className="w-6 h-6 bg-yellow-500 rounded-full opacity-80"></div>
                              </div>
                            ) : (
                              <RiVisaLine className=" w-10 h-10 text-blue-600" />
                            )}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">
                            {method.type} ending with **** **** {method.last4}
                          </p>
                        </div>
                      </div>
                      <RadioGroupItem
                        value={method.id.toString()}
                        id={method.id.toString()}
                        className=" text-blue-600"
                      />
                    </div>
                  ))}

                  <Button
                    variant="link"
                    className="text-blue-600 p-0 justify-start"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Payment Method
                  </Button>
                </div>
              </RadioGroup>

              <div className="text-center text-gray-500">Or</div>

              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
              >
                <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-6 rounded flex items-center justify-center">
                      <span className="text-blue-700 text-xs font-bold">
                        <RiPaypalFill className=" w-10 h-10" />
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">Paypal</p>
                    </div>
                  </div>
                  <RadioGroupItem
                    value="paypal"
                    id="paypal"
                    className=" text-blue-600"
                  />
                </div>
              </RadioGroup>
            </div>
          )}
        </div>

        {/* Success Screen */}
        {isAppointmentCreated && (
          <div className="text-center space-y-6 py-8">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>

            <div>
              <h3 className="text-xl text-gray-800 font-semibold mb-2">
                Appointment Successfully Created
              </h3>
            </div>

            <div className="space-y-3 px-3">
              <Button
                variant="outline"
                className="w-full border-[0.5px] border-blue-500 text-blue-500"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Send a Message to the Doctor
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Calendar className="h-4 w-4 mr-2" />
                View Schedule
              </Button>
            </div>
          </div>
        )}

        {/* Footer */}
        {!isAppointmentCreated && (
          <div className="flex justify-between p-6 border-t">
            <Button
              variant="outline"
              onClick={
                currentStep === 1 ? () => onOpenChange(false) : handleBack
              }
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </Button>
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8"
              disabled={
                (currentStep === 1 && selectedAppointmentType === "") ||
                (currentStep === 2 &&
                  (selectedSpecialty === "" || selectedDoctor === null)) ||
                (currentStep === 3 &&
                  (selectedDate === null || selectedTimeSlot === null))
              }
            >
              {currentStep === 4 || currentStep === 5
                ? "Proceed to Payment"
                : currentStep === 3
                ? "Continue"
                : "Next"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
