import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // 1. Criar usuários (profissionais)
  console.log('👥 Criando usuários...');
  const user1 = await prisma.user.create({
    data: {
      name: "Dr. João Silva",
      email: "joao@clinicai.com",
      password_hash: "senha_hash_fake_123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Dra. Maria Santos",
      email: "maria@clinicai.com", 
      password_hash: "senha_hash_fake_456",
    },
  });

  console.log(`✅ ${2} usuários criados`);

  // 2. Criar pacientes
  console.log('🏥 Criando pacientes...');
  const patient1 = await prisma.patient.create({
    data: {
      full_name: "Ana Costa",
      phone: "11999999999",
      email: "ana@paciente.com",
      source: "Instagram",
      status: "Ativo",
      tags: ["VIP", "Retorno"],
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      full_name: "Carlos Oliveira", 
      phone: "11888888888",
      email: "carlos@paciente.com",
      source: "Google Ads",
      status: "Lead",
      tags: ["Novo"],
    },
  });

  const patient3 = await prisma.patient.create({
    data: {
      full_name: "Beatriz Lima",
      phone: "11777777777", 
      email: "beatriz@paciente.com",
      source: "Indicação",
      status: "Ativo",
      tags: ["Fidelizado"],
    },
  });

  console.log(`✅ ${3} pacientes criados`);

  // 3. Criar agendamentos
  console.log('📅 Criando agendamentos...');
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  await prisma.appointment.create({
    data: {
      patient_id: patient1.id,
      professional_id: user1.id,
      procedure_name: "Limpeza Dentária",
      start_time: new Date(today.setHours(9, 0, 0, 0)),
      end_time: new Date(today.setHours(10, 0, 0, 0)),
      status: "Confirmado",
      notes: "Paciente com sensibilidade",
    },
  });

  await prisma.appointment.create({
    data: {
      patient_id: patient2.id,
      professional_id: user2.id,
      procedure_name: "Consulta Inicial",
      start_time: new Date(tomorrow.setHours(14, 0, 0, 0)),
      end_time: new Date(tomorrow.setHours(15, 0, 0, 0)),
      status: "Agendado",
      notes: "Primeira consulta",
    },
  });

  console.log(`✅ ${2} agendamentos criados`);

  // 4. Criar tratamentos
  console.log('🦷 Criando tratamentos...');
  await prisma.treatment.create({
    data: {
      patient_id: patient1.id,
      professional_id: user1.id,
      treatment_name: "Ortodontia",
      description: "Aparelho fixo metálico",
      total_sessions: 24,
      completed_sessions: 8,
      price: 2500.00,
      status: "Ativo",
      start_date: new Date('2024-01-15'),
    },
  });

  await prisma.treatment.create({
    data: {
      patient_id: patient3.id,
      professional_id: user2.id,
      treatment_name: "Clareamento",
      description: "Clareamento a laser",
      total_sessions: 3,
      completed_sessions: 3,
      price: 800.00,
      status: "Concluído",
      start_date: new Date('2024-06-01'),
      end_date: new Date('2024-06-15'),
    },
  });

  console.log(`✅ ${2} tratamentos criados`);

  // 5. Criar transações financeiras
  console.log('💰 Criando transações financeiras...');
  await prisma.financialTransaction.create({
    data: {
      patient_id: patient1.id,
      type: "Receita",
      category: "Consulta",
      description: "Consulta + Limpeza - Ana Costa",
      amount: 150.00,
      payment_method: "PIX",
      status: "Pago",
      due_date: today,
      paid_date: today,
    },
  });

  await prisma.financialTransaction.create({
    data: {
      patient_id: patient2.id,
      type: "Receita", 
      category: "Tratamento",
      description: "Entrada Ortodontia - Ana Costa",
      amount: 500.00,
      payment_method: "Cartão",
      status: "Pago",
      due_date: new Date('2024-01-15'),
      paid_date: new Date('2024-01-15'),
    },
  });

  await prisma.financialTransaction.create({
    data: {
      type: "Despesa",
      category: "Material",
      description: "Compra de materiais odontológicos",
      amount: 320.00,
      payment_method: "Transferência",
      status: "Pago",
      due_date: new Date('2024-07-01'),
      paid_date: new Date('2024-07-01'),
    },
  });

  console.log(`✅ ${3} transações financeiras criadas`);

  // 6. Criar campanhas
  console.log('📢 Criando campanhas...');
  await prisma.campaign.create({
    data: {
      name: "Campanha Clareamento Verão",
      type: "Instagram",
      status: "Ativa",
      budget: 1000.00,
      spent_amount: 650.00,
      impressions: 15000,
      clicks: 450,
      conversions: 12,
      start_date: new Date('2024-07-01'),
      end_date: new Date('2024-07-31'),
    },
  });

  await prisma.campaign.create({
    data: {
      name: "Google Ads - Ortodontia",
      type: "Google Ads",
      status: "Finalizada",
      budget: 800.00,
      spent_amount: 800.00,
      impressions: 8000,
      clicks: 200,
      conversions: 8,
      start_date: new Date('2024-06-01'),
      end_date: new Date('2024-06-30'),
    },
  });

  console.log(`✅ ${2} campanhas criadas`);

  // 7. Criar histórico de chat
  console.log('💬 Criando histórico de chat...');
  await prisma.chatHistory.create({
    data: {
      patient_id: patient1.id,
      message: "Olá! Gostaria de agendar uma consulta.",
      sender_type: "Patient",
      sender_name: "Ana Costa",
      message_type: "Text",
    },
  });

  await prisma.chatHistory.create({
    data: {
      patient_id: patient1.id,
      message: "Olá Ana! Claro, que dia seria melhor para você?",
      sender_type: "Bot",
      sender_name: "ClinicAI Bot",
      message_type: "Text",
    },
  });

  await prisma.chatHistory.create({
    data: {
      patient_id: patient1.id,
      message: "Transferindo para atendimento humano...",
      sender_type: "Human",
      sender_name: "Recepcionista",
      message_type: "Text",
    },
  });

  console.log(`✅ ${3} mensagens de chat criadas`);

  // 8. Criar feedback NPS
  console.log('⭐ Criando feedback NPS...');
  await prisma.npsFeedback.create({
    data: {
      patient_id: patient1.id,
      score: 9,
      category: "Promotor",
      comment: "Excelente atendimento! Dr. João é muito atencioso.",
      service_date: new Date('2024-07-15'),
    },
  });

  await prisma.npsFeedback.create({
    data: {
      patient_id: patient3.id,
      score: 10,
      category: "Promotor", 
      comment: "Adorei o resultado do clareamento! Super recomendo!",
      service_date: new Date('2024-06-15'),
    },
  });

  await prisma.npsFeedback.create({
    data: {
      patient_id: patient2.id,
      score: 7,
      category: "Neutro",
      comment: "Bom atendimento, mas a espera foi um pouco longa.",
      service_date: new Date('2024-07-10'),
    },
  });

  console.log(`✅ ${3} feedbacks NPS criados`);

  // 9. Criar KPIs diários
  console.log('📊 Criando KPIs diários...');
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  await prisma.dailyKpi.create({
    data: {
      date: yesterday,
      appointments_total: 8,
      appointments_completed: 6,
      appointments_cancelled: 1,
      revenue_total: 1200.00,
      revenue_received: 950.00,
      new_patients: 2,
      nps_average: 8.5,
      conversion_rate: 0.25,
    },
  });

  await prisma.dailyKpi.create({
    data: {
      date: today,
      appointments_total: 6,
      appointments_completed: 4,
      appointments_cancelled: 0,
      revenue_total: 800.00,
      revenue_received: 650.00,
      new_patients: 1,
      nps_average: 9.0,
      conversion_rate: 0.30,
    },
  });

  console.log(`✅ ${2} KPIs diários criados`);

  console.log('🎉 Seed concluído com sucesso!');
  console.log('📋 Dados criados:');
  console.log('   - 2 usuários');
  console.log('   - 3 pacientes');
  console.log('   - 2 agendamentos');
  console.log('   - 2 tratamentos');
  console.log('   - 3 transações financeiras');
  console.log('   - 2 campanhas');
  console.log('   - 3 mensagens de chat');
  console.log('   - 3 feedbacks NPS');
  console.log('   - 2 KPIs diários');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });