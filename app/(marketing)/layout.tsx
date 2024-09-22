import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <div className="dark:size-60 size-80 bg-gradient-to-br from-fuchsia-500 to bg-cyan-500 fixed -translate-x-1/2 -translate-y-1/2 top-[30%] left-1/2 -z-40 blur-[200px]" />
      <Navbar />
      <main className="pt-40 pb-20">{children}</main>
      <Footer />
      <ThemeSwitcher className="fixed bottom-20 right-5" />
    </div>
  );
};

export default MarketingLayout;
