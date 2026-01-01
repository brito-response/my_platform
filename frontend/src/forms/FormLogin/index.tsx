"use client";

import { startTransition } from "react";
import { signIn, signOut } from "next-auth/react";
import { useId, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { SubButton } from "@/components/Shared/Buttons/SubButton";
import Link from "next/link";

type TypeLoginData = {
  email: string;
  password: string;
};

export const FormLogin: React.FC = () => {
  const pathname = usePathname();
  const hiddenPaths = ["/manager", "/portifolios", "/messages", "/projects", "/proposals", "/jobs","/users"];

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const idEmail = useId();
  const idPassword = useId();

  const { register, handleSubmit, formState: { errors } } = useForm<TypeLoginData>();

  const [state, setState, isPending] = useActionState(
    async (prevState: any, data: TypeLoginData) => {
      try {
        const response = await signIn("credentials", { redirect: false, ...data, callbackUrl: "/manager" });

        if (response?.status === 401) {
          toast.error("Credenciais inválidas");
          return { success: false };
        }

        if (response?.url) {
          window.location.href = response.url;
        }

        return { success: true };
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Erro ao autenticar");
        return { success: false };
      }
    },
    { success: false }
  );

  const onSubmitForm = (data: TypeLoginData) => {
    startTransition(() => {
      setState(data);
    });
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (!mounted) {
    return <div style={{ height: 35 }} />;
  }

  const isHidden = hiddenPaths.some((path) => pathname.startsWith(path));

  if (isHidden) {
    return <SubButton label="Sair" onClick={handleLogout} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="w-full flex flex-col lg:flex-row lg:justify-center items-center lg:items-start gap-3 lg:gap-3">
      {/* Email */}
      <div className="flex flex-col lg:flex-row lg:items-center max-h-[35px] gap-2">
        <label htmlFor={idEmail} className="text-sm font-semibold text-(--text-color)">
          e-mail:
        </label>
        <input id={idEmail} type="text" {...register("email", { required: "Este campo é obrigatório" })} className="min-h-[30px] max-w-[120px] lg:max-w-[120px] text-(--text-color) px-3 border border-gray-300 rounded-full outline-none text-sm bg-(--bg-color) caret-(--text-color) text-center transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full lg:w-auto" />
        {errors.email && (
          <span className="text-red-600 text-sm mt-2">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col lg:flex-row lg:items-center max-h-[35px] gap-2">
        <label htmlFor={idPassword} className="text-sm font-semibold text-(--text-color)">
          password:
        </label>
        <input id={idPassword} type="password"
          {...register("password", { required: "Este campo é obrigatório" })}
          className="min-h-[30px] max-w-[120px] lg:max-w-[120px] text-(--text-color) px-3 border border-gray-300 rounded-full outline-none text-sm bg-(--bg-color) caret-(--text-color) text-center transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full lg:w-auto"
        />
        {errors.password && (
          <span className="text-red-600 text-sm mt-2">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Submit */}
      <div className="mt-2 lg:mt-0">
        <SubButton type="submit" label={isPending ? "Entrando..." : "Entrar"} disabled={isPending} className={`w-full lg:w-auto justify-center ${isPending ? "opacity-70 cursor-not-allowed" : ""}`} />
      </div>

      {/* Forgot password */}
      <div className="h-full flex flex-col justify-center items-center mt-2 lg:mt-0 text-sm">
        <Link href="/forgotpassword" className="text-blue-700 cursor-pointer">
          esqueceu sua senha?
        </Link>
      </div>
    </form>
  );
};
