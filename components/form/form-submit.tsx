"use client";

import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface FormSubmitProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "destructive"
    | "outline"
    | "link"
    | "ghost"
    | "default";
}

export const FormSubmit = ({
  children,
  className,
  disabled,
  variant = "primary",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      variant={variant}
      type="submit"
      size={"sm"}
      className={cn(className)}
    >
      {children}
    </Button>
  );
};
