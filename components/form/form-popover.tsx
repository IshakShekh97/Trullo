"use client";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/use-action";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FormPicker } from "./form-picker";
import React, { ElementRef } from "react";
import { useRouter } from "next/navigation";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  align,
  side = "bottom",
  sideOffset = 0,
}: FormPopoverProps) => {
  const router = useRouter();
  const closeRef = React.useRef<ElementRef<"button">>(null);
  const { toast } = useToast();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast({
        title: "Board Created",
        description: "Your board has been created successfully",
        variant: "success",
      });
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Error Occured",
        description: error,
        variant: "destructive",
      });
    },
  });

  const onSumbit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="text-sm font-medium text-center pb-4 text-muted-foreground ">
          Create Board
        </div>

        <PopoverClose asChild ref={closeRef}>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 "
            variant={"ghost"}
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>

        <form action={onSumbit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker
              id="image"
              errors={fieldErrors as Record<string, string[] | undefined>}
            />

            <FormInput
              errors={fieldErrors as Record<string, string[] | undefined>}
              id="title"
              label="Board Title"
              type="text"
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
