import * as yup from "yup";

export const updateFormSchema = yup.object({
  photo: yup.string().url("Digite uma URL válida para a foto").nullable().optional(),
  bio: yup.string().max(500, "A bio deve ter no máximo 500 caracteres").nullable().optional(),
  skills: yup.string().max(500, "A bio deve ter no máximo 500 caracteres").nullable().optional(),
  hourly_rate: yup.number().min(0, "O valor deve ser maior ou igual a 0").nullable().optional(),
});

export type UpdateFormSchemaType = yup.InferType<typeof updateFormSchema>;
