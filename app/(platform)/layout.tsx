import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const PlatFormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ThemeSwitcher className="fixed bottom-10 right-10" />
    </>
  );
};

export default PlatFormLayout;
