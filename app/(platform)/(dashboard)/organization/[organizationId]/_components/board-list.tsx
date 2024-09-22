import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/Hint";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getAvailableCount } from "@/lib/org-limit";
import { MAX_FREE_BOARDS } from "@/constants/boards";

export const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) return redirect("/select-org");

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const availableCount = await getAvailableCount();

  return (
    <div className="space-y-4  ">
      <div className="flex items-center font-semibold text-lg text-accent-foreground/70">
        <User2 className="size-6 mr-2" />
        Your Boards
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            style={{
              backgroundImage: `url(${board.imageThumbUrl})`,
            }}
            className="group relative aspect-video bg-no-repeat bg-accent bg-cover bg-sky-600 rounded-sm size-full p-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/80 transition-all " />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}

        <FormPopover sideOffset={10} side="bottom">
          <div
            role="button"
            className="aspect-video relative size-full rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition-all bg-muted"
          >
            <p className="text-sm  ">Create New Board</p>
            <span className="text-sm">
              {`${MAX_FREE_BOARDS - availableCount} Remaining `}
            </span>
            <Hint
              sideOffset={40}
              description={`Free Workspaces can have to 5 Open board. for unlimited boards upgrade this workspace`}
            >
              <HelpCircle className="absolute bottom-2 right-2 size-[14px] " />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
      <Skeleton className="aspect-video size-full p-2 " />
      <Skeleton className="aspect-video size-full p-2 " />
      <Skeleton className="aspect-video size-full p-2 " />
      <Skeleton className="aspect-video size-full p-2 " />
      <Skeleton className="aspect-video size-full p-2 " />
      <Skeleton className="aspect-video size-full p-2 " />
      <Skeleton className="aspect-video size-full p-2 " />
      <Skeleton className="aspect-video size-full p-2 " />
      <Skeleton className="aspect-video size-full p-2 " />
    </div>
  );
};
