"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { AlignLeft } from "lucide-react";
import { useRef, useState, ElementRef, use } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";

interface DescriptionProps {
  data: CardWithList;
}

export const Description = ({ data }: DescriptionProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const params = useParams();

  const [isEditing, setIsEditing] = useState(false);

  const textAreaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast({
        description: `Card : ${data.title}'s description updated`,
        variant: "success",
      });
      disableEditing();
    },

    onError(error) {
      toast({
        description: error,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    execute({
      description,
      boardId,
      id: data.id,
    });
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="size-5 mt-0.5 text-primary" />
      <div className="w-full">
        <p className="font-semibold text-primary mb-2  ">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <FormTextarea
              ref={textAreaRef}
              errors={fieldErrors}
              id="description"
              className="w-full mt-2 bg-secondary"
              placeholder="Add a more detailed description..."
              defaultValue={data.description || undefined}
            />
            <div className="flex items-center gap-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size={"sm"}
                variant={"destructive"}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            className="min-h-[78px] bg-secondary text-sm font-medium py-3 px-3.5 rounded-md"
            role="button"
          >
            {data.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full  ">
      <Skeleton className="size-6 bg-secondary " />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-secondary " />
        <Skeleton className="w-full h-[78px]  bg-secondary " />
      </div>
    </div>
  );
};
