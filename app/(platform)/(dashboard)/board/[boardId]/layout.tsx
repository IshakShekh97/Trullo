import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import Navbar from "../../_components/navbar";
import { startCase } from "lodash";
import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();
  if (!orgId) return { title: "Board" };

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  return {
    title: startCase(board?.title || "organization"),
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    boardId: string;
  };
}) => {
  const { orgId } = auth();
  if (!orgId) redirect("select-org");

  const board = await db.board.findFirst({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <>
      <Navbar className="bg-white/30 dark:bg-gray-950/50 " />
      <div
        className="relative h-full bg-no-repeat bg-cover bg-center "
        style={{
          backgroundImage: `url(${board.imageFullUrl})`,
        }}
      >
        <BoardNavbar data={board} />

        <div className="absolute inset-0 bg-black/20" />

        <main className="relative pt-36 h-screen text-zinc-50">{children}</main>
      </div>
    </>
  );
};

export default BoardIdLayout;
