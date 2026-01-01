import * as yup from 'yup';

export const formSchema = yup.object().shape({
  email: yup.string().required('O email é obrigatório').email('Digite um email válido'),
  password: yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type FormSchemaType = yup.InferType<typeof formSchema>;
