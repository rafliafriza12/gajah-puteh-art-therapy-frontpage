"use client";
import { tokenStorage } from "@/libs/api";
import { getUserRole } from "@/libs/jwt";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const PrivateProvider = ({ children }: { children: React.ReactNode }) => {
  const isAuth = tokenStorage.isAuthenticated();
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isAuth === false) {
      router.replace("/login");
    } else {
      // Jika user mengakses root path, redirect ke dashboard sesuai role
      if (pathname === "/") {
        const role = getUserRole();
        if (role === "counselor") {
          router.replace("/counselor/dashboard");
        } else if (role === "parent") {
          router.replace("/parent/dashboard");
        }
      }
      setChecking(false);
    }
  }, [isAuth, pathname, router]);

  if (checking) {
    return;
  }

  return <>{children}</>;
};

export default PrivateProvider;
