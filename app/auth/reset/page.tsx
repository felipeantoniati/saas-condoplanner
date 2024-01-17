import { CardWrapper } from "@/components/auth/card-wrapper";
import { ResetForm } from "@/components/auth/reset-form";

const ResetPage = () => {
      return (
            <main className="h-full flex flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">

                  <CardWrapper
                        headerLabel="Esqueceu Sua senha ?"
                        backButtonLabel="Voltar ao Login"
                        backButtonHref="/auth/login"
                  >
                        <ResetForm />
                  </CardWrapper>
            </main>
      )
}

export default ResetPage;