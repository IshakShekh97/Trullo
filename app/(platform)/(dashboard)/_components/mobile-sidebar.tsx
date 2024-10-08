"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Ghost, Icon, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) return null;

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden mr-3"
        variant={"ghost"}
        size={"sm"}
      >
        <Menu className="size-4" />
      </Button>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side={"left"}
          className="p-2 pt-10 bg-muted/50 backdrop-blur-sm"
        >
          <Sidebar storageKey="mobile-sidebar" />
        </SheetContent>
      </Sheet>
    </>
  );
};
