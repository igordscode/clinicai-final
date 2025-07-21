# Guia de Backup do Sistema ClinicAI

## 1. Banco de Dados

- **Backup manual:**  
  Use o comando abaixo para exportar o banco:
  ```sh
  pg_dump -U <usuario> -h <host> -d <database> > backup-$(date +%Y-%m-%d).sql
  ```
- **Backup automático:**  
  Configure um cron job ou use o serviço de backup do seu provedor.

## 2. Código-fonte

- Faça backup de toda a pasta do projeto:
  - `src/`
  - `public/`
  - `components/`
  - `docs/`
  - `package.json`, `package-lock.json` ou `pnpm-lock.yaml`
  - `.env` (NUNCA subir para repositório público!)

## 3. Uploads e Arquivos Gerados

- Backup da pasta de uploads:  
  - Exemplo: `public/uploads/` ou `storage/`

## 4. Configurações e Infraestrutura

- Backup dos arquivos:
  - `docker-compose.yml`
  - `next.config.js`
  - Scripts de deploy e CI/CD

## 5. Checklist de Backup

- [ ] Banco de dados exportado
- [ ] Código-fonte salvo
- [ ] Uploads copiados
- [ ] Configurações salvas
- [ ] Backup testado (restauração validada)

## 6. Observações

- Recomenda-se manter pelo menos 3 versões de backup.
- Armazene backups em local seguro (cloud, HD externo, etc).
- Teste a restauração periodicamente.

---

*Última atualização: 21/07/2025*
