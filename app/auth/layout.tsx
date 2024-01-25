import type { Metadata } from 'next'

export const metadata: Metadata = {
      title: 'Condoplanner - Autenticação de Login',
      description: 'Logins seguros, permitidos apenas para pessoas autenticadas.',
}

export default async function AuthLayout({ children, }: { children: React.ReactNode }) {
      return (
            <main className='h-full px-2 flex flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 to-slate-950'>
                  {children}
            </main>
      );
};
