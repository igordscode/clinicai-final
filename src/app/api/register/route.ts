// ARQUIVO FINAL E CORRIGIDO: src/app/api/register/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; // Importamos o Prisma Client
import bcrypt from 'bcryptjs';

// Criamos uma instância do Prisma Client que usaremos para todas as operações
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validação básica dos dados de entrada
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    // 1. Verificar se o usuário já existe usando o Prisma
    const existingUser = await prisma.user.findUnique({
      where: { email }, // Procura um usuário onde o email seja igual ao fornecido
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Este email já está cadastrado.' }, { status: 409 });
    }

    // 2. Criar o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Criar o novo usuário usando o Prisma
    // O Prisma cuidará de gerar o 'id' automaticamente, como definido no schema.prisma
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password_hash: hashedPassword, // Garanta que 'password_hash' é o nome da coluna no seu schema
      },
    });

    // Retorna uma resposta de sucesso
    return NextResponse.json({ message: 'Usuário criado com sucesso!', user: newUser }, { status: 201 });

  } catch (error) {
    // Log detalhado do erro no console do servidor para depuração
    console.error('Erro na API de registro:', error);
    // Retorna uma resposta de erro genérica para o cliente
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}