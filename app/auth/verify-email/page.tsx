import React, { Suspense } from "react";
import VerifyEmailPage from "./VerifyEmail";

const page = () => {
  return (
    <Suspense fallback={<div className=" p-8 text-center">Loading...</div>}>
      <VerifyEmailPage />
    </Suspense>
  );
};

export default page;
