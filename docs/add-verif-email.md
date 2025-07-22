# Passo a passo: Implementação de verificação de e-mail após cadastro

## 1. Página de “Confirme seu e-mail”
- Após o cadastro, redirecionar para uma página `/confirm-email`.
- Exibir mensagem: “Enviamos um e-mail de confirmação para [email]. Clique no link para ativar sua conta.”
- Incluir botão para reenviar o e-mail de verificação.
- (Opcional) Botão para alterar o e-mail, caso tenha digitado errado.

## 2. Backend: Envio do e-mail de verificação
- Ao cadastrar o usuário, o backend deve enviar um e-mail com um link único de ativação.
- O link deve levar para uma rota tipo `/verify-email?token=...`.
- O token deve ser seguro, único e expirar após um tempo.

## 3. Página de verificação
- Quando o usuário clica no link do e-mail, ele acessa `/verify-email?token=...`.
- O frontend faz uma requisição para o backend para validar o token.
- Se válido, mostrar mensagem de sucesso: “E-mail verificado com sucesso! Agora você pode fazer login.”
- Se inválido ou expirado, mostrar mensagem de erro e opção de reenviar o e-mail.
- (Opcional) Redirecionar automaticamente para login ou dashboard após alguns segundos.

## 4. Ajustes no fluxo de cadastro
- Após o registro, não fazer login automático.
- Redirecionar para `/confirm-email`.
- Só permitir login se o e-mail estiver verificado.

## 5. Sugestões de UX
- Mostrar claramente para qual e-mail o link foi enviado.
- Permitir reenviar o e-mail de verificação facilmente.
- Dar feedback visual de sucesso/erro em todas as etapas.
- (Opcional) Permitir alterar o e-mail caso o usuário tenha digitado errado.

## 6. Integração backend (resumido)
- Gerar e salvar token de verificação no banco ao cadastrar usuário.
- Endpoint para validar token e ativar conta.
- Endpoint para reenviar e-mail de verificação.
- Marcar usuário como "verificado" após ativação.

---

**Obs:** Este fluxo aumenta a segurança e a confiabilidade do sistema, evitando contas falsas e melhorando a experiência do usuário.
