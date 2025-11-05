
# 🏠 Gabi Cleaning - Professional Cleaning Services

Website profissional para a Gabi Cleaning, oferecendo serviços de limpeza residencial e comercial na região de San Francisco - Bay Area.

## 🌟 Funcionalidades

- **Página Inicial**: Apresentação dos serviços com design moderno e responsivo
- **Serviços**: Detalhamento de todos os serviços oferecidos
  - Limpeza Residencial (Regular, Deep Clean, Move In/Out)
  - Limpeza Comercial
- **Formulário de Orçamento**: Solicitação rápida de orçamento com envio por e-mail
- **Formulário de Agendamento**: Sistema completo de booking de serviços
- **Design Responsivo**: Otimizado para desktop, tablet e mobile
- **Integração com Instagram**: Link direto para o perfil da empresa

## 🚀 Tecnologias Utilizadas

- **Framework**: Next.js 14.2.28 (React 18.2.0)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Componentes UI**: shadcn/ui + Radix UI
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **E-mail**: Nodemailer (Gmail)
- **Formulários**: React Hook Form + Zod
- **Animações**: Framer Motion
- **Ícones**: Lucide React

## 📋 Pré-requisitos

- Node.js 18+ ou superior
- Yarn (gerenciador de pacotes)
- PostgreSQL (banco de dados)
- Conta Gmail (para envio de e-mails)

## 🔧 Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/Beny74/Gabicleaning.git
cd Gabicleaning/nextjs_space
```

2. Instale as dependências:
```bash
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas credenciais:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
EMAIL_USER="gabifcleaning@gmail.com"
EMAIL_PASSWORD="sua-senha-de-aplicativo"
```

5. Execute as migrations do banco de dados:
```bash
yarn prisma generate
yarn prisma migrate dev
```

6. Inicie o servidor de desenvolvimento:
```bash
yarn dev
```

7. Acesse http://localhost:3000

## 📦 Deploy na Vercel

Para fazer deploy na Vercel, consulte o guia completo: [VERCEL_DEPLOYMENT.md](../VERCEL_DEPLOYMENT.md)

**Resumo rápido:**

1. Importe o repositório na [Vercel](https://vercel.com)
2. Configure o **Root Directory** como `nextjs_space`
3. Adicione as variáveis de ambiente:
   - `DATABASE_URL`
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
4. Faça o deploy!

## 📧 Configuração de E-mail

Para configurar o envio de e-mails via Gmail, consulte: [EMAIL_SETUP_INSTRUCTIONS.md](../EMAIL_SETUP_INSTRUCTIONS.md)

**Passos principais:**

1. Ative a verificação em duas etapas no Gmail
2. Crie uma senha de aplicativo
3. Adicione as credenciais no `.env`

## 🗄️ Estrutura do Projeto

```
nextjs_space/
├── app/                    # Rotas e páginas do Next.js
│   ├── api/               # API routes
│   ├── booking/           # Página de agendamento
│   ├── services/          # Página de serviços
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── ui/               # Componentes UI (shadcn)
│   ├── booking-form.tsx  # Formulário de agendamento
│   ├── quote-form.tsx    # Formulário de orçamento
│   ├── header.tsx        # Cabeçalho
│   └── footer.tsx        # Rodapé
├── lib/                   # Utilitários
│   ├── db.ts             # Configuração do banco
│   ├── email.ts          # Configuração de e-mail
│   └── utils.ts          # Funções auxiliares
├── prisma/               # Schemas do banco de dados
├── public/               # Arquivos estáticos
│   └── images/          # Imagens do site
└── styles/              # Estilos globais
```

## 🎨 Personalização

### Cores e Tema

O site usa um tema de cores personalizado definido em `globals.css`. Para alterar as cores:

1. Abra `app/globals.css`
2. Modifique as variáveis CSS em `:root`

### Conteúdo

- **Textos**: Edite os componentes em `components/`
- **Imagens**: Substitua as imagens em `public/images/`
- **Serviços**: Modifique `app/services/page.tsx`

## 📱 Redes Sociais

- **Instagram**: [@gabifcleaning](https://www.instagram.com/gabifcleaning/)
- **E-mail**: gabifcleaning@gmail.com

## 🔐 Segurança

- Nunca commite o arquivo `.env` no Git
- Use sempre senhas de aplicativo para Gmail
- Mantenha as dependências atualizadas

## 📄 Scripts Disponíveis

```bash
yarn dev          # Inicia servidor de desenvolvimento
yarn build        # Cria build de produção
yarn start        # Inicia servidor de produção
yarn lint         # Executa o linter
```

## 🤝 Contribuindo

Este é um projeto privado para a Gabi Cleaning. Para sugestões ou melhorias, entre em contato.

## 📝 Licença

© 2024 Gabi Cleaning - Todos os direitos reservados

---

**Desenvolvido com ❤️ para Gabi Di Francescantonio**

*Serving San Francisco - Bay Area*
