"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavItemProps {
  isActive: boolean;
  isExpanded: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isActive,
  isExpanded,
  onExpand,
  organization,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: "Boards",
      icon: <Layout className="size-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="size-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="size-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
    {
      label: "Settings",
      icon: <Settings className="size-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
  ];

  const OnClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-3 rounded-md text-start no-underline hover:no-underline text-secondary-foreground hover:bg-secondary-foreground/10 transition-all ",
          isActive && !isExpanded && "bg-sky-500/20 text-sky-700 ",
        )}
      >
        <div className="flex items-center gap-x-3">
          <div className="size-7 relative">
            <Image
              fill
              src={organization.imageUrl}
              alt={organization.name}
              className="rounded-sm object-cover"
            />
          </div>

          <span className="font-medium">{organization.name}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pt-3 text-card-foreground">
        {routes.map((route) => (
          <Button
            size={"sm"}
            onClick={() => OnClick(route.href)}
            className={cn(
              "w-full font-normal justify-start pl-10 py-5 mb-2",
              pathname === route.href &&
                "dark:bg-sky-500/10 bg-sky-700 dark:text-sky-500 text-sky-300",
            )}
            key={route.href}
            variant={"ghost"}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

NavItem.Skeleton = function NavItemSkeleton() {
  return (
    <div className="flex items-center gap-x-2 ">
      <div className="size-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
