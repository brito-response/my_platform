import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = { title: '404 — Página Não Encontrada', description: 'A página que você tentou acessar não existe.' };

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body className=" w-full h-screen bg-gray-100 flex items-center justify-center ">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-600">404</h1>
          <p className="mt-4 text-lg text-gray-700">
            Ops! A página que você procura não existe.
          </p>
          <a href="/" className="mt-6 inline-block bg-blue-600 px-6 py-3 text-white rounded hover:bg-blue-700">Voltar para a Home</a>
        </div>
      </body>
    </html>
  );
}
