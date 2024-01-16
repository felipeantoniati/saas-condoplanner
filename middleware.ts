import NextAuth from "next-auth";
import authConfig from "@/auth.config";

// Inicialização do módulo NextAuth com as configurações fornecidas.
const { auth } = NextAuth(authConfig);

import {
      DEFAULT_LOGIN_REDIRECT,
      apiAuthPrefix,
      authRoutes,
      publicRoutes,
} from "@/routes";

/**
 * Middleware de autenticação e redirecionamento de rotas.
 *
 * @param {Object} request - Objeto que representa a requisição.
 * @returns {Response|null} - Objeto de resposta ou null se nenhum redirecionamento for necessário.
 */
export default auth((request) => {
      const { nextUrl } = request;
      const isLoggedIn = !!request.auth;

      // Verifica se a rota pertence aos endpoints da API de autenticação.
      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

      // Verifica se a rota é pública.
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

      // Verifica se a rota requer autenticação.
      const isAuthRoute = authRoutes.includes(nextUrl.pathname);

      // Se for uma rota de API de autenticação, não é necessário redirecionamento.
      if (isApiAuthRoute) {
            return null;
      }

      // Se for uma rota que requer autenticação e o usuário estiver logado, redireciona para a página padrão após o login.
      if (isAuthRoute) {
            if (isLoggedIn) {
                  return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
            }

            return null;
      }

      // Se o usuário não estiver logado e a rota não for pública, redireciona para a página de login.
      if (!isLoggedIn && !isPublicRoute) {
            return Response.redirect(new URL("/auth/login", nextUrl));
      }

      // Se nenhum redirecionamento for necessário, retorna null.
      return null;
});

/**
 * Configuração do matcher de rotas para o NextAuth.
 *
 * @type {Object}
 */
export const config = {
      matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};
