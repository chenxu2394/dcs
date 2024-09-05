import { z } from "zod"

export const cartSchema = z.record(z.number().min(0))

export type Cart = z.infer<typeof cartSchema>
