"use client";

import { useForm, FormProvider, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { InputCustom } from "@/components/InputCustom";
import { SubButton } from "@/components/Shared/Buttons/SubButton";
import { HCustom } from "@/components/Texts/HCustom";
import { useRouter } from "next/navigation";
import { formSchema, FormSchemaType } from "./formregister-scheme";

type FormRegisterProposalProps = { jobId: string; };
export const FormRegisterProposal: React.FC<FormRegisterProposalProps> = ({ jobId }) => {
  const router = useRouter();
  //forçar resolver: yupResolver(formSchema) as Resolver<FormSchemaType>,
  const methods = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
    defaultValues: { value: 0, deadline: new Date, message: "", jobId },
  });

  const handleSubmitProposal = async (data: FormSchemaType) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/proposals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        toast.success("Proposta enviada com sucesso!");
        router.push("/manager");
      } else {
        toast.error("Você ja fez 1 proposta para esse trabalho, não é permitido fazer outra.");
      }
    } catch (error) {
      toast.error("Falha na comunicação com o servidor.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmitProposal)} className="flex flex-col gap-6 p-6 w-full max-w-[700px] mx-auto">
        <HCustom level={5} className="text-center text-gray-700 mb-4">
          Faça sua Proposta
        </HCustom>

        {/* Valor e Prazo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputCustom name="value" label="Valor (R$)" type="number" placeholder="Digite o valor proposto" required />
          <InputCustom name="deadline" label="Prazo para entrega" type="date" asDate required />
        </div>

        {/* Mensagem */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Mensagem</label>
          <textarea {...methods.register("message")} rows={4} placeholder="Descreva brevemente sua proposta..." className="border border-gray-300 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          {methods.formState.errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {methods.formState.errors.message.message}
            </p>
          )}
        </div>

        {/* Campos ocultos */}
        <input type="hidden" {...methods.register("jobId")} value={jobId} />

        {/* Botão */}
        <div className="flex justify-end mt-4">
          <SubButton label="Enviar Proposta" />
        </div>
      </form>
    </FormProvider>
  );
};
