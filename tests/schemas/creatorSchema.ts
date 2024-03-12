import { z } from "zod";

const creatorSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatarUrl: z.string().nullable(),
});

export default creatorSchema;
