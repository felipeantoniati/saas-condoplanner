import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <section className="w-full h-full pt-40 flex flex-col gap-4 items-center text-center text-white tracking-wider">
      <img
        src="/condoplanner.svg"
        alt="Logotipo do Condoplanner"
        className="w-24"
      />

      <div className={"space-y-2 mb-4"}>
        <h1 className={cn(
          "text-4xl sm:text-6xl font-semibold transition-all duration-300",
          fontPoppins
        )}>
          condoplanner
        </h1>

        <p className="text-lg sm:text-2xl font-light transition-all duration-300">
          Software de gestão de condomínios
        </p>
      </div>


      <Link href={"/auth/login"} className="h-12 rounded-md px-8 text-lg tracking-wider bg-blue-800 text-white hover:bg-blue-700 hover:shadow-md flex items-center justify-center">
        Faça o Login
      </Link>
    </section>
  );
};