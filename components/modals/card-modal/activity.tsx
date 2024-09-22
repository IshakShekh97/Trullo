"use client";

import { ActivityItem } from "@/components/ActivityItem";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";

interface ActivityProps {
  items: AuditLog[];
}

export const Activity = ({ items }: ActivityProps) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="size-5 mt-0.5 text-primary" />

      <div className="w-full">
        <p className="font-semibold text-primary mb-2">Activity</p>
        <ol className="mt-2 space-y-4">
          {items.map((item) => (
            <ActivityItem data={item} key={item.id} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full ">
      <Skeleton className="bg-secondary size-6" />
      <div className="w-full">
        <Skeleton className="bg-secondary w-24 h-6 mb-2" />
        <Skeleton className="bg-secondary w-full h-10" />
      </div>
    </div>
  );
};
