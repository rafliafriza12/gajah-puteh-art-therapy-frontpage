"use client";

import { useState } from "react";
import { useRegisterParent } from "@/services";
import { IParentRegisterInput } from "@/types/auth";
import { BodySmallMedium } from "@/components/atoms/Typography";
import EmailInput from "@/components/atoms/inputs/EmailInput";
import PasswordInput from "@/components/atoms/inputs/PasswordInput";
import { ContentInput } from "@/components/atoms/Input";
import { SubmitButton } from "@/components/atoms/buttons/SubmitButton";
import { toast } from "react-toastify";
import Link from "next/link";

const RegisterParentForm: React.FC = () => {
  const [formData, setFormData] = useState<IParentRegisterInput>({
    email: "",
    fullname: "",
    address: "",
    phone: "",
    work: "",
    age: 0,
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: register, isPending, error } = useRegisterParent();

  const handleChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      await register(formData);
      toast.success("Registration successful! Redirecting...");
    } catch (err: any) {
      toast.error(err?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-medium text-charcoal-green-dark">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">
              <BodySmallMedium>Full Name *</BodySmallMedium>
            </label>
            <ContentInput
              placeholder="Jane Doe"
              value={formData.fullname}
              onChange={(e) => handleChange("fullname", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">
              <BodySmallMedium>Email *</BodySmallMedium>
            </label>
            <EmailInput
              placeholder="jane@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">
              <BodySmallMedium>Phone Number *</BodySmallMedium>
            </label>
            <ContentInput
              type="tel"
              placeholder="08123456789"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">
              <BodySmallMedium>Address *</BodySmallMedium>
            </label>
            <ContentInput
              placeholder="Street address, City"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">
              <BodySmallMedium>Age *</BodySmallMedium>
            </label>
            <ContentInput
              type="number"
              placeholder="25"
              value={formData.age.toString()}
              onChange={(e) =>
                handleChange("age", parseInt(e.target.value) || 0)
              }
            />
          </div>

          <div>
            <label className="block mb-2">
              <BodySmallMedium>Occupation *</BodySmallMedium>
            </label>
            <ContentInput
              placeholder="e.g., Teacher"
              value={formData.work}
              onChange={(e) => handleChange("work", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-medium text-charcoal-green-dark">
          Security
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">
              <BodySmallMedium>Password *</BodySmallMedium>
            </label>
            <PasswordInput
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">
              <BodySmallMedium>Confirm Password *</BodySmallMedium>
            </label>
            <PasswordInput
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-error/10 p-3">
          <p className="text-sm text-error">{error.message}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <SubmitButton
          variant="primary"
          text={isPending ? "Creating account..." : "Create Account"}
          className="w-full flex justify-center items-center"
          disabled={isPending}
        />
      </div>

      {/* Login Link */}
      <div className="text-center">
        <BodySmallMedium className="text-grey">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-moss-stone hover:text-charcoal-green transition-colors font-medium"
          >
            Sign in
          </Link>
        </BodySmallMedium>
      </div>
    </form>
  );
};

export default RegisterParentForm;
