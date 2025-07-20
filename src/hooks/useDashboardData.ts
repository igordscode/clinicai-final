import { useState, useEffect } from 'react';

interface DashboardData {
  kpis: {
    appointmentsToday: number;
    completedToday: number;
    scheduledToday: number;
    totalDoctors: number;
    onlineDoctors: number;
    totalPatients: number;
    newPatientsMonth: number;
    totalRevenue: number;
    avgAppointmentValue: number;
    totalRooms: number;
    occupiedRooms: number;
    occupancyRate: number;
  };
  upcomingAppointments: Array<{
    id: string;
    appointment_date: string;
    status: string;
    room_number: string;
    doctor_name: string;
    specialty: string;
    patient_name: string;
  }>;
  doctors: Array<{
    id: string;
    name: string;
    specialty: string;
    is_online: boolean;
    phone: string;
    email: string;
  }>;
  systemStatus: {
    database: string;
    lastUpdate: string;
    uptime: string;
  };
}

interface UseDashboardDataReturn {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDashboardData(): UseDashboardDataReturn {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/dashboard');
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Erro ao buscar dados');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
      console.error('Erro ao buscar dados do dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Atualizar dados a cada 30 segundos
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
} 