import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is Required",
    })
    .min(3, {
      message: "Title is Too short and must be at least 3 characters",
    }),
  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image is Required",
  }),
});
