import zod from 'zod';

const userSchema = zod.object({
  username: zod
    .string({
      invalid_type_error: 'El usuario debe ser un string',
      required_error: 'Usuario es requerido',
    })
    .min(1, 'El usuario no puede estar vacio'),
  email: zod
    .string({
      invalid_type_error: 'El email debe ser un string',
      required_error: 'Email es requerido',
    })
    .email('El email debe ser valido'),
  password: zod
    .string({
      invalid_type_error: 'La contraseña debe ser un string',
      required_error: 'Contraseña es requerida',
    })
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(14, 'La contraseña no puede tener más de 14 caracteres'),
  role: zod
    .string({
      invalid_type_error: 'El rol debe ser un string',
      required_error: 'Rol es requerido',
    })
    .min(1, 'El rol no puede estar vacio'),
});

export const validateUser = (object) => {
  return userSchema.safeParse(object);
};

export const validatePartialUser = (object) => {
  return userSchema.partial().safeParse(object);
};
