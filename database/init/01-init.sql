-- ClinicAI Database Initialization Script
-- Este script cria as tabelas básicas para o sistema ClinicAI

-- Habilitar extensões úteis
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabela de usuários/usuários do sistema
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de médicos
CREATE TABLE IF NOT EXISTS doctors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255),
    license_number VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    email VARCHAR(255),
    is_online BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pacientes
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10),
    address TEXT,
    emergency_contact VARCHAR(255),
    emergency_phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de consultas/agendamentos
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, confirmed, in_progress, completed, cancelled
    notes TEXT,
    room_number VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de salas de consulta
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_number VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255),
    capacity INTEGER DEFAULT 1,
    is_available BOOLEAN DEFAULT true,
    equipment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de métricas financeiras
CREATE TABLE IF NOT EXISTS financial_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    total_revenue DECIMAL(10,2) DEFAULT 0,
    total_appointments INTEGER DEFAULT 0,
    completed_appointments INTEGER DEFAULT 0,
    cancelled_appointments INTEGER DEFAULT 0,
    average_appointment_value DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de configurações do sistema
CREATE TABLE IF NOT EXISTS system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inserir configurações padrão
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('clinic_name', 'ClinicAI', 'Nome da clínica'),
('clinic_address', 'Rua das Clínicas, 123', 'Endereço da clínica'),
('clinic_phone', '(11) 99999-9999', 'Telefone da clínica'),
('clinic_email', 'contato@clinicai.com', 'Email da clínica'),
('business_hours_start', '08:00', 'Horário de início do expediente'),
('business_hours_end', '18:00', 'Horário de fim do expediente'),
('appointment_duration', '30', 'Duração padrão das consultas em minutos'),
('max_appointments_per_day', '50', 'Máximo de consultas por dia'),
('currency', 'BRL', 'Moeda utilizada'),
('timezone', 'America/Sao_Paulo', 'Fuso horário da clínica')
ON CONFLICT (setting_key) DO NOTHING;

-- Inserir dados de exemplo
INSERT INTO users (name, email, password_hash, role) VALUES
('Admin', 'admin@clinicai.com', crypt('admin123', gen_salt('bf')), 'admin'),
('Camila Silva', 'camila@clinicai.com', crypt('camila123', gen_salt('bf')), 'user')
ON CONFLICT (email) DO NOTHING;

-- Inserir médicos de exemplo
INSERT INTO doctors (user_id, name, specialty, license_number, phone, email) VALUES
((SELECT id FROM users WHERE email = 'camila@clinicai.com'), 'Dr. García', 'Clínico Geral', 'CRM12345', '(11) 99999-1111', 'garcia@clinicai.com'),
((SELECT id FROM users WHERE email = 'camila@clinicai.com'), 'Dra. Silva', 'Cardiologia', 'CRM12346', '(11) 99999-2222', 'silva@clinicai.com'),
((SELECT id FROM users WHERE email = 'camila@clinicai.com'), 'Dr. López', 'Pediatria', 'CRM12347', '(11) 99999-3333', 'lopez@clinicai.com'),
((SELECT id FROM users WHERE email = 'camila@clinicai.com'), 'Dra. Rodríguez', 'Dermatologia', 'CRM12348', '(11) 99999-4444', 'rodriguez@clinicai.com'),
((SELECT id FROM users WHERE email = 'camila@clinicai.com'), 'Dr. Martínez', 'Ginecologia', 'CRM12349', '(11) 99999-5555', 'martinez@clinicai.com')
ON CONFLICT (license_number) DO NOTHING;

-- Inserir salas de exemplo
INSERT INTO rooms (room_number, name, capacity) VALUES
('Sala 1', 'Sala de Cardiologia', 1),
('Sala 2', 'Sala de Pediatria', 1),
('Sala 3', 'Sala de Clínico Geral', 1),
('Sala 4', 'Sala de Dermatologia', 1),
('Sala 5', 'Sala de Ginecologia', 1)
ON CONFLICT (room_number) DO NOTHING;

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_doctors_user_id ON doctors(user_id);
CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);
CREATE INDEX IF NOT EXISTS idx_financial_metrics_date ON financial_metrics(date);

-- Função para atualizar o timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at automaticamente
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_financial_metrics_updated_at BEFORE UPDATE ON financial_metrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 