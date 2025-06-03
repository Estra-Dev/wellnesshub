"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Mail, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "john@gmail.com";

  // Cooldown timer for resend button
  // useEffect(() => {
  //   if (resendCooldown > 0) {
  //     const timer = setTimeout(
  //       () => setResendCooldown(resendCooldown - 1),
  //       1000
  //     );
  //     return () => clearTimeout(timer);
  //   }
  // }, [resendCooldown]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const code = verificationCode.join("");
    if (code.length !== 4) {
      setError("Please enter the complete verification code");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, accept "1234" as valid code
      if (code === "1234") {
        setIsVerified(true);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // const handleResendCode = async () => {
  //   setResendCooldown(60); // 60 second cooldown
  //   setError("");

  //   try {
  //     // Simulate API call to resend code
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     // Show success message or handle response
  //   } catch (err) {
  //     setError("Failed to resend code. Please try again.");
  //   }
  // };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Email Verified!</h2>
              <p className="text-gray-600 mb-6">
                Your email has been successfully verified. You can now access
                your WellnessHub account.
              </p>
              <Button
                asChild
                className="w-full bg-blue-600 hover:bg-blue-700 mb-4"
              >
                <Link href="/auth/onboarding">Continue to App</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className=" max-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center py-4 justify-center">
      <div className="md:h-[700px] bg-white flex items-center justify-center p-4 w-full max-w-7xl mx-auto">
        <div className=" flex-1">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-600 mb-2">
              WellnessHub
            </h1>
          </div>

          {/* Verification Form */}
          <Card className="shadow-sm border-0">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800">
                Verify Email
              </CardTitle>
              <p className="text-gray-700 text-sm">
                We've sent a code to{" "}
                <span className=" text-gray-800">{email}</span>{" "}
              </p>
              {/* <p className="text-blue-600 font-medium">{email}</p> */}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Verification Code Input */}
              <div className="space-y-2">
                <div className="flex justify-center space-x-2">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-semibold border-[0.5px] border-gray-500/30 focus:border-[#4285f4] outline-none rounded-lg"
                    />
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Verify Button */}
              <Button
                onClick={handleVerify}
                disabled={isVerifying || verificationCode.join("").length !== 4}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>

              {/* Resend Code */}
              {/* <div className="text-center space-y-2">
              <p className="text-gray-600 text-sm">
                {"Didn't receive the code?"}
              </p>
              <Button
                variant="outline"
                onClick={handleResendCode}
                disabled={resendCooldown > 0}
                className="text-blue-600 hover:text-blue-700"
              >
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : "Resend Code"}
              </Button> */}
              {/* </div> */}

              {/* Change Email */}
              {/* <div className="text-center">
              <Link
                href="/auth/signup"
                className="text-gray-500 text-sm hover:underline"
              >
                Wrong email? Change it
              </Link>
            </div> */}
            </CardContent>
          </Card>
        </div>
        <div className=" flex-1 h-full relative rounded-2xl overflow-hidden">
          <div className=" absolute w-full h-full top-0 left-0 bg-gradient-to-t via-transparent from-[#007AFF] to-transparent flex flex-col justify-end pb-7 px-4">
            <div className=" w-full mb-7 mx-auto">
              <h1 className=" text-2xl text-white font-bold mb-2">
                Join wellnessHub - Your Partner in Health and Wellness
              </h1>
              <p className=" text-lg text-white font-normal">
                Track your health, manage appointments, and stay on top of your
                wellness journey.
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
  );
}
