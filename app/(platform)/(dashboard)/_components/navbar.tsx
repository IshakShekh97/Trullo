import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import { dark } from "@clerk/themes";
import { FormPopover } from "@/components/form/form-popover";
import { cn } from "@/lib/utils";

export const Navbar = ({ className }: { className?: string }) => {
  return (
    <nav
      className={cn(
        "fixed px-2 sm:px-10 z-50 top-0 w-full h-16 border-b shadow-sm  backdrop-blur-lg backdrop-saturate-150 backdrop-brightness-125  flex items-center",
        className,
      )}
    >
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex ">
          <Logo className="text-xl font-bold" />
        </div>

        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            variant={"primary"}
            size={"sm"}
            className="rounded-sm hidden md:block h-auto py-1.5 px-2"
          >
            Create
          </Button>
        </FormPopover>

        <FormPopover>
          <Button
            className="rounded-sm block md:hidden"
            variant={"primary"}
            size={"sm"}
          >
            <Plus className="size-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2 ">
        <span className="dark:hidden">
          <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl="/organization/:id"
            afterSelectOrganizationUrl="/organization/:id"
            afterLeaveOrganizationUrl="/select-org"
          />
        </span>

        <span className="hidden dark:block">
          <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl="/organization/:id"
            afterSelectOrganizationUrl="/organization/:id"
            afterLeaveOrganizationUrl="/select-org"
            appearance={{
              baseTheme: dark,
              elements: {
                rootBox: {
                  color: "black",
                  backgroundColor: "black",
                  borderRadius: 8,
                  padding: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              },
            }}
          />
        </span>

        <div className="dark:hidden flex">
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  height: 30,
                  width: 30,
                },
              },
            }}
          />
        </div>
        <div className="hidden dark:flex">
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  height: 30,
                  width: 30,
                },
              },
              baseTheme: dark,
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
