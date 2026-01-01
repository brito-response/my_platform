"use client";

import clsx from "clsx";
import styles from "./ml.module.css";
import { type ReactNode } from "react";
import { useMenu } from "../../../../contexts/manager_context";

type ManagerLayoutProps = {
  /** [0] header   [1] toast,
   *  [2] sidebar, [3] conteúdo,
   *  [4] footer
  **/
  children: [ReactNode, ReactNode, ReactNode, ReactNode, ReactNode];
};

export const ManagerLayout: React.FC<ManagerLayoutProps> = ({ children }) => {
  const [header, toastify, sidebar, content, footer] = children;
  const { menuActive } = useMenu();

  return (
    <div className={clsx(styles.layout)} style={{ ["--aside-width" as any]: menuActive ? "80px" : "220px" }}>
      <header className={clsx(styles.header)}>{header}</header>
      <div className={clsx(styles.toastify)}>{toastify}</div>

      <aside className={clsx(styles.side)}>{sidebar}</aside>
      <main className={clsx(styles.content)}>{content}</main>
      <footer className={clsx(styles.footer)}>{footer}</footer>
    </div>
  );
};
