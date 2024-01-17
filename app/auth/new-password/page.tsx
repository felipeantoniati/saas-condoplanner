import { CardWrapper } from "@/components/auth/card-wrapper";
import { NewPasswordForm } from "@/components/auth/new-password-form";

const NewPasswordPage = () => {
      return (
            <main className="h-full flex flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
                  <CardWrapper
                        headerLabel="Escolha uma nova senha"
                        backButtonLabel="Voltar ao Login"
                        backButtonHref="/auth/login"
                  >
                        <NewPasswordForm />
                  </CardWrapper>
            </main>
      );
};

export default NewPasswordPage;