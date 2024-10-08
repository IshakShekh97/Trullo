import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";
import { ActivityList } from "./_components/activity-list";
import { Suspense } from "react";

const ActivityPage = () => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-4" />

      <div className="h-[80vh] overflow-y-auto">
        <Suspense fallback={<ActivityList.Skeleton />}>
          <ActivityList />
        </Suspense>
      </div>
    </div>
  );
};

export default ActivityPage;
