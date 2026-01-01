"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "../Logo";
import { Menu, X } from "lucide-react";
import { NavBar } from "../Navbar";
import { ToggleButtonTheme } from "../Buttons/ToggleButtonTheme";
import { FormLogin } from "@/forms";

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <header className="w-full px-5 py-1.5 bg-(--bg-header-color) text-(--text-color) shadow-[rgba(0,0,0,0.25)_0px_54px_55px,rgba(0,0,0,0.12)_0px_-12px_30px,rgba(0,0,0,0.12)_0px_4px_6px,rgba(0,0,0,0.17)_0px_12px_13px,rgba(0,0,0,0.09)_0px_-3px_5px] relative z-40">
      <div className="flex items-center justify-between lg:py-2">
        {/* Logo */}
        <div className="flex items-center px-[5%] mr-auto">
          <Logo />
        </div>

        <div className="flex items-center justify-between gap-5">
          {/* Menu Desktop */}
          <nav className="hidden lg:block">
            <NavBar onLinkClick={() => setOpen(false)} />
          </nav>

          {/* Área Desktop: tema + login */}
          <div className="hidden lg:flex items-center gap-3">
            <ToggleButtonTheme />
            <FormLogin />
          </div>

          {/* Botão Mobile */}
          {isMobile && (
            <button className="inline-flex items-center justify-center p-1.5 rounded-lg bg-transparent border-none cursor-pointer"
              onClick={() => setOpen((s) => !s)} aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {/* Backdrop Mobile */}
      {open && isMobile && (
        <div className="fixed inset-0 bg-black/35 z-49" onClick={() => setOpen(false)}/>
      )}

      {/* Painel Mobile */}
      {isMobile && (
        <aside className={`fixed top-0 right-0 h-screen w-[85%] max-w-[360px] bg-(--bg-color) shadow-[-8px_0_30px_rgba(0,0,0,0.15)] z-50 overflow-y-auto transition-all duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
          role="dialog" aria-hidden={!open} ref={panelRef}>
          <div className="flex flex-col gap-5 p-5 min-h-screen">
            <NavBar isMobile onLinkClick={() => setOpen(false)} />
            <div className="mt-[10%] flex flex-col justify-center items-center">
              <ToggleButtonTheme />
              <FormLogin />
            </div>
          </div>
        </aside>
      )}
    </header>
  );
};
