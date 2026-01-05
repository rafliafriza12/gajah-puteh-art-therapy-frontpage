"use client";
import { tokenStorage } from "@/libs/api";
import { getUserRole } from "@/libs/jwt";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isAuth = tokenStorage.isAuthenticated();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isAuth === true) {
      // Redirect berdasarkan role
      const role = getUserRole();
      if (role === "counselor") {
        router.replace("/counselor/dashboard");
      } else if (role === "parent") {
        router.replace("/parent/dashboard");
      } else {
        router.replace("/");
      }
    } else {
      setChecking(false);
    }
  }, [isAuth, router]);

  if (checking) {
    return;
  }

  return <>{children}</>;
};

export default AuthProvider;
