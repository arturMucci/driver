import { z } from 'zod';

export const RideConfirmSchema = z.object({
  customer_id: z.string().min(1),
  origin: z.string().min(1),
  destination: z.string().min(1),
  distance: z.number(),
  duration: z.string(),
  driver: z.object({
    id: z.number(),
    name: z.string(),
  }),
  value: z.number(),
});
