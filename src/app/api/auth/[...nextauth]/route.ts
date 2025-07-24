// ARQUIVO: src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/database";
import bcrypt from "bcryptjs";

// Exportamos a configuração para melhor organização
 const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      // O nome para usar quando chamar a função signIn()
      name: "credentials",
      // O objeto `credentials` define os campos que esperamos no formulário
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // A lógica de autorização agora vive aqui
      async authorize(credentials) {
        // Log para ver se esta função está sendo chamada
        console.log("🕵️‍♂️ -> Dentro da função 'authorize' agora!");

        // Validação básica: se não houver email ou senha, falha.
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios");
        }

        const client = await pool.connect();
        try {
          // Busca o usuário no banco de dados
          // Nós selecionamos as colunas explicitamente e renomeamos password_hash para password
const res = await client.query(
  'SELECT id, name, email, password_hash AS password FROM users WHERE email = $1',
  [credentials.email]
);
          const user = res.rows[0];
          
          client.release();

          // Se não encontrou o usuário, falha.
          if (!user) {
            console.log("Usuário não encontrado.");
            throw new Error("Credenciais inválidas");
          }

          // Compara a senha digitada com o hash salvo no banco
          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          // Se as senhas não baterem, falha.
          if (!passwordsMatch) {
            console.log("Senha incorreta.");
            throw new Error("Credenciais inválidas");
          }

          console.log("✅ LOGIN BEM-SUCEDIDO! Retornando o usuário.");
          // Se tudo deu certo, retorna o objeto do usuário.
          // O NextAuth usará isso para criar a sessão/token.
          return user;
        } catch (error) {
          console.error("Erro no 'authorize':", error);
          // Libera o cliente em caso de erro também
          client.release();
          // Lança o erro para o NextAuth tratar
          throw new Error("Erro interno do servidor");
        }
      },
    }),
  ],
  // Define a página de login customizada
  pages: {
    signIn: "/login",
  },
  // Estratégia de sessão
  session: {
    strategy: "jwt",
  },
  // Segredo para assinar os tokens
  secret: process.env.NEXTAUTH_SECRET,
  // Debug mode para ambiente de desenvolvimento te dará mais logs
  debug: false, // process.env.NODE_ENV === "development",
};

// Cria o handler do NextAuth com a configuração exportada
const handler = NextAuth(authOptions);

// Exporta o handler para os métodos GET e POST
export { handler as GET, handler as POST };