"use client";

import { useState } from "react";
import { useRegisterCounselor } from "@/services";
import { ICounselorRegisterInput } from "@/types/auth";
import { BodySmallMedium } from "@/components/atoms/Typography";
import EmailInput from "@/components/atoms/inputs/EmailInput";
import PasswordInput from "@/components/atoms/inputs/PasswordInput";
import { ContentInput } from "@/components/atoms/Input";
import { SubmitButton } from "@/components/atoms/buttons/SubmitButton";
import { toast } from "react-toastify";

const RegisterCounselorForm: React.FC = () => {
  const [formData, setFormData] = useState<ICounselorRegisterInput>({
    email: "",
    fullname: "",
    address: "",
    phone: "",
    isStudent: false,
    education: {
      university: "",
      stage: "S1",
      majority: "",
      semester: null,
    },
    password: "",
    practiceLicenseNumber: "",
    work: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: register, isPending, error } = useRegisterCounselor();

  const handleChange = (
    field: string,
    value: string | boolean | number | null
  ) => {
    if (field.startsWith("education.")) {
      const eduField = field.split(".")[1];
      setFormData({
        ...formData,
        education: {
          ...formData.education,
          [eduField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
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
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {/* Student Checkbox */}
      <div className="flex items-center gap-2 p-3 bg-grey-stroke/10 rounded-lg">
        <input
          type="checkbox"
          id="isStudent"
          checked={formData.isStudent}
          onChange={(e) => handleChange("isStudent", e.target.checked)}
          className="w-4 h-4 rounded border-grey-stroke focus:ring-moss-stone"
        />
        <label htmlFor="isStudent" className="cursor-pointer">
          <BodySmallMedium>I am currently a student</BodySmallMedium>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3">
        <div>
          <label className="block mb-1.5">
            <BodySmallMedium>Full Name *</BodySmallMedium>
          </label>
          <ContentInput
            placeholder="John Doe"
            value={formData.fullname}
            onChange={(e) => handleChange("fullname", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1.5">
            <BodySmallMedium>Email *</BodySmallMedium>
          </label>
          <EmailInput
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1.5">
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
          <label className="block mb-1.5">
            <BodySmallMedium>Address *</BodySmallMedium>
          </label>
          <ContentInput
            placeholder="City, Street"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1.5">
            <BodySmallMedium>University *</BodySmallMedium>
          </label>
          <ContentInput
            placeholder="University name"
            value={formData.education.university}
            onChange={(e) =>
              handleChange("education.university", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block mb-1.5">
            <BodySmallMedium>Education Level *</BodySmallMedium>
          </label>
          <select
            value={formData.education.stage}
            onChange={(e) => handleChange("education.stage", e.target.value)}
            className="w-full border text-sm border-grey-stroke rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-moss-stone transition-colors bg-white"
          >
            <option value="D3">D3</option>
            <option value="D4">D4</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
            <option value="S3">S3</option>
          </select>
        </div>

        <div>
          <label className="block mb-1.5">
            <BodySmallMedium>Major *</BodySmallMedium>
          </label>
          <ContentInput
            placeholder="Psychology"
            value={formData.education.majority}
            onChange={(e) => handleChange("education.majority", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1.5">
            <BodySmallMedium>Semester (optional)</BodySmallMedium>
          </label>
          <ContentInput
            type="number"
            placeholder="1-14"
            value={formData.education.semester?.toString() || ""}
            onChange={(e) =>
              handleChange(
                "education.semester",
                e.target.value ? parseInt(e.target.value) : null
              )
            }
          />
        </div>

        {/* Professional fields - only show if NOT student */}
        {!formData.isStudent && (
          <>
            <div>
              <label className="block mb-1.5">
                <BodySmallMedium>Practice License (optional)</BodySmallMedium>
              </label>
              <ContentInput
                placeholder="License number"
                value={formData.practiceLicenseNumber || ""}
                onChange={(e) =>
                  handleChange("practiceLicenseNumber", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block mb-1.5">
                <BodySmallMedium>Workplace (optional)</BodySmallMedium>
              </label>
              <ContentInput
                placeholder="Clinic/Hospital"
                value={formData.work || ""}
                onChange={(e) => handleChange("work", e.target.value)}
              />
            </div>
          </>
        )}

        <div>
          <label className="block mb-1.5">
            <BodySmallMedium>Password *</BodySmallMedium>
          </label>
          <PasswordInput
            placeholder="Min 6 characters"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1.5">
            <BodySmallMedium>Confirm Password *</BodySmallMedium>
          </label>
          <PasswordInput
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-error/10 p-3">
          <p className="text-sm text-error">{error.message}</p>
        </div>
      )}

      <div className="pt-2">
        <SubmitButton
          variant="primary"
          text={isPending ? "Creating account..." : "Create Account"}
          className="w-full flex justify-center items-center"
          disabled={isPending}
        />
      </div>
    </form>
  );
};

export default RegisterCounselorForm;
