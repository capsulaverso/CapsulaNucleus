# Portal de Criativos com Laboratório de Agentes IA

Este é um portal web moderno para criativos que integra múltiplas funcionalidades em uma única plataforma, com um foco principal em um laboratório de agentes de IA colaborativos.

## Setup do Projeto

### 1. Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e preencha as variáveis necessárias:

```bash
cp .env.example .env.local
```

Você precisará de chaves para:
- Supabase (URL e Chave Anon)
- Anthropic (Claude API)
- OpenAI (API Key)
- Stripe (Chaves de API)
- Resend (API Key)

### 2. Instalar Dependências

Use o seu gerenciador de pacotes preferido para instalar as dependências do projeto.

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Setup do Banco de Dados (Supabase)

1. Crie um novo projeto no [Supabase](https://supabase.com/).
2. Pegue a URL do projeto e a chave `anon` e adicione-as ao seu arquivo `.env.local`.
3. Use a CLI do Supabase para aplicar as migrações:
   ```bash
   npx supabase link --project-ref <your-project-ref>
   npx supabase db push
   ```
   Isso irá executar os arquivos SQL na pasta `supabase/migrations`.

### 4. Rodar o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Stack Técnica

- **Frontend:** Next.js 14+ (App Router), shadcn/ui, Tailwind CSS, React Flow
- **Backend:** Next.js API Routes, Supabase (PostgreSQL, Auth, Storage)
- **IA:** Anthropic Claude, LangChain/LangGraph, OpenAI
- **Infra:** Vercel, Stripe, Resend
