import { z } from "zod";
import creatorSchema from "./creatorSchema";

const postSchema = z.object({
  count: z.number(),
  data: z.array(z.object({
    id: z.string(),
    replies: z.number(),
    creator: creatorSchema,
    text: z.string(),
    mediaUrl: z.string().nullable(),
    mediaType: z.enum(["image/png", "image/jpeg"]).nullable(),
    likes: z.number(),
    likedBySelf: z.boolean().nullable(),
  })),
  next: z.string().nullable(),
  previous: z.string().nullable(),
});

export default postSchema;
