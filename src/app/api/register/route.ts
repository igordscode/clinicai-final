// ARQUIVO: src/app/api/register/route.ts

import { NextResponse } from 'next/server';
import pool from '@/lib/database';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
const { name, email, password } = await request.json();

    // Validação básica
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    // Verificar se o usuário já existe
    const client = await pool.connect();
    try {
      const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        return NextResponse.json({ error: 'Este email já está cadastrado.' }, { status: 409 }); // 409 Conflict
      }

      // CRUCIAL: Criar o hash da senha antes de salvar
      const hashedPassword = await bcrypt.hash(password, 10);

      // Inserir o novo usuário no banco de dados
      await client.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
        [name, email, hashedPassword]
      );

      return NextResponse.json({ message: 'Usuário criado com sucesso!' }, { status: 201 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erro na API de registro:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}