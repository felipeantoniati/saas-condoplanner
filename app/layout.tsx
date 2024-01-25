import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Condoplanner - Sistema de gestão de condomínios',
  description: 'Tecnologia que traz inovação e eficiência para administração de condomínios.',
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="pt-BR">
        <body className={cn(
          "h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 to-slate-950",
          inter.className
        )}>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
};