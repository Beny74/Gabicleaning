
# 📧 Instruções para Configuração de E-mail - Gabi Cleaning

## Visão Geral
O website está configurado para enviar notificações por e-mail para **gabifcleaning@gmail.com** sempre que um cliente submeter uma solicitação de orçamento através do formulário "Request a Free Quote".

## ⚙️ Como Configurar

### Passo 1: Criar uma Senha de Aplicativo do Gmail

Como o Gmail não permite o uso de senhas normais por motivos de segurança, você precisa criar uma "Senha de Aplicativo":

1. **Acesse sua conta Google**: Vá para [https://myaccount.google.com/security](https://myaccount.google.com/security)

2. **Ative a Verificação em Duas Etapas** (se ainda não estiver ativada):
   - Clique em "Verificação em duas etapas"
   - Siga as instruções para ativar

3. **Crie uma Senha de Aplicativo**:
   - Volte para [https://myaccount.google.com/security](https://myaccount.google.com/security)
   - Procure por "Senhas de app" (pode estar na seção de Verificação em duas etapas)
   - Clique em "Senhas de app"
   - Selecione "Outro (nome personalizado)" e digite "Gabi Cleaning Website"
   - Clique em "Gerar"
   - **IMPORTANTE**: Copie a senha gerada (16 caracteres sem espaços)

### Passo 2: Configurar as Variáveis de Ambiente

Você tem duas opções:

#### Opção A: Via Interface do DeepAgent (Recomendado)

1. Peça ao assistente para configurar as variáveis:
   ```
   "Configure as variáveis de e-mail com:
   EMAIL_USER=gabifcleaning@gmail.com
   EMAIL_PASSWORD=[cole aqui a senha de aplicativo]"
   ```

#### Opção B: Editar o arquivo .env manualmente

1. Edite o arquivo `/home/ubuntu/gabi_cleaning/nextjs_space/.env`
2. Adicione estas linhas (descomente e preencha):
   ```
   EMAIL_USER=gabifcleaning@gmail.com
   EMAIL_PASSWORD=sua-senha-de-aplicativo-aqui
   ```

### Passo 3: Testar o Envio de E-mail

1. Acesse o website
2. Preencha o formulário "Request a Free Quote"
3. Clique em "Request Estimate"
4. Verifique se o e-mail chegou em gabifcleaning@gmail.com

## 📧 Formato do E-mail

Quando um cliente enviar uma solicitação, você receberá um e-mail com:

- **Assunto**: "Nova Solicitação de Orçamento - [Nome do Cliente]"
- **Informações do Cliente**: Nome, telefone, endereço
- **Detalhes do Serviço**: Tipo de limpeza, tamanho do imóvel, data preferida
- **Notas Adicionais**: Qualquer observação especial do cliente

## 🔒 Segurança

- ✅ Nunca compartilhe sua senha de aplicativo
- ✅ A senha é armazenada de forma segura no servidor
- ✅ Nunca commit a senha no código
- ✅ Use apenas senhas de aplicativo, não sua senha normal do Gmail

## ⚠️ Importante

Se as credenciais de e-mail não forem configuradas, o sistema continuará funcionando normalmente:
- ✅ As solicitações serão salvas no banco de dados
- ✅ Você pode visualizar as solicitações através da API
- ❌ Os e-mails não serão enviados (você verá um aviso no console)

## 🆘 Problemas Comuns

### "Authentication failed"
- Verifique se a verificação em duas etapas está ativada
- Confirme que está usando uma senha de aplicativo, não sua senha normal
- Tente gerar uma nova senha de aplicativo

### "Email not configured"
- Verifique se as variáveis EMAIL_USER e EMAIL_PASSWORD estão no arquivo .env
- Reinicie o servidor após adicionar as variáveis

### E-mails não chegam
- Verifique a pasta de spam
- Confirme que o endereço gabifcleaning@gmail.com está correto
- Verifique os logs do servidor para erros

## 📞 Suporte

Se você tiver problemas, pode:
1. Verificar os logs do servidor
2. Pedir ajuda ao assistente DeepAgent
3. Revisar este documento

---

**Status Atual**: ⚠️ Configuração de e-mail pendente
**E-mail de Destino**: gabifcleaning@gmail.com
**Última Atualização**: Outubro 2025
