"use client";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverClose,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { useToast } from "@/hooks/use-toast";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { ElementRef, useRef } from "react";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const { toast } = useToast();

  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess(data) {
      toast({
        title: "List Deleted",
        description: `List "${data.title}" has been deleted`,
        variant: "success",
      });
      closeRef.current?.click();
    },
    onError(error) {
      toast({
        title: "Failed to delete list",
        description: error,
        variant: "destructive",
      });
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess(data) {
      toast({
        title: "List Deleted",
        description: `List "${data.title}" Copies`,
        variant: "success",
      });
      closeRef.current?.click();
    },
    onError(error) {
      toast({
        title: "Failed to delete list",
        description: error,
        variant: "destructive",
      });
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeDelete({ id, boardId });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="size-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="size-4 " />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="px-0 py-3  " side="bottom" align="start">
        <div className="text-sm font-medium text-center text-primary ">
          List Actions
        </div>

        <PopoverClose ref={closeRef} asChild>
          <Button
            className="size-auto p-2 absolute top-2 right-2 "
            variant={"destructive"}
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>

        <Button
          onClick={onAddCard}
          className="rounded-none h-auto mt-5 w-full p-2 px-5 justify-start font-normal text-sm  "
          variant={"ghost"}
        >
          Add Card...
        </Button>

        <form action={onCopy}>
          <input type="hidden" name="id" value={data.id} id="id" />
          <input
            type="hidden"
            name="boardId"
            value={data.boardId}
            id="boardId"
          />
          <FormSubmit
            variant="ghost"
            className="rounded-none h-auto  w-full p-2 px-5 justify-start font-normal text-sm  "
          >
            Copy list ...
          </FormSubmit>
        </form>
        <Separator className="bg-primary/50" />
        <form action={onDelete}>
          <input type="hidden" name="id" value={data.id} id="id" />
          <input
            type="hidden"
            name="boardId"
            value={data.boardId}
            id="boardId"
          />
          <FormSubmit
            variant="ghost"
            className="rounded-none hover:bg-rose-600 hover:text-white  h-auto  w-full p-2 px-5 justify-start font-normal text-sm  "
          >
            Delete This List
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
