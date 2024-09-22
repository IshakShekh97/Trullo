"use client";

import { Button } from "@/components/ui/button";
import { ListWrapper } from "./list-wrapper";
import { Plus, X } from "lucide-react";
import { useRef, useState, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";

import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { useToast } from "@/hooks/use-toast";

export const ListForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast({
        title: "List Created",
        description: `List ${data.title} has been created successfully`,
        variant: "success",
      });
      disableEditing();
      router.refresh();
    },

    onError: (error) => {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    },
  });

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeydown);

  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({ title, boardId });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 bg-secondary/80 rounded-md space-y-4 shadow-md text-primary"
        >
          <FormInput
            id="title"
            errors={fieldErrors as Record<string, string[] | undefined>}
            ref={inputRef}
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition-all"
            placeholder="Enter list title..."
          />

          <input hidden value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1 ">
            <FormSubmit>Add List</FormSubmit>
            <Button onClick={disableEditing} size={"sm"} variant={"ghost"}>
              <X className="size-5  " />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <Button
        onClick={enableEditing}
        variant={"secondary"}
        className="w-full flex hover:bg-secondary/40 dark:hover:bg-secondary/60 bg-secondary transition-all items-center justify-start h-[50px]"
      >
        <Plus className="size-4 mr-2 ml-5 " />
        Add List
      </Button>
    </ListWrapper>
  );
};
