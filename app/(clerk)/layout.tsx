import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      {children}
      <ThemeSwitcher className="fixed sm:bottom-10 bottom-5 right-10" />
    </div>
  );
};

export default ClerkLayout;
