import { z } from 'zod';

const VehicleZodSchema = z.object({
  model: z.string().min(3, {
    message: 'Model deve ser uma string com, pelo menos, 3 caracteres',
  }),
  year: z.number().gte(1900).lte(2022),
  color: z
    .string()
    .min(3, {
      message: 'Color Deve ser uma string com, pelo menos, 3 caracteres',
    }),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type IVehicle = z.infer<typeof VehicleZodSchema>;

export { VehicleZodSchema };
