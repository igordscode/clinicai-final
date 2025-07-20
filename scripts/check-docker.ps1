# Script para verificar se o Docker está funcionando

Write-Host "🔍 Verificando status do Docker..." -ForegroundColor Yellow

# Verificar se o Docker está instalado
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker instalado: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker não está instalado!" -ForegroundColor Red
    Write-Host "💡 Instale o Docker Desktop em: https://www.docker.com/products/docker-desktop/" -ForegroundColor Cyan
    exit 1
}

# Verificar se o Docker está rodando
try {
    docker info | Out-Null
    Write-Host "✅ Docker está rodando!" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker não está rodando!" -ForegroundColor Red
    Write-Host "💡 Inicie o Docker Desktop e tente novamente" -ForegroundColor Cyan
    exit 1
}

# Verificar se o docker-compose está disponível
try {
    $composeVersion = docker-compose --version
    Write-Host "✅ Docker Compose disponível: $composeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose não está disponível!" -ForegroundColor Red
    exit 1
}

Write-Host "`n🎉 Docker está pronto para uso!" -ForegroundColor Green
Write-Host "💡 Execute 'docker-compose up -d' para iniciar os serviços" -ForegroundColor Cyan 