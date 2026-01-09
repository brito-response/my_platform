"use client";

import { useSearchParams } from "next/navigation";
import { type ReactNode } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

type LayoutCaptureErrorProps = { children: ReactNode; };

export const LayoutCaptureError: React.FC<LayoutCaptureErrorProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      switch (error) {
        case "not_has_token":
          toast.error("Você não deveria nem estar aqui bixo, está sem token de acesso.");
          break;
        case "invalid_token":
          toast.error("Token inválido é de 1500 A.C");
          break;
        case "invalid_role":
          toast.error("Você não é ADMIN major, não pode acessar isso aí não.");
          break;
        default:
          toast.error("Ocorreu um erro desconhecido.");
      }
    }
  }, [error]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {children}
    </div>
  );
};
