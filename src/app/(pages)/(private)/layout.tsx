import MainLayout from "@/components/templates/layouts/MainLayout";
import PrivateProvider from "@/providers/PrivateProvider";
import { SidebarProvider } from "@/providers/SidebarProvider";
const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivateProvider>
      <SidebarProvider>
        <MainLayout>{children}</MainLayout>
      </SidebarProvider>
    </PrivateProvider>
  );
};

export default PrivateLayout;
