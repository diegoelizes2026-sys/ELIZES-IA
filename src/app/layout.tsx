import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ELIZES IA | Atendimento inteligente para empresas",
  description: "Atendimento inteligente, agendamentos, relacionamento e gestão de conversas em uma plataforma da ELIZES Tecnologia."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
