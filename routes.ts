/**
 * Rotas públicas acessíveis sem autenticação.
 * @type {string[]}
 */
export const publicRoutes = [
      "/",
      "/auth/new-verification"
];

/**
 * Rotas que requerem autenticação para acesso.
 * @type {string[]}
 */
export const authRoutes = [
      "/auth/login",
      "/auth/register",
      "/auth/reset",
];

/**
 * Prefixo para os endpoints da API relacionados à autenticação.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Caminho padrão de redirecionamento após um login bem-sucedido.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
