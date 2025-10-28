// app/layout.tsx
// This is the root layout for the entire application.
// It sets up the HTML structure, includes global styles, and fonts.
import './globals.css'; // Assuming you'll have a global stylesheet
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Portal de Criativos',
  description: 'Sua plataforma completa para criação com IA.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
