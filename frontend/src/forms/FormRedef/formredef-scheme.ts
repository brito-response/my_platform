import * as yup from 'yup';

export const formSchema = yup.object().shape({
  token: yup.string().required('O código é obrigatório'),
  password: yup.string().required('A senha é obrigatória').min(8, 'A senha deve ter pelo menos 8 caracteres'),
  confirpassword: yup.string().required('A confirmação de senha é obrigatória').oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
});

export type FormSchemaType = yup.InferType<typeof formSchema>;
