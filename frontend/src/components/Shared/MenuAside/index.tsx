"use client";

import { AlignJustifyIcon, BriefcaseBusinessIcon, HouseIcon, MessageCircleIcon, SettingsIcon, UserIcon, WalletIcon } from "lucide-react";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { useMenu } from "@/contexts/manager_context";

type NavItem = { icon: ReactElement; title: string; url: string; };

export const MenuAside: React.FC = () => {
  const { menuActive, setMenuActive } = useMenu();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navItems: NavItem[] = [
    { icon: <HouseIcon size={24} />, title: "Manager", url: "/manager" },
    { icon: <WalletIcon size={24} />, title: "Creditos", url: "/wallets" },
    { icon: <BriefcaseBusinessIcon size={24} />, title: "Criar Trabalho", url: "/jobs/new" },
    { icon: <MessageCircleIcon size={24} />, title: "Mensagens", url: "/messages" },
    { icon: <UserIcon size={24} />, title: "Portifolio", url: "/portifolios" },
    { icon: <SettingsIcon size={24} />, title: "Setting", url: "/settings" },
  ];

  return (
    <aside className={`${menuActive ? "w-20" : "w-72"} h-full bg-(--brand-400) text-white flex flex-col transition-all duration-100 overflow-hidden relative z-10`}>
      {/* Botão toggle */}
      <button type="button" onClick={() => setMenuActive(!menuActive)} className="w-14 h-14 flex justify-center items-center text-white hover:bg-(--brand-500) transition-colors duration-300 ml-3 mt-3 rounded-lg">
        <AlignJustifyIcon size={28} />
      </button>

      {/* Navegação */}
      <ul className="flex flex-col mt-4 gap-2 flex-1">
        {navItems.map((item: NavItem, index) => (
          <li key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className={`relative rounded-l-3xl transition-all duration-300 ${hoveredIndex === index ? "bg-white/80" : ""}`}>
            <Link href={item.url} className={`flex items-center text-white py-3 transition-colors duration-200 ${hoveredIndex === index ? "text-blue-300" : "text-white"}`}>
              <span className="flex justify-center items-center min-w-[60px] h-[60px]">
                {item.icon}
              </span>
              <span className={`whitespace-nowrap text-base font-medium transition-opacity duration-300 ${menuActive ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
