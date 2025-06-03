"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Share,
  Bell,
  Heart,
  Activity,
  Droplets,
  Weight,
  X,
  TrendingUp,
} from "lucide-react";

// Mock data for health metrics
const healthMetrics = [
  {
    id: 1,
    title: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    status: "Report on Last Test",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    id: 2,
    title: "Heart Rate",
    value: "72",
    unit: "bpm",
    status: "Report on Last Test",
    icon: Activity,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: 3,
    title: "Blood Sugar",
    value: "72",
    unit: "mg/dL",
    status: "Report on Last Test",
    icon: Droplets,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 4,
    title: "Weight",
    value: "100",
    unit: "kg",
    status: "Report on Last Test",
    icon: Weight,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
];

// Mock data for medical reports
const medicalReports = [
  {
    id: 1,
    title: "Complete Blood Count",
    date: "March 15, 2025",
    time: "10:00 am",
    doctor: "Dr. Matthew Henry J",
    facility: "City Hospital",
    status: "Completed",
    type: "Blood Test",
    reportId: "CBT2777",
    results: [
      {
        test: "Hemoglobin (HGB)",
        value: "14.2 g/dL",
        range: "13.5 - 17.5 g/dL",
        status: "Normal",
      },
      {
        test: "Blood Sugar (FBS)",
        value: "95 mg/dL",
        range: "70 - 100 mg/dL",
        status: "Normal",
      },
      {
        test: "Cholesterol (LDL)",
        value: "120 mg/dL",
        range: "Below 100 mg/dL",
        status: "Borderline",
      },
    ],
  },
  {
    id: 2,
    title: "Malaria Test",
    date: "March 15, 2025",
    time: "10:00 am",
    doctor: "Dr. Gabriel Titus I",
    facility: "Federal Hospital",
    status: "Needs Follow Up",
    type: "Lab Test",
    reportId: "MLR2778",
    results: [],
  },
  {
    id: 3,
    title: "Check Up",
    date: "March 14, 2025",
    time: "12:00 pm",
    doctor: "Dr. Gabriel Titus I",
    facility: "Federal Hospital",
    status: "Completed",
    type: "Blood Test",
    reportId: "CHK2779",
    results: [],
  },
  {
    id: 4,
    title: "Injury Check",
    date: "March 14, 2025",
    time: "12:00 pm",
    doctor: "Dr. Gabriel Titus I",
    facility: "Federal Hospital",
    status: "Needs Follow Up",
    type: "Imaging",
    reportId: "INJ2780",
    results: [],
  },
  {
    id: 5,
    title: "Malaria Test",
    date: "March 14, 2025",
    time: "12:00 pm",
    doctor: "Dr. Gabriel Titus I",
    facility: "Federal Hospital",
    status: "Completed",
    type: "Blood Test",
    reportId: "MLR2781",
    results: [],
  },
];

const statusColors = {
  Completed: "bg-green-100 text-green-800",
  "Needs Follow Up": "bg-red-100 text-red-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

export default function MedicalRecordPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState(medicalReports[0]);
  const [isReportDetailsOpen, setIsReportDetailsOpen] = useState(false);

  const filteredReports = medicalReports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewReport = (report: (typeof medicalReports)[0]) => {
    setSelectedReport(report);
    setIsReportDetailsOpen(true);
  };

  const handleDownloadReport = () => {
    // Simulate download
    console.log("Downloading report:", selectedReport.reportId);
  };

  const handleShareReport = () => {
    // Simulate share
    console.log("Sharing report:", selectedReport.reportId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <div className="h-16 bg-white flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-900 ml-12 lg:ml-0">
              Medical Record
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
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                Your Health Reports
              </h2>
              <p className="text-purple-100 text-sm sm:text-base">
                Track and review your medical history, lab results, and health
                trends.
              </p>
            </div>
          </div>

          {/* Health Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {healthMetrics.map((metric) => (
              <Card
                key={metric.id}
                className="hover:shadow-md transition-shadow outline-none focus:outline-none ring-0 focus:ring-0"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                      <metric.icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline space-x-1">
                        <span className="text-2xl font-bold">
                          {metric.value}
                        </span>
                        <span className="text-sm text-gray-500">
                          {metric.unit}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {metric.title}
                      </p>
                      <p className="text-xs text-gray-500">{metric.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Report History Section */}
          <div className="bg-white rounded-lg">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <h3 className="text-lg font-semibold">Report History</h3>

                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search for an appointment"
                      className="pl-10 w-full sm:w-64 !outline-none !ring-0 !border-[0.5px] border-gray-200 !focus:ring-0 !focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <Button
                    // variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 border-[0.2px] border-gray-500"
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white border-b-[0.5px] border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600">
                      Report Title
                    </th>
                    <th className="text-left p-4 font-medium text-gray-600">
                      Date & Time
                    </th>
                    <th className="text-left p-4 font-medium text-gray-600">
                      Doctor & Facility Name
                    </th>
                    <th className="text-left p-4 font-medium text-gray-600">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-gray-600">
                      Report Type
                    </th>
                    <th className="text-left p-4 font-medium text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report) => (
                    <tr key={report.id} className=" hover:bg-gray-50">
                      <td className="p-4">
                        <button
                          className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                          onClick={() => handleViewReport(report)}
                        >
                          {report.title}
                        </button>
                      </td>
                      <td className="p-4 text-gray-600">
                        <div>
                          <div>{report.date}</div>
                          <div className="text-sm text-gray-500">
                            {report.time}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src="/placeholder.svg?height=32&width=32"
                              alt={report.doctor}
                            />
                            <AvatarFallback>
                              {report.doctor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">
                              {report.doctor}
                            </div>
                            <div className="text-xs text-gray-500">
                              {report.facility}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          className={`${
                            statusColors[
                              report.status as keyof typeof statusColors
                            ]
                          } border-0`}
                        >
                          {report.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-600">{report.type}</td>
                      <td className="p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewReport(report)}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Report Details Modal */}
      {isReportDetailsOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className=" flex gap-3 items-center">
                  <h3 className="text-lg font-semibold">Report Details</h3>
                  <p className="text-sm text-gray-500">
                    {selectedReport.reportId}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-blue-500">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShareReport}
                  >
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadReport}
                    className=" bg-blue-500 text-white"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsReportDetailsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Doctor Info */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src="/placeholder.svg?height=48&width=48"
                    alt={selectedReport.doctor}
                  />
                  <AvatarFallback>
                    {selectedReport.doctor
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{selectedReport.doctor}</h4>
                  <p className="text-sm text-gray-600">
                    {selectedReport.facility}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedReport.date} • {selectedReport.time}
                  </p>
                </div>
              </div>

              {/* Doctor's Notes & Recommendations */}
              <div>
                <h4 className="font-medium mb-2">
                  Doctor's Notes & Recommendations
                </h4>
                <p className="text-sm text-gray-600">
                  Patient shows normal blood sugar levels. Follow-up in 3 months
                  for another test.
                </p>
              </div>

              {/* Test Results */}
              {selectedReport.results.length > 0 && (
                <div>
                  <h4 className="font-medium">Test Results/Diagnosis</h4>
                  <p className=" mb-4 text-gray-700">
                    Lab Result Table for Blood Test
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-3">Test Name</th>
                          <th className="text-left p-3">Result</th>
                          <th className="text-left p-3">Normal Range</th>
                          <th className="text-left p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedReport.results.map((result, index) => (
                          <tr key={index} className="">
                            <td className="p-3">{result.test}</td>
                            <td className="p-3 font-medium">{result.value}</td>
                            <td className="p-3 text-gray-600">
                              {result.range}
                            </td>
                            <td className="p-3">
                              <Badge
                                className={`${
                                  result.status === "Normal"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                } border-0`}
                              >
                                {result.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Trend Chart */}
              <div>
                <h4 className="font-medium mb-4">Trend Chart</h4>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                    <p>Chart visualization would appear here</p>
                    <p className="text-sm">Showing health trends over time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
