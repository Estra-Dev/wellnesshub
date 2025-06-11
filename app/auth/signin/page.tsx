"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/Auth-Provider";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Basic validation
      if (!email || !password) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      // Simulate API call for authentication
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, accept any email/password combination
      // In real app, this would be an actual API call
      const userData = {
        id: "user-123",
        email: email,
        name: "Albert Flores",
        fullName: "Albert Flores",
        avatar: "/placeholder.svg?height=40&width=40",
      };

      login(userData);

      // Simulate successful login
      // localStorage.setItem("isAuthenticated", "true");
      // localStorage.setItem("userEmail", email);

      // Redirect to dashboard
      // router.push("/");
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-2 md:p-7">
      <div className=" h-full p-3 w-full max-w-6xl">
        <div className=" bg-white h-full md:h-[700px] md:flex justify-center gap-2">
          <Card className=" border-0 flex-1">
            {/* Logo */}
            <CardHeader>
              <div className="text-center">
                <h1 className="text-xl font-bold text-[#4285f4]">
                  WellnessHub
                </h1>
              </div>
            </CardHeader>
            {/* Login Form */}

            <CardHeader className="text-center pb-4">
              <CardTitle className="text-gray-800 font-bold text-2xl">
                Welcome Back
                <span className=" text-[#4285f4]"> John🖐</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pl-10 border-[0.5px] border-gray-500/30 focus:border-[#4285f4] w-full outline-none"
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

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                  Sign In
                </Button>

                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    {"Don't have an account? "}
                    <Link
                      href="/auth/signup"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className=" hidden md:block flex-1 h-full relative rounded-2xl overflow-hidden">
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
              src={"/doc-love.jpg"}
              alt="Doctor"
              width={500}
              height={1000}
              className=" rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Footer
        <div className="text-center mt-6">
          <p className="text-gray-500 text-xs">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default page;
