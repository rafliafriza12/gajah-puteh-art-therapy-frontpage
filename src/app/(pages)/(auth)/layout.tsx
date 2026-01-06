import AuthProvider from "@/providers/AuthProvider";
import Image from "next/image";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className="w-screen min-h-svh flex justify-center items-center bg-white-mineral font-parkinsans relative z-0">
        <div className="h-full w-full absolute -z-1 opacity-[0.03]">
          <Image
            src={"/img/auth_bg.webp"}
            alt="Gajah Puteh Art Therapy"
            fill
            className="object-cover "
          />
        </div>
        {children}
      </div>
    </AuthProvider>
  );
};

export default AuthLayout;
