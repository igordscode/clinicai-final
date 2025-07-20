# Script PowerShell para configurar o ambiente Docker do ClinicAI
# Execute este script como administrador se necessário

Write-Host "🚀 Configurando ambiente Docker para ClinicAI..." -ForegroundColor Green

# Verificar se o Docker está rodando
Write-Host "📋 Verificando se o Docker está rodando..." -ForegroundColor Yellow
try {
    docker info | Out-Null
    Write-Host "✅ Docker está rodando!" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker não está rodando. Por favor, inicie o Docker Desktop." -ForegroundColor Red
    exit 1
}

# Parar e remover containers existentes (se houver)
Write-Host "🧹 Limpando containers existentes..." -ForegroundColor Yellow
docker-compose down -v 2>$null

# Construir e iniciar os serviços
Write-Host "🔨 Iniciando serviços..." -ForegroundColor Yellow
docker-compose up -d

# Aguardar os serviços ficarem prontos
Write-Host "⏳ Aguardando serviços ficarem prontos..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Verificar status dos containers
Write-Host "📊 Status dos containers:" -ForegroundColor Yellow
docker-compose ps

# Verificar logs do PostgreSQL
Write-Host "📋 Logs do PostgreSQL:" -ForegroundColor Yellow
docker-compose logs postgres --tail=10

Write-Host "`n🎉 Ambiente configurado com sucesso!" -ForegroundColor Green
Write-Host "`n📌 Informações de acesso:" -ForegroundColor Cyan
Write-Host "   • PostgreSQL: localhost:5432" -ForegroundColor White
Write-Host "   • pgAdmin: http://localhost:5050" -ForegroundColor White
Write-Host "   • Redis: localhost:6379" -ForegroundColor White
Write-Host "`n🔑 Credenciais:" -ForegroundColor Cyan
Write-Host "   • Database: clinicai_db" -ForegroundColor White
Write-Host "   • Username: clinicai_user" -ForegroundColor White
Write-Host "   • Password: clinicai_password" -ForegroundColor White
Write-Host "   • pgAdmin Email: admin@clinicai.com" -ForegroundColor White
Write-Host "   • pgAdmin Password: admin123" -ForegroundColor White

Write-Host "`n💡 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Acesse http://localhost:5050 para gerenciar o banco" -ForegroundColor White
Write-Host "   2. Configure as variáveis de ambiente no seu projeto" -ForegroundColor White
Write-Host "   3. Execute 'npm run dev' para iniciar a aplicação" -ForegroundColor White 