import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/tw-merge";
import { LoginButton } from "@/components/auth/LoginButton";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

export default function Home() {
  return (
    <main className='h-full flex flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800'>
      <section className="max-w-screen-sm flex flex-col justify-center items-center gap-3">
        <div className="flex flex-col items-center gap-2">
          <img
            className="w-28"
            alt="Logotipo do Condoplanner"
            src="/condoplanner.svg"
          />
          <h1 className={
            cn(
              "text-6xl font-semibold text-white text-center drop-shadow-md",
              font.className,
            )
          }>
            condoplanner
          </h1>
        </div>
        <p className="ml-2 text-2xl text-white text-center">
          Software de gestão de condomínios
        </p>
      </section>

      <LoginButton>
        <Button size={"lg"} variant={"default"}>
          Faça o Login
        </Button>
      </LoginButton>
    </main >
  )
}

