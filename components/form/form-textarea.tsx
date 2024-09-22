"use client";

import { forwardRef, KeyboardEventHandler } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { useFormStatus } from "react-dom";

interface FormTextAreaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onkeyDown?: () => KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  defaultValue?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      onBlur,
      onClick,
      onkeyDown,
      defaultValue,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2 w-full  ">
        <div className="space-y-1 w-full ">
          {label ? (
            <Label htmlFor={id} className="text-sm font-semibold ">
              {label}
            </Label>
          ) : null}

          <Textarea
            onKeyDown={onkeyDown}
            onBlur={onBlur}
            onClick={onClick}
            ref={ref}
            required={required}
            placeholder={placeholder}
            name={id}
            id={id}
            disabled={disabled || pending}
            className={cn(
              "resize-none  focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm dark:bg-zinc-700 bg-gray-300 ",
              className
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
          />
        </div>

        <FormErrors
          id={id}
          errors={errors as Record<string, string[] | undefined>}
        />
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
