"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, Trash } from "lucide-react";
import { CardWithList } from "@/types";

import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/use-card-modal";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const { toast } = useToast();
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeCopyCard, isloading: isloadingCopy } = useAction(
    copyCard,
    {
      onSuccess(data) {
        toast({
          description: `Card : ${data.title} Copied successfully`,
          variant: "success",
        });
        cardModal.onClose();
      },
      onError(error) {
        toast({
          description: error,
          variant: "destructive",
        });
      },
    }
  );
  const { execute: executeDeleteCard, isloading: isloadingDelete } = useAction(
    deleteCard,
    {
      onSuccess(data) {
        toast({
          description: `Card : ${data.title} deleted successfully`,
          variant: "success",
        });
        cardModal.onClose();
      },
      onError(error) {
        toast({
          description: error,
          variant: "destructive",
        });
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;
    executeCopyCard({ id: data.id, boardId });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;
    executeDeleteCard({ id: data.id, boardId });
  };

  return (
    <div className="space-y-2 mt-2 ">
      <p className="text-xs font-semibold">Actions</p>

      <Button
        onClick={onCopy}
        disabled={isloadingCopy}
        variant={"gray"}
        className="w-full justify-start"
        size={"inline"}
      >
        <Copy className="size-4 mr-2 " /> Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isloadingDelete}
        variant={"gray"}
        className="w-full justify-start !bg-rose-500 hover:!bg-rose-800 !text-white"
        size={"inline"}
      >
        <Trash className="size-4 mr-2" /> Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2 ">
      <Skeleton className="w-20 h-4 bg-secondary " />
      <Skeleton className="w-full h-8 bg-secondary " />
      <Skeleton className="w-full h-8 bg-secondary " />
    </div>
  );
};
