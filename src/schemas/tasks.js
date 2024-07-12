import zod from 'zod';

const taskSchema = zod.object({
  title: zod
    .string({
      invalid_type_error: 'El titulo debe ser un string',
      required_error: 'Titulo es requerido',
    })
    .min(1, 'El titulo no puede estar vacio'),
  description: zod.string({
    invalid_type_error: 'La descripción debe ser un string',
    required_error: 'Descripción es requerido',
  }),
  expiration: zod
    .string({
      invalid_type_error: 'La fecha debe ser un string',
      required_error: 'Fecha es requerido',
    })
    .date({
      invalid_type_error: 'El formato de fecha debe ser DD-MM-AAAA',
    }),
  status: zod.string({
    invalid_type_error: 'El estado debe ser un string',
    required_error: 'Estado es requerido',
  }),
});

export const validateTask = (object) => {
  return taskSchema.safeParse(object);
};
