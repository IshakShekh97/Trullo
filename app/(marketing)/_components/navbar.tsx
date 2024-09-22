import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div
      className={cn(
        "fixed top-0 w-full h-16 px-4 border-b shadow-sm bg-zinc-300 dark:bg-zinc-900/20 flex items-center",
      )}
    >
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo className="text-2xl font-bold" />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size={"sm"} variant={"outline"} asChild>
            <Link href={"/sign-in"}>Login</Link>
          </Button>
          <Button asChild size={"sm"}>
            <Link href={"/sign-up"}>Get Trullo For Free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
