"use client";

import React, { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, User, Mail, Phone, RefreshCw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.dateOfBirth) {
      setError("Date of birth is required");
      return false;
    }
    if (!formData.gender) {
      setError("Please select your gender");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (!acceptedTerms) {
      setError("Please accept the Terms of Service and Privacy Policy");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for user registration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Registration data:", formData);

      // Store user data temporarily
      localStorage.setItem(
        "pendingUser",
        JSON.stringify({
          email: formData.email,
          firstName: formData.fullName,
        })
      );

      // After successful registration, redirect to email verification
      window.location.href = `/auth/verify-email?email=${encodeURIComponent(
        formData.email
      )}`;
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-2 md:p-7">
      <div className=" h-full p-3 w-full max-w-4xl">
        {/* Doctor Profile Card
        <Card className="mb-6 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="Dr. Sarah Johnson"
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  Dr. Sarah Johnson
                </h3>
                <p className="text-blue-600 text-sm">Cardiologist</p>
                <p className="text-gray-500 text-xs">
                  Ready to help you get started
                </p>
              </div>
            </div>
          </CardContent>
        </Card> */}

        <div className=" bg-white h-full md:h-[700px] flex justify-center gap-2">
          <Card className="border-0">
            {/* Logo */}
            <CardHeader>
              <div className="text-center">
                <h1 className="text-xl font-bold text-[#4285f4]">
                  WellnessHub
                </h1>
              </div>
            </CardHeader>
            {/* Signup Form */}
            <CardHeader className="text-center">
              <CardTitle className="text-gray-800 font-bold text-2xl">
                <p>
                  Create
                  <span className=" text-[#4285f4]"> Account</span>
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        id="fullName"
                        type="text"
                        placeholder="John"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        className="h-12 pl-10 border-[0.5px] border-gray-500/30 focus:border-[#4285f4] w-full outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="h-12 pl-10 border-[0.5px] border-gray-500/30 focus:border-[#4285f4] w-full outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="h-12 px-2 border-[0.5px] border-gray-500/30 focus:border-[#4285f4] w-full outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    className="h-12 px-2 border-[0.5px] border-gray-500/30 focus:border-[#4285f4] w-full outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="h-12 w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 mt-1"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                  />
                  <p className="text-sm text-gray-600">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/auth/signin"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className=" flex-1 h-full relative rounded-2xl overflow-hidden">
            <div className=" absolute w-full h-full top-0 left-0 bg-gradient-to-t via-transparent from-[#007AFF] to-transparent flex flex-col justify-end pb-7 px-4">
              <div className=" w-full mb-7 mx-auto">
                <h1 className=" text-2xl text-white font-bold mb-2">
                  Join wellnessHub - Your Partner in Health and Wellness
                </h1>
                <p className=" text-lg text-white font-normal">
                  Track your health, manage appointments, and stay on top of
                  your wellness journey.
                </p>
              </div>
            </div>
            <Image
              src={"/doctor.jpg"}
              alt="Doctor"
              width={500}
              height={1000}
              className=" rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default signup;
