import * as yup from "yup";
import { JobLevel, StatusJob } from "@/utils/data_types/jobs";

export const jobFormSchema = yup.object({
  title: yup.string().required("O título é obrigatório").min(3, "O título deve ter pelo menos 3 caracteres"),
  description: yup.string().required("A descrição é obrigatória").min(5, "A descrição deve ter pelo menos 5 caracteres"),
  level: yup.mixed<JobLevel>().oneOf(Object.values(JobLevel)).required("O level é obrigatório"),
  budget: yup.number().required("O orçamento é obrigatório").min(0, "O orçamento não pode ser negativo"),
  deadline: yup.date().required("O prazo é obrigatório").min(new Date(), "O prazo deve ser uma data futura"),
  status: yup.mixed<StatusJob>().oneOf(Object.values(StatusJob)).required("O status é obrigatório"),
  link1: yup.string().required("O ID do usuário é obrigatório"),
  link2: yup.string().required("O ID do usuário é obrigatório"),
});

export type JobFormType = yup.InferType<typeof jobFormSchema>;
