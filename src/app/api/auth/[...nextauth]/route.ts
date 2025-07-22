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
        console.log('--- Tentativa de Login ---');
        console.log('Credenciais recebidas:', credentials); // Veja o que está chegando do formulário

        if (!credentials?.email || !credentials.password) {
          console.log('Email ou senha não fornecidos.');
          return null;
        }

        const client = await pool.connect();
        try {
          console.log(`Buscando usuário com email: ${credentials.email}`);
          // Procura o usuário no banco de dados pelo email
          const res = await client.query('SELECT * FROM users WHERE email = $1', [credentials.email]);
          const user = res.rows[0];

          // **PONTO DE INVESTIGAÇÃO 1**
          if (!user) {
            console.log('Usuário não encontrado no banco de dados.');
            client.release();
            return null;
          }
          
          console.log('Usuário encontrado:', user);
          console.log('Senha do formulário:', credentials.password);
          console.log('Hash da senha no banco:', user.password); // Veja o hash salvo

          // **PONTO DE INVESTIGAÇÃO 2**
          // Compara a senha do formulário com o hash do banco
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password, // Senha original
            user.password       // Hash que está no banco
          );

          console.log('A senha está correta? (bcrypt.compare):', isPasswordCorrect);

          if (isPasswordCorrect) {
            console.log('✅ LOGIN BEM-SUCEDIDO. Retornando usuário.');
            client.release();
            // Retorna os dados para a sessão
            return { id: user.id, email: user.email, name: user.name };
          } else {
            console.log('❌ SENHA INCORRETA.');
            client.release();
            return null;
          }
          
        } catch (error) {
          console.error('ERRO NO PROCESSO DE AUTORIZAÇÃO:', error);
          client.release();
          return null;
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