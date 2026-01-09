"use client";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubButton } from "@/components/Shared/Buttons/SubButton";
import { InputCustom } from "@/components/InputCustom";
import { JobLevel, StatusJob } from "@/utils/data_types/jobs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { jobFormSchema, JobFormType } from "./formregister-scheme";
import { toISODate } from "@/utils/transforms/data";
import { RichTextEditor } from "../RichText";
import { useEffect } from "react";
import { useWallet } from "@/contexts/wallet_context";

export const FormRegisterJob = () => {
  const { setDebitValue } = useWallet();
  const router = useRouter();
  const methods = useForm<JobFormType>({
    resolver: yupResolver(jobFormSchema), mode: "onChange",
    defaultValues: { title: "", description: "", level: JobLevel.LOW, maxFreelancers: 0, budget: 0, deadline: new Date(), status: StatusJob.OPEN, link1: "", link2: "" },
  });
  const budget = methods.watch("budget");

  const handleSubmitRegister = async (data: JobFormType) => {
    // trnsform data 
    const payload = { ...data, deadline: toISODate(data.deadline), linksReferences: [data.link1 || "", data.link2 || ""] };
    const { link1, link2, ...newPayload } = payload;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPayload),
      });

      if (response.ok) {
        toast.success("Job criado com sucesso!");
        router.push("/manager");
      } else if (response.status == 403) {
        toast.error("Você não tem permissão para criar Job.");
      } else {
        toast.error("erro no servidor, deu pau.");
      }
    } catch {
      toast.error("Erro de comunicação com o servidor");
    }
  };

  useEffect(() => {
    setDebitValue(Number(budget) || 0);
  }, [budget]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmitRegister)} className="flex flex-col gap-4 p-6 bg-(--background) rounded-md w-full max-w-[80%] mx-auto">
        <InputCustom name="title" label="Título do Job" required />
        <RichTextEditor name="description" label="Descrição" />

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Level</label>
          <select {...methods.register("level")} className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {Object.values(JobLevel).map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <InputCustom name="maxFreelancers" label="Número Max de Freelancers aceitos para esse Job" type="number" required />
        <InputCustom name="budget" label="Orçamento" type="number" required />
        <InputCustom name="deadline" label="Prazo final" type="date" asDate required />

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Status</label>
          <select {...methods.register("status")} className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {Object.values(StatusJob).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <InputCustom name="link1" label="Link de referência 1" required />
        <InputCustom name="link2" label="Link de referência 2" required />

        <div className="flex justify-center mt-4">
          <SubButton label="Criar Job" />
        </div>
      </form>
    </FormProvider>
  );
};
