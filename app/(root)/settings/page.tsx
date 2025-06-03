"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Bell,
  Upload,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Delete,
  Trash,
} from "lucide-react";
import { Value } from "@radix-ui/react-select";

export default function SettingsPage() {
  const [active, setActive] = useState("account");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteEmail, setDeleteEmail] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);

  const handleChangeReminder = () => {
    if (appointmentReminders) {
      setAppointmentReminders(false);
    } else {
      setAppointmentReminders(true);
    }
  };

  // Billing states
  const [cardName, setCardName] = useState("Albert Flores");
  const [cardNumber, setCardNumber] = useState("2345 5678 1234");
  const [expiryDate, setExpiryDate] = useState("03/2026");
  const [cvv, setCvv] = useState("234");

  // App preferences states
  const [themePreference, setThemePreference] = useState("system");
  const [dataSyncEnabled, setDataSyncEnabled] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleUpdatePassword = () => {
    console.log("Updating password...");
  };

  const handleDeleteAccount = () => {
    console.log("Deleting account...");
  };

  const handleUploadPicture = () => {
    console.log("Uploading new picture...");
  };
  const handleDeletePicture = () => {
    console.log("Uploading new picture...");
  };

  const handleAddCard = () => {
    console.log("Adding new card...");
  };

  const handleUpdateBilling = () => {
    console.log("Updating billing details...");
  };

  const handleReadTerms = () => {
    console.log("Opening terms and conditions...");
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    console.log("Terms accepted");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <div className="h-16 bg-white flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-blue-500 ml-12 lg:ml-0">
              Settings
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
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Settings</h2>
              <p className="text-blue-100 text-sm sm:text-base">
                Manage your account, notifications, and privacy preferences.
              </p>
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

          {/* Settings Tabs */}
          <Tabs
            defaultValue="account"
            className="space-y-6 border-[0.5px] border-gray-100 rounded-md shadow-md md:p-3"
          >
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 text-sm">
              <TabsTrigger
                value="account"
                onClick={() => setActive("account")}
                className={`${
                  active == "account"
                    ? " text-blue-500 border-b-2 border-b-blue-500"
                    : " text-gray-800"
                }`}
              >
                Account Settings
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                onClick={(e) => setActive("notifications")}
                className={`${
                  active == "notifications"
                    ? " text-blue-500 border-b-2 border-blue-500"
                    : " text-gray-800"
                }`}
              >
                Notifications & Reminders
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                onClick={(e) => setActive("billing")}
                className={`${
                  active == "billing"
                    ? " text-blue-500 border-b-2 border-blue-500"
                    : " text-gray-800"
                }`}
              >
                Billing
              </TabsTrigger>
              <TabsTrigger
                value="app"
                onClick={(e) => setActive("app")}
                className={`${
                  active == "app"
                    ? " text-blue-500 border-b-2 border-blue-500"
                    : " text-gray-800"
                }`}
              >
                App Preferences
              </TabsTrigger>
            </TabsList>

            {/* Account Settings Tab */}
            <TabsContent value="account" className="space-y-6">
              {/* Profile Information */}
              <Card className=" border-0 shadow-none">
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="md:flex items-center justify-between space-x-4 shadow-md p-6 rounded-md w-full">
                    <div className="flex items-center justify-between space-x-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage
                          src="/placeholder.svg?height=80&width=80"
                          alt="Albert Flores"
                        />
                        <AvatarFallback>AF</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h3 className="font-medium">Albert Flores</h3>
                        <p className="text-sm text-gray-500">
                          PNG, JPG under 5MB
                        </p>
                      </div>
                    </div>
                    <div className=" md:flex gap-3 items-center space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleUploadPicture}
                        className=" border-[0.5px] border-gray-100"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload new picture
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDeletePicture}
                        className=" bg-red-500 text-white"
                      >
                        Delete Picture
                        <Trash2 className="h-4 w-4 mr-2" />
                      </Button>
                    </div>
                  </div>
                  <div className=" shadow-md border-[0.5px] border-gray-200 p-3 rounded-md">
                    <CardHeader className="flex flex-row items-center justify-between text-gray-800 p-0 py-3">
                      <CardTitle className=" text-2xl font-semibold">
                        Profile Information
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        className=" border-[0.5px] border-gray-100"
                      >
                        Edit
                      </Button>
                    </CardHeader>

                    {/* Profile Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-gray-800">
                      <div>
                        <Label className="text-sm text-gray-500">
                          First Name
                        </Label>
                        <p className="font-medium">Albert</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">
                          Last Name
                        </Label>
                        <p className="font-medium">Flores</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Email</Label>
                        <p className="font-medium">albertflores@gmail.com</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Phone</Label>
                        <p className="font-medium">08099934622322</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Gender</Label>
                        <p className="font-medium">Male</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Password Section */}
              <Card className=" border-[0.5px] border-gray-200 text-gray-800">
                <CardHeader className=" flex justify-between">
                  <div className="">
                    <CardTitle>Password</CardTitle>
                    <p className="text-sm text-gray-500 my-2">
                      Please enter your current password to change your password
                    </p>
                  </div>
                  <Button
                    onClick={handleUpdatePassword}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Update Password
                  </Button>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2 md:flex justify-between">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative md:w-[50%]">
                      <Input
                        id="current-password"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="!outline-none !ring-0 !border-[0.5px] border-gray-200 !focus:ring-0 !focus:outline-none"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 md:flex justify-between">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="md:w-[50%]">
                      <div className="relative ">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="!outline-none !ring-0 !border-[0.5px] border-gray-200 !focus:ring-0 !focus:outline-none"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 my-2">
                        Password must contain 8 characters, numbers and special
                        characters
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 md:flex justify-between">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative md:w-[50%]">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="!outline-none !ring-0 !border-[0.5px] border-gray-200 !focus:ring-0 !focus:outline-none"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delete Account Section */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Delete Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 md:flex justify-between">
                    <Label htmlFor="delete-email">Enter Email</Label>
                    <div className=" md:w-[50%]">
                      <Input
                        id="delete-email"
                        type="email"
                        value={deleteEmail}
                        onChange={(e) => setDeleteEmail(e.target.value)}
                        placeholder="albertflores@gmail.com"
                        className="!outline-none !ring-0 !border-[0.5px] border-gray-200 !focus:ring-0 !focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:flex justify-between">
                    <Label htmlFor="delete-password">Password</Label>
                    <div className=" md:w-[50%]">
                      <Input
                        id="delete-password"
                        type="password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        placeholder="••••••••"
                        className="!outline-none !ring-0 !border-[0.5px] border-gray-200 !focus:ring-0 !focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className=" w-full flex justify-end">
                    <Button
                      onClick={handleDeleteAccount}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className=" border-0 shadow-none">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <p className="text-sm text-gray-500">
                    Manage your notifications with ease
                  </p>
                </CardHeader>
                {/* <div className=" "></div> */}
                <CardContent className="space-y-6 md:flex justify-center gap-2">
                  {/* Illustration */}
                  <div className="flex justify-center py-8 md:w-[50%]">
                    <div className="relative">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Notification settings illustration"
                        className="h-48 object-contain"
                      />
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div className="space-y-6 md:w-[50%]">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">Email Notification</h4>
                        <p className="text-sm text-gray-500">
                          Get emails to find out what's going on when you're not
                          online. You can turn these off.
                        </p>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">Push Notification</h4>
                        <p className="text-sm text-gray-500">
                          Get push notifications to find out what's going on
                          when you're offline.
                        </p>
                      </div>
                      <Switch
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">Appointment Reminders</h4>
                        <p className="text-sm text-gray-500">
                          Get reminders on your appointments.
                        </p>
                      </div>
                      <Switch
                        checked={appointmentReminders}
                        onCheckedChange={setAppointmentReminders}
                        className=" "
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="space-y-6">
              {/* Payment Method */}
              <Card className=" border-0">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <p className="text-sm text-gray-500">
                    Update your billing details and address
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Card Details Section */}
                    <div>
                      <h4 className="font-medium mb-2">Card Details</h4>
                      <p className="text-sm text-gray-500 mb-6">
                        Update your billing details and address
                      </p>

                      <div className="flex flex-col lg:flex-row gap-8">
                        {/* Credit Card Display */}
                        <div className="flex-shrink-0">
                          <div className="w-72 h-44 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white relative overflow-hidden">
                            <div className="absolute top-4 right-4">
                              <div className="text-xs font-medium">DEBIT</div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6">
                              <div className="text-lg font-mono tracking-wider mb-3">
                                •••• •••• •••• 0329
                              </div>
                              <div className="flex flex-col">
                                <div>
                                  <div className="font-medium">MARY JANE</div>
                                </div>
                                <div>
                                  <div className="text-xs opacity-80 mb-1">
                                    03/29
                                  </div>
                                  {/* <div className="font-medium"></div> */}
                                </div>
                              </div>
                            </div>
                            <div className="absolute bottom-6 right-6">
                              <div className="flex -space-x-2">
                                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                                <div className="w-6 h-6 bg-yellow-500 rounded-full opacity-80"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Form Fields */}
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label
                                htmlFor="card-name"
                                className="text-sm text-gray-600"
                              >
                                Name on your card
                              </Label>
                              <Input
                                id="card-name"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                className="h-10 !outline-none !ring-0 !border-[0.5px] border-gray-200 !focus:ring-0 !focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="expiry-date"
                                className="text-sm text-gray-600"
                              >
                                Expiry Date
                              </Label>
                              <Input
                                id="expiry-date"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="h-10 !outline-none !ring-0 !border-[0.5px] border-gray-200 !focus:ring-0 !focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="md:flex items-center gap-4">
                            <div className="space-y-2 flex-1">
                              <Label
                                htmlFor="card-number"
                                className="text-sm text-gray-600"
                              >
                                Card Number
                              </Label>
                              <div className="relative">
                                <Input
                                  id="card-number"
                                  value={cardNumber}
                                  onChange={(e) =>
                                    setCardNumber(e.target.value)
                                  }
                                  className="h-10 pr-12 !outline-none !ring-0 !border-[0.5px] border-gray-200 !focus:ring-0 !focus:outline-none"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <div className="flex -space-x-2">
                                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                    <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-80"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="cvv"
                                className="text-sm text-gray-600"
                              >
                                CVV
                              </Label>
                              <Input
                                id="cvv"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className="h-10 !outline-none !ring-0 !border-[0.5px] border-gray-200 !focus:ring-0 !focus:outline-none"
                                maxLength={3}
                              />
                            </div>
                          </div>
                          <div className="mt-2">
                            <Button
                              onClick={handleAddCard}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add another card
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* App Preferences Tab */}
            <TabsContent value="app" className="space-y-6">
              <Card className=" border-0">
                <CardHeader>
                  <CardTitle>App Preferences</CardTitle>
                  <p className="text-sm text-gray-500">
                    Choose your preferred appearance, sync your data and view
                    our terms and conditions
                  </p>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Interface Theme */}
                  <div className="space-y-4 md:flex gap-3.5">
                    <div className=" w-[50%]">
                      <h4 className="font-medium mb-1">Interface theme</h4>
                      <p className="text-sm text-gray-500">
                        Select or customize your UI theme
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {/* System Preference */}
                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          themePreference === "system"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setThemePreference("system")}
                      >
                        <div className="space-y-3">
                          <div className="w-full h-20 bg-gray-100 rounded border overflow-hidden relative">
                            <div className="h-4 bg-blue-500"></div>
                            <div className="absolute left-2 top-6 w-8 h-8 bg-gray-800 rounded"></div>
                            <div className="p-2 pt-6 space-y-1">
                              <div className="h-1.5 bg-gray-300 rounded w-3/4"></div>
                              <div className="h-1.5 bg-gray-300 rounded w-1/2"></div>
                              <div className="h-1.5 bg-gray-300 rounded w-2/3"></div>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                              {themePreference === "system" && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                              <span className="text-sm font-medium">
                                System Preference
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Light Mode */}
                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          themePreference === "light"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setThemePreference("light")}
                      >
                        <div className="space-y-3">
                          <div className="w-full h-20 bg-white rounded border overflow-hidden relative">
                            <div className="h-4 bg-blue-500"></div>
                            <div className="absolute left-2 top-6 w-8 h-8 bg-white border rounded"></div>
                            <div className="p-2 pt-6 space-y-1">
                              <div className="h-1.5 bg-gray-300 rounded w-3/4"></div>
                              <div className="h-1.5 bg-gray-300 rounded w-1/2"></div>
                              <div className="h-1.5 bg-gray-300 rounded w-2/3"></div>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                              {themePreference === "light" && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                              <span className="text-sm font-medium">
                                Light mode
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Dark Mode */}
                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          themePreference === "dark"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setThemePreference("dark")}
                      >
                        <div className="space-y-3">
                          <div className="w-full h-20 bg-gray-900 rounded border overflow-hidden relative">
                            <div className="h-4 bg-blue-500"></div>
                            <div className="absolute left-2 top-6 w-8 h-8 bg-gray-700 rounded"></div>
                            <div className="p-2 pt-6 space-y-1">
                              <div className="h-1.5 bg-gray-600 rounded w-3/4"></div>
                              <div className="h-1.5 bg-gray-600 rounded w-1/2"></div>
                              <div className="h-1.5 bg-gray-600 rounded w-2/3"></div>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                              {themePreference === "dark" && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                              <span className="text-sm font-medium">
                                Dark mode
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Sync & Backup */}
                  <div className="flex items-center justify-start gap-16 py-4">
                    <div className="space-y-1">
                      <h4 className="font-medium">Data Sync & Backup</h4>
                      <p className="text-sm text-gray-500">
                        Enable Auto-Backup
                      </p>
                    </div>
                    <Switch
                      checked={dataSyncEnabled}
                      onCheckedChange={setDataSyncEnabled}
                    />
                  </div>

                  {/* Terms & Conditions */}
                  <div className="space-y-4 flex gap-16">
                    <div>
                      <h4 className="font-medium mb-1">Terms & Conditions</h4>
                      <p className="text-sm text-gray-500">Read our T&C</p>
                    </div>
                    <div>
                      <Button
                        onClick={handleAcceptTerms}
                        disabled={termsAccepted}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {termsAccepted ? "Terms Accepted" : "Read and Accept"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
