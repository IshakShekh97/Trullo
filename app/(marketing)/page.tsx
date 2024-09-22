import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 flex items-center font-black border shadow-sm p-4 bg-amber-100 text-amber-800 rounded-full uppercase  ">
          <Medal className="size-6 mr-2" />
          No.1 Task Managment
        </div>

        <h1 className="text-3xl md:text-6xl text-center mb-6">
          Trullo Helps Teams Move
        </h1>

        <div className="text-3xl font-bold md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 px-4 p-2 rounded-md pb-4 w-fit">
          Work Forward.
        </div>
      </div>

      <div className="text-sm md:text-xl mt-4 max-w-xs md:max-w-2xl text-center mx-auto  ">
        Collabrate, Manage Projects, and Reach New Productivity Peaks. From High
        rises to the home office, the way your team works is unique—accomplish
        it all with Trullo.
      </div>

      <Button className="mt-6" size={"lg"} asChild>
        <Link href="/sign-up">Get Started With Trullo</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
