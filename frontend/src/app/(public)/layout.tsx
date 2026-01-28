import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeInitializer } from "@/components/Shared/Functions";
import { MainLayout } from "@/components/Shared/Layouts/Main";
import { Header } from "@/components/Shared/Header";
import { ToastContainer } from "react-toastify";
import { Footer } from "@/components/Shared/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
export const metadata: Metadata = { title: "Rei dos Freelas", description: "Uma plataforma especializada em desenvolvimento de projetos para freelancers" };

interface RootLayoutProps { children: React.ReactNode; cookies?: string; }

function getThemeFromCookie(cookie?: string): 'light' | 'dark' {
  if (!cookie) return 'light';
  const match = cookie.match(/theme=(dark|light)/);
  return match ? (match[1] as 'light' | 'dark') : 'light';
}

export default async function RootLayout({ children, cookies }: RootLayoutProps) {
  const theme = getThemeFromCookie(cookies);

  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased ${theme === 'dark' ? 'dark' : ''}`} data-testid="root-layout">
        <ThemeInitializer />
        <MainLayout>
          <Header />
          <ToastContainer />
          {children}
          <Footer />
        </MainLayout>
      </body>
    </html>
  );
};
