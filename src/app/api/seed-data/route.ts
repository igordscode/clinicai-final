import { NextResponse } from 'next/server';
import pool from '../../../lib/database';

export async function POST() {
  try {
    const client = await pool.connect();

    // Inserir pacientes de exemplo
    const patients = await client.query(`
      INSERT INTO patients (name, email, phone, date_of_birth, gender, address) VALUES
      ('María López', 'maria.lopez@email.com', '0984 123456', '1985-03-15', 'F', 'Rua das Flores, 123'),
      ('Carlos Mendoza', 'carlos.mendoza@email.com', '0971 654321', '1978-07-22', 'M', 'Av. Principal, 456'),
      ('Ana Torres', 'ana.torres@email.com', '0992 112233', '1990-11-08', 'F', 'Rua do Comércio, 789'),
      ('Luis Pérez', 'luis.perez@email.com', '0983 624439', '1982-05-12', 'M', 'Rua das Palmeiras, 321'),
      ('Elena Vargas', 'elena.vargas@email.com', '0975 987654', '1988-09-30', 'F', 'Av. Central, 654')
      ON CONFLICT (email) DO NOTHING
      RETURNING id, name
    `);

    // Buscar médicos existentes
    const doctors = await client.query('SELECT id, name FROM doctors');

    // Inserir consultas de exemplo para hoje
    const today = new Date();
    const appointments = [];
    
    // Criar consultas para hoje
    for (let i = 0; i < 6; i++) {
      const hour = 9 + i; // 9h, 10h, 11h, 14h, 15h, 16h
      const appointmentDate = new Date(today);
      appointmentDate.setHours(hour, 0, 0, 0);
      
      const doctorIndex = i % doctors.rows.length;
      const patientIndex = i % patients.rows.length;
      
      appointments.push({
        doctor_id: doctors.rows[doctorIndex]?.id,
        patient_id: patients.rows[patientIndex]?.id,
        appointment_date: appointmentDate,
        status: i < 3 ? 'scheduled' : 'confirmed',
        room_number: `Sala ${i + 1}`,
        notes: `Consulta ${i + 1} do dia`
      });
    }

    // Inserir consultas
    for (const appointment of appointments) {
      if (appointment.doctor_id && appointment.patient_id) {
        await client.query(`
          INSERT INTO appointments (doctor_id, patient_id, appointment_date, status, room_number, notes)
          VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT DO NOTHING
        `, [
          appointment.doctor_id,
          appointment.patient_id,
          appointment.appointment_date,
          appointment.status,
          appointment.room_number,
          appointment.notes
        ]);
      }
    }

    // Inserir métricas financeiras de exemplo
    await client.query(`
      INSERT INTO financial_metrics (date, total_revenue, total_appointments, completed_appointments, average_appointment_value)
      VALUES 
        (CURRENT_DATE, 2400000, 6, 4, 400000),
        (CURRENT_DATE - INTERVAL '1 day', 1800000, 5, 3, 360000),
        (CURRENT_DATE - INTERVAL '2 days', 3000000, 8, 6, 375000)
      ON CONFLICT (date) DO UPDATE SET
        total_revenue = EXCLUDED.total_revenue,
        total_appointments = EXCLUDED.total_appointments,
        completed_appointments = EXCLUDED.completed_appointments,
        average_appointment_value = EXCLUDED.average_appointment_value
    `);

    // Atualizar status online dos médicos
    await client.query(`
      UPDATE doctors 
      SET is_online = CASE 
        WHEN name IN ('Dr. García', 'Dra. Silva', 'Dr. López', 'Dra. Rodríguez') THEN true
        ELSE false
      END
    `);

    // Atualizar ocupação das salas
    await client.query(`
      UPDATE rooms 
      SET is_available = CASE 
        WHEN room_number IN ('Sala 1', 'Sala 2', 'Sala 3') THEN false
        ELSE true
      END
    `);

    client.release();

    return NextResponse.json({
      success: true,
      message: '✅ Dados de exemplo inseridos com sucesso!',
      data: {
        patientsInserted: patients.rows.length,
        appointmentsCreated: appointments.length,
        doctorsOnline: 4,
        roomsOccupied: 3
      }
    });

  } catch (error) {
    console.error('❌ Erro ao inserir dados de exemplo:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao inserir dados de exemplo',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
} 