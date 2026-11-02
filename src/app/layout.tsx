import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ELIZES IA | Atendimento inteligente",
  description: "Central inteligente de atendimento, agendamento e relacionamento da ELIZES Tecnologia."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
