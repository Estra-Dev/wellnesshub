import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CalendarDays,
  Clock,
  User,
  Stethoscope,
  MapPin,
  CheckCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateAppointmentDetails {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AppointmentDetails = ({
  open,
  onOpenChange,
}: CreateAppointmentDetails) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] p-0 max-h-[90vh] overflow-y-auto px-1">
        <div className=" flex justify-center items-center rounded-xl bg-white">
          <div className="w-full">
            <div className="flex justify-between items-start p-4">
              <div>
                <DialogTitle className="text-lg font-semibold">
                  Check <span className="text-blue-600">Up</span>
                </DialogTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Image
                    src="/doctor-avatar.jpg"
                    alt="doctor"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    With Dr Mike Uzoh
                  </p>
                </div>
              </div>
            </div>

            <CardContent className="space-y-4 px-4 pb-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="w-4 h-4 text-blue-500" />
                  <span>3rd Jan 2025</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>09:00 - 11:00</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Stethoscope className="w-4 h-4 text-blue-500" />
                  <span>Cardiologist</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>30 Mins</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-600">Confirmed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>In-Person</span>
                </div>
              </div>

              <div className="text-sm">
                <p className="font-medium mb-1">Additional Information</p>
                <div className="border rounded-md p-2 bg-muted text-muted-foreground">
                  Hello Doc, hope you're good, I wanna do a routine check up. I
                  see you come highly recommended... beg run am for me
                </div>
              </div>

              <div className="flex justify-center gap-2 w-full">
                <Button className=" bg-blue-500 text-white rounded-md">
                  Reschedule
                </Button>
                <Button
                  variant="destructive"
                  className=" bg-red-400 rounded-md text-white"
                >
                  Cancel appointment
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetails;
