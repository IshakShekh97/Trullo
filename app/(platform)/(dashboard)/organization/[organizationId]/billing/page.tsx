import React from "react";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-6" />

      <div className="flex items-center text-xl font-bold flex-col gap-3">
        Feature to implement
        <p>(Stripe Not Available In India)</p>
      </div>
    </div>
  );
};

export default page;
