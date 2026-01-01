import * as yup from "yup";

export const formSchema = yup.object({
  title: yup.string().required("O título é obrigatório").min(3),
  description: yup.string().required("A descrição é obrigatória").min(10),
  link: yup.string().nullable(), // opcional
  favorite: yup.boolean().default(false),
});
export type FormSchemaType = yup.InferType<typeof formSchema>;