import { z } from 'zod';

export const RideHistoryParamSchema = z.object({
  customer_id: z.string().min(1),
});

export const RideHistoryQuerySchema = z.object({
  driver_id: z.number().optional(),
});
