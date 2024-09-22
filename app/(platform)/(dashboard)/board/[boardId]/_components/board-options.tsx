"use client";

import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { MoreHorizontal, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { toast } = useToast();

  const { execute, isloading } = useAction(deleteBoard, {
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Board deleted successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"transparent"} className="size-auto p-2">
          <MoreHorizontal className="size-4  " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center pb-4 ">
          Board Actions
        </div>
        <PopoverClose asChild>
          <Button
            variant={"ghost"}
            className="size-auto p-2 absolute top-2 right-2"
            size={"sm"}
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>

        <Button
          variant={"destructive"}
          onClick={onDelete}
          className="mx-auto w-[90%] flex h-auto p-2 px-5 justify-center items-center gap-2 font-normal text-sm"
          disabled={isloading}
        >
          <Trash2 />
          Delete This Board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
