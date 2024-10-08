import { z } from "zod";

export const UpdateList = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title Is required",
    })
    .min(2, {
      message: "Title must be at least 2 character long",
    }),
  id: z.string(),
  boardId: z.string(),
});
