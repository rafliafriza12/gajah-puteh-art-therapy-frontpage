import AuthProvider from "@/providers/AuthProvider";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className="w-screen h-svh flex justify-center items-center bg-white-mineral font-parkinsans">
        {children}
      </div>
    </AuthProvider>
  );
};

export default AuthLayout;
