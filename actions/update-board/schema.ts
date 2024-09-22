import { z } from "zod";

export const UpdateBoard = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title Is required",
    })
    .min(3, {
      message: "Title must be at least 3 character long",
    }),
  id: z.string(),
});
