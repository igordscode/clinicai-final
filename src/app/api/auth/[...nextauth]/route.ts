// Arquivo: src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import pool from '@/lib/database'; // Importa sua conexão com o banco
import bcrypt from 'bcryptjs'; // Precisaremos do bcrypt para senhas

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Este é o provedor para login com email e senha
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      // Esta é a lógica que será executada quando alguém tentar fazer login
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const client = await pool.connect();
        try {
          // Procura o usuário no banco de dados pelo email
          const res = await client.query('SELECT * FROM users WHERE email = $1', [credentials.email]);
          const user = res.rows[0];

          if (user) {
            // Compara a senha digitada com a senha hashada no banco
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
            
            if (isPasswordCorrect) {
              // Se tudo estiver correto, retorna os dados do usuário para a sessão
              return { id: user.id, email: user.email, name: user.name };
            }
          }
          return null; // Retorna null se o usuário não for encontrado ou a senha estiver errada
        } finally {
          client.release();
        }
      }
    })
  ],
  pages: {
    signIn: '/login', // Diz ao NextAuth que sua página de login customizada está em /login
  },
  session: {
    strategy: 'jwt', // Usa JSON Web Tokens para gerenciar a sessão
  },
  secret: process.env.NEXTAUTH_SECRET, // Lê o segredo da sua variável de ambiente
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Sempre redireciona para a página inicial após login
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };