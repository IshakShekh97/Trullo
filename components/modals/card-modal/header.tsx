"use client";

import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { Layout } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  data: CardWithList;
}

export const Header = ({ data }: HeaderProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const params = useParams();

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast({
        description: `${data.title} Renamed successfully`,
        variant: "success",
      });
      setTitle(data.title);
    },

    onError(error) {
      toast({
        description: error,
        variant: "destructive",
      });
    },
  });

  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    if (title === data.title) return;

    execute({
      title,
      boardId,
      id: data.id,
    });
  };

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="size-6 mt-2 text-primary" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            errors={fieldErrors as Record<string, string[] | undefined>}
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            className="font-semibold text-xl px-3 text-primary bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-secondary focus-visible:border-input mb-0.5 truncate"
          />
        </form>

        <p className="text-sm text-muted-foreground ">
          in List <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6 ">
      <Skeleton className="size-6 mt-2 bg-secondary" />
      <div className="">
        <Skeleton className="w-24 h-6 bg-secondary mb-1" />
        <Skeleton className="w-12 h-4 bg-secondary" />
      </div>
    </div>
  );
};
