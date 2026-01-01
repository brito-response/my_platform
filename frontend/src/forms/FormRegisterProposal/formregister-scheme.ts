import * as yup from "yup";

export const formSchema = yup.object({
  value: yup.number().typeError("O valor deve ser um número").required("O valor é obrigatório").min(0, "O valor não pode ser negativo"),
  deadline: yup.date().required("O prazo é obrigatório").min(new Date(), "O prazo deve ser uma data futura"),
  message: yup.string().required("A mensagem é obrigatória").min(10, "A mensagem deve ter pelo menos 10 caracteres"),
  jobId: yup.string().uuid("ID do job inválido").required("O ID do job é obrigatório"),
});

export type FormSchemaType = yup.InferType<typeof formSchema>;
