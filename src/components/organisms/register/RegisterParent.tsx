"use client";

import { useState } from "react";
import Link from "next/link";
import RegisterParentForm from "@/components/molecules/register/RegisterParentForm";
import RegisterCounselorForm from "@/components/molecules/register/RegisterCounselorForm";

const RegisterParent: React.FC = () => {
  const [registerType, setRegisterType] = useState<"parent" | "counselor">(
    "parent"
  );

  return (
    <div className="h-screen bg-white-mineral flex items-center justify-center p-4 lg:p-8 overflow-hidden">
      <div className="w-full max-w-7xl h-full flex flex-col">
        <div className="bg-white rounded-2xl shadow-lg border border-grey-stroke/50 flex flex-col h-full overflow-hidden">
          {/* Header with Toggle */}
          <div className="p-4 lg:p-6 border-b border-grey-stroke shrink-0">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div>
                <h2 className="text-xl lg:text-2xl font-medium text-charcoal-green-dark mb-1">
                  Create Your Account
                </h2>
                <p className="text-xs lg:text-sm text-grey">
                  Fill in your details to get started
                </p>
              </div>

              {/* Role Toggle */}
              <div className="flex gap-2 p-1 bg-grey-stroke/20 rounded-lg">
                <button
                  onClick={() => setRegisterType("parent")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    registerType === "parent"
                      ? "bg-charcoal-green text-white-mineral shadow-sm"
                      : "text-grey hover:text-charcoal-green"
                  }`}
                >
                  Parent
                </button>
                <button
                  onClick={() => setRegisterType("counselor")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    registerType === "counselor"
                      ? "bg-charcoal-green text-white-mineral shadow-sm"
                      : "text-grey hover:text-charcoal-green"
                  }`}
                >
                  Counselor
                </button>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            {registerType === "parent" ? (
              <RegisterParentForm />
            ) : (
              <RegisterCounselorForm />
            )}

            {/* Login Link */}
            <div className="mt-4 pt-4 border-t border-grey-stroke text-center">
              <p className="text-xs lg:text-sm text-grey">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-charcoal-green hover:text-moss-stone transition-colors"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterParent;
