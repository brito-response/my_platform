"use client";

import { useForm, FormProvider, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { SubButton } from "@/components/Shared/Buttons/SubButton";
import { InputCustom } from "@/components/InputCustom";
import { updateFormSchema, UpdateFormSchemaType } from "./formregister-scheme";
import { UpdateUserInput } from "@/utils/data_types/users";
import { useSession } from "next-auth/react";

export const FormUpdateUser = () => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const router = useRouter();
  const { data: session, update } = useSession();

  const methods = useForm<UpdateFormSchemaType>({
    resolver: yupResolver(updateFormSchema) as Resolver<UpdateFormSchemaType>, mode: "onChange",
    defaultValues: { photo: "", bio: "", skills: "", hourly_rate: null },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPhotoFile(file);
  };

  const handleSubmitUpdate = async (data: UpdateFormSchemaType) => {
    try {
      const payload: UpdateUserInput = {
        photo: photoFile?.name ?? undefined,
        bio: data.bio ?? undefined,
        skills: data.skills?.split(","),
        hourly_rate: data.hourly_rate ?? undefined,
        score: undefined,
        checked: undefined,
        userStatus: undefined,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Erro ao atualizar informações do usuário");
        return;
      }
      const usersession = await response.json();
      // 🔹 Upload da foto (caso exista)
      if (photoFile && usersession) {
        const formData = new FormData();
        formData.append("photo", photoFile, photoFile.name);
        const uploadResp = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/photo`, { method: "POST", body: formData });
        if (uploadResp.ok) {
          const userAtualizado = await uploadResp.json();
          const newSession = await update({ user: { ...session?.user, image: userAtualizado.photo, } });
          if (newSession) {
            toast.success("Dados do usuário atualizados com sucesso!");
          }
        } else {
          toast.error("Erro ao enviar a foto");
        }
      }
      router.refresh();
      router.push("/manager");
    } catch (error) {
      console.error(error);
      toast.error("Erro de comunicação com o servidor");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmitUpdate)}
        className="flex flex-col gap-6 sm:p-6 lg:p-8 w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 max-w-[90%] mx-auto"
      >
        {/* Foto */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Foto do usuário</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2 border border-gray-300 rounded-lg p-2 w-full" />
          {photoFile && <p className="text-sm text-gray-600 mt-1">{photoFile.name}</p>}
        </div>

        {/* Bio */}
        <InputCustom name="bio" label="Biografia" type="text" />

        {/* Skills */}
        <InputCustom name="skills" label="Habilidades (separadas por vírgula)" type="text" />

        {/* Hourly Rate */}
        <InputCustom name="hourly_rate" label="Valor por hora" type="number" />

        {/* Botão */}
        <SubButton type="submit" label="Atualizar Usuário" />
      </form>
    </FormProvider>
  );
};
