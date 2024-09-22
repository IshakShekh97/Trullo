"use client";

import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { useToast } from "@/hooks/use-toast";
import { List } from "@prisma/client";
import { useState, useRef, ElementRef } from "react";
import { useEventListener } from "usehooks-ts";
import ListOptions from "./list-options";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const { toast } = useToast();

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess(data) {
      toast({
        title: "List Title Updated",
        description: `List title : "${data.title}" has been updated`,
        variant: "success",
      });
      setTitle(data.title);
      disableEditing();
    },
    onError(error) {
      toast({
        title: "Failed to update list title",
        description: error,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) return disableEditing();

    execute({ title, id, boardId });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeydown);

  return (
    <div className="py-2 px-3 text-sm font-semibold flex justify-between items-center gap-x-2 bg-zinc-400 dark:bg-zinc-900 rounded-t-md ">
      {isEditing ? (
        <form action={handleSubmit} ref={formRef} className="flex-1 ">
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />

          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            placeholder="Enter list title"
            defaultValue={title}
            className="text-sm py-0 px-3 h-7 font-medium border-transparent hover:border-input focus:border-input transition-all bg-transparent focus:bg-transparent truncate "
          />

          <button type="submit" className="hidden" />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full px-2.5 py-1 text-sm font-medium border-transparent  "
        >
          {title}
        </div>
      )}

      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
};
