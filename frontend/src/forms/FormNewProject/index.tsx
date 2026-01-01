"use client";

import { useForm, FormProvider, type Resolver } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { formSchema, FormSchemaType } from "./formregister-scheme";
import { InputCustom } from "@/components/InputCustom";
import { SubButton } from "@/components/Shared/Buttons/SubButton";
import { useState } from "react";
import { ProjectOutput, ProjectInput } from "@/utils/data_types/projects";

type TypeFormNewProjectProps = { portfolioId: string; };

export const FormNewProject: React.FC<TypeFormNewProjectProps> = ({ portfolioId }) => {
  const [files, setFiles] = useState<(File | null)[]>([null, null, null]);
  const router = useRouter();
  const methods = useForm<FormSchemaType>({ resolver: yupResolver(formSchema) as Resolver<FormSchemaType>, mode: "onChange", defaultValues: { title: "", description: "", link: null, favorite: false } });

  // Atualiza o array de arquivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0] ?? null;
    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);
  };

  const handlesubmitRegister = async (data: FormSchemaType) => {
    if (files.some((f) => !f)) {
      toast.error("Escolha as 3 imagens!");
      return;
    }
    try {
      const input = { ...data, portfolioId: portfolioId } as ProjectInput;
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (response.status === 201) {
        toast.success("Projeto criado com sucesso! Enviando imagens...");
        const project: ProjectOutput = await response.json();

        const formData = new FormData();
        files.forEach((file) => file && formData.append("images", file));

        const uploadResp = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects/update/${project.projectId}`, {
          method: "POST",
          body: formData,
        });

        if (uploadResp.ok) {
          toast.success("Imagens enviadas com sucesso!");
          router.push("/manager");
        } else {
          toast.error("Erro ao enviar imagens");
        }
      } else {
        toast.error("Erro ao criar projeto");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro de comunicação com o servidor");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handlesubmitRegister)}
        className="flex flex-col gap-6 sm:p-6 lg:p-8 w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.18)] border border-gray-100 max-w-[90%] mx-auto"
      >
        {/* Título */}
        <InputCustom name="title" label="Título do Projeto" required />

        {/* Descrição */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea id="description" {...methods.register("description")} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          {methods.formState.errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {String(methods.formState.errors.description?.message)}
            </p>
          )}
        </div>

        {/* Link */}
        <InputCustom name="link" label="Link do Projeto (GitHub, Deploy, etc)" placeholder="https://github.com/meuprojeto" />

        {/* Imagens */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Escolha 3 imagens (mínimo)</label>
          <div className="flex gap-4 mt-2">
            {files.map((_, i) => (
              <input key={i} type="file" accept="image/*" onChange={(e) => handleFileChange(e, i)} className="border border-gray-300 rounded-lg p-2 w-full" />
            ))}
          </div>
          <ul className="mt-2 text-sm text-gray-700">
            {files.map((f, idx) => f && <li key={idx}>{f.name}</li>)}
          </ul>
        </div>

        {/* Favorito */}
        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" {...methods.register("favorite")} className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
          <label className="text-gray-700 text-sm">Marcar como favorito</label>
        </div>

        {/* Botão */}
        <SubButton type="submit" label="Criar Projeto" />
      </form>
    </FormProvider>
  );
};
