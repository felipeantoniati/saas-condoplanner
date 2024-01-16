import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
      return (
            <main className="h-full flex flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
                  <CardWrapper
                        headerLabel="Faça o login com se E-mail e Senha"
                        backButtonLabel="Não tem um conta?"
                        backButtonHref="/auth/register"
                  // showSocial
                  >
                        <LoginForm />
                  </CardWrapper>
            </main>

      );
};

export default LoginPage;