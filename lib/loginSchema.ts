"use server"

import { z } from "zod"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters"),
  image: z.string().url("Invalid image URL").optional(),
})