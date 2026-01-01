"use client";

import { useForm, FormProvider } from 'react-hook-form';
import { redirect } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from './formredef-scheme';
import { IFormInputRedem, sendRedemServerSideProps } from '../../utils/actions';
import { InputCustom } from '@/components/InputCustom';

export const FormRedef = () => {
  const methods = useForm<IFormInputRedem>({ resolver: yupResolver(formSchema) , mode: 'onChange', defaultValues: { token: '', password: '', confirpassword: '' } });

  const onSubmit = async (data: IFormInputRedem) => {
    const response = await sendRedemServerSideProps(data);
    if (response.statusCode === 200) {
      redirect("/login");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 p-6 bg-white shadow-md rounded-md">
        <InputCustom name="token" label="Código" required={true} />
        <InputCustom name="password" label="Senha" type="password" required={true} />
        <InputCustom name="confirpassword" label="Confirme a senha" type="password" required={true} />

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Registrar</button>
      </form>
    </FormProvider>
  );
}