import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendVerificationEmail = async (email: string, token: string,) => {
      const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

      await resend.emails.send({
            from: "Condoplanner <onboarding@resend.dev>",
            to: email,
            subject: "Confirmação de Email",
            html: `
            <p>Clique <a href="${confirmLink}">aqui</a> para confirmar o email.</p>
            `
      });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string,) => {
      await resend.emails.send({
            from: "Condoplanner <onboarding@resend.dev>",
            to: email,
            subject: "Código para autenticação de login",
            html: `
            <p>Seu código de autenticação: ${token}</p>
            `
      });
};

export const sendResetPasswordEmail = async (email: string, token: string,) => {
      const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

      await resend.emails.send({
            from: "Condoplanner <onboarding@resend.dev>",
            to: email,
            subject: "Recuperação de senha",
            html: `
            <p>Clique <a href="${resetLink}">aqui</a> para definir uma nova senha</p>
            `
      });
};