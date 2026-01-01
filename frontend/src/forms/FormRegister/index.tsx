"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema, FormSchemaType } from "./formregister-scheme";
import { toast } from "react-toastify";
import { InputCustom } from "@/components/InputCustom";
import { SubButton } from "@/components/Shared/Buttons/SubButton";

export const FormRegister = () => {
  const router = useRouter();
  const methods = useForm<FormSchemaType>({resolver: yupResolver(formSchema), mode: "onChange",
    defaultValues: { name: "", email: "", cpf: "", password: "", repeatPassword: "", phone: "", country: "", state: "", city: "", address: "", typeuser: "CLIENT" },
  });

  const handlesubmitRegister = async (data: FormSchemaType) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response && response.status === 201) {
        toast.success("Usuário criado com sucesso, 1 seg e será redirecionado!");
        router.push("/");
      } else {
        toast.error(response.status === 400? "Email já existe na aplicação, prossiga para redefinição de senha" : "Erro ao registrar");
      }
    } catch (error) {
      throw new Error("Ocorreu um erro de comunicação no Next...");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handlesubmitRegister)} className="flex flex-col gap-4 p-6 bg-white rounded-md w-full max-w-[80%] mx-auto">
        {/* Linha 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputCustom name="name" label="Nome completo" required />
          <InputCustom name="email" label="Email" type="email" required />
        </div>

        {/* Linha 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputCustom name="cpf" label="CPF" required />
          <InputCustom name="phone" label="Telefone" required />
        </div>

        {/* Linha 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputCustom name="country" label="País" required />
          <InputCustom name="state" label="Estado" required />
          <InputCustom name="city" label="Cidade" required />
        </div>

        {/* Linha 4 */}
        <InputCustom name="address" label="Endereço" required />

        {/* Linha 5 - Senhas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputCustom name="password" label="Senha" type="password" required />
          <InputCustom name="repeatPassword" label="Confirme sua senha" type="password" required />
        </div>

        {/* Linha 6 - Tipo de usuário */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Tipo de usuário
          </label>
          <select {...methods.register("typeuser")} className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value={"CLIENT"}>Cliente</option>
            <option value={"FREELANCER"}>Freelancer</option>
          </select>
        </div>

        {/* Botão */}
        <div className="flex justify-center mt-4">
          <SubButton label="Registrar" />
        </div>
      </form>
    </FormProvider>
  );
};
