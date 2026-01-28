"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type MenuContextType = {
  menuActive: boolean;
  setMenuActive: (value: boolean) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuActive, setMenuActive] = useState(true);
  return (
    <MenuContext.Provider value={{ menuActive, setMenuActive }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within MenuProvider");
  return context;
};