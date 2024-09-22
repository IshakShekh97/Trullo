"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";

export const Info = () => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return (
      <div>
        <Info.Skeleton />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-x-4 ">
      <div className="size-[60px] relative">
        <Image
          fill
          src={organization?.imageUrl as string}
          alt={organization?.name as string}
          className="rounded-md object-cover"
        />
      </div>

      <div className="space-y-1">
        <p className="font-semibold text-xl">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="size-3 mr-1 " />
          Free
        </div>
      </div>
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4 ">
      <div className="size-[60px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-[200px] h-10" />
        <div className="flex items-center">
          <Skeleton className="size-4 mr-2" />
          <Skeleton className="h-4 w-[100px] " />
        </div>
      </div>
    </div>
  );
};
