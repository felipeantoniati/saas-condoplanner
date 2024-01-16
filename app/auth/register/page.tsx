import { CardWrapper } from "@/components/auth/card-wrapper";
import { RegisterForm } from "@/components/auth/register-form";

const RegisterPage = () => {
      return (
            <main className="h-full flex flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">

                  <CardWrapper
                        headerLabel="Crie sua conta"
                        backButtonLabel="Já possui uma conta ?"
                        backButtonHref="/auth/login"
                        // showSocial
                  >
                        <RegisterForm />
                  </CardWrapper>
            </main>

      );
};

export default RegisterPage;  