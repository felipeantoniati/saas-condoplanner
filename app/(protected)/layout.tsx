import { UserButton } from "@/components/user/UserButton";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
      return (
            <main className="w-full flex justify-between">
                  <nav className="w-80 h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 to-slate-950 text-white flex flex-col items-center p-2">
                        <UserButton />
                  </nav>

                  <section className="w-full h-screen bg-slate-50">
                        {children}
                  </section>
            </main>
      )
}
export default ProtectedLayout;