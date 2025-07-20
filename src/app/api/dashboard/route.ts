import { NextResponse } from 'next/server';
import pool from '../../../lib/database';

export async function GET() {
  try {
    const client = await pool.connect();
    
    // Buscar dados para os KPIs
    const [
      appointmentsResult,
      doctorsResult,
      patientsResult,
      financialResult,
      roomsResult
    ] = await Promise.all([
      // Consultas de hoje
      client.query(`
        SELECT COUNT(*) as total_today,
               COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_today,
               COUNT(CASE WHEN status = 'scheduled' THEN 1 END) as scheduled_today
        FROM appointments 
        WHERE DATE(appointment_date) = CURRENT_DATE
      `),
      
      // Médicos online
      client.query(`
        SELECT COUNT(*) as total_doctors,
               COUNT(CASE WHEN is_online = true THEN 1 END) as online_doctors
        FROM doctors
      `),
      
      // Pacientes
      client.query(`
        SELECT COUNT(*) as total_patients,
               COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as new_patients_month
        FROM patients
      `),
      
      // Métricas financeiras
      client.query(`
        SELECT 
          COALESCE(SUM(total_revenue), 0) as total_revenue_month,
          COALESCE(AVG(average_appointment_value), 0) as avg_appointment_value,
          COUNT(*) as total_appointments_month
        FROM financial_metrics 
        WHERE date >= CURRENT_DATE - INTERVAL '30 days'
      `),
      
      // Salas ocupadas
      client.query(`
        SELECT COUNT(*) as total_rooms,
               COUNT(CASE WHEN is_available = false THEN 1 END) as occupied_rooms
        FROM rooms
      `)
    ]);

    // Buscar próximas consultas
    const upcomingAppointments = await client.query(`
      SELECT 
        a.id,
        a.appointment_date,
        a.status,
        a.room_number,
        d.name as doctor_name,
        d.specialty,
        p.name as patient_name
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      JOIN patients p ON a.patient_id = p.id
      WHERE a.appointment_date >= CURRENT_TIMESTAMP
      AND a.status IN ('scheduled', 'confirmed')
      ORDER BY a.appointment_date ASC
      LIMIT 5
    `);

    // Buscar médicos
    const doctors = await client.query(`
      SELECT id, name, specialty, is_online, phone, email
      FROM doctors
      ORDER BY name
    `);

    client.release();

    // Calcular métricas
    const appointmentsToday = appointmentsResult.rows[0]?.total_today || 0;
    const completedToday = appointmentsResult.rows[0]?.completed_today || 0;
    const scheduledToday = appointmentsResult.rows[0]?.scheduled_today || 0;
    
    const totalDoctors = doctorsResult.rows[0]?.total_doctors || 0;
    const onlineDoctors = doctorsResult.rows[0]?.online_doctors || 0;
    
    const totalPatients = patientsResult.rows[0]?.total_patients || 0;
    const newPatientsMonth = patientsResult.rows[0]?.new_patients_month || 0;
    
    const totalRevenue = financialResult.rows[0]?.total_revenue_month || 0;
    const avgAppointmentValue = financialResult.rows[0]?.avg_appointment_value || 0;
    
    const totalRooms = roomsResult.rows[0]?.total_rooms || 0;
    const occupiedRooms = roomsResult.rows[0]?.occupied_rooms || 0;
    const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

    return NextResponse.json({
      success: true,
      data: {
        // KPIs Principais
        kpis: {
          appointmentsToday,
          completedToday,
          scheduledToday,
          totalDoctors,
          onlineDoctors,
          totalPatients,
          newPatientsMonth,
          totalRevenue,
          avgAppointmentValue,
          totalRooms,
          occupiedRooms,
          occupancyRate
        },
        
        // Próximas consultas
        upcomingAppointments: upcomingAppointments.rows,
        
        // Médicos
        doctors: doctors.rows,
        
        // Status do sistema
        systemStatus: {
          database: 'online',
          lastUpdate: new Date().toISOString(),
          uptime: '99.9%'
        }
      }
    });

  } catch (error) {
    console.error('❌ Erro ao buscar dados do dashboard:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
} 