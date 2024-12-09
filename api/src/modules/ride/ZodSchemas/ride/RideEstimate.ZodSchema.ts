import { z } from 'zod';

export const RideEstimateSchema = z.object({
  customer_id: z.string().min(1),
  origin: z.string().min(1),
  destination: z.string().min(1),
});
