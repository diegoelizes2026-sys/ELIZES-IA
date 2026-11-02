# ELIZES IA

Plataforma SaaS de atendimento inteligente para WhatsApp, começando pela Barbearia Seu Elizes.

## Stack
- Next.js + TypeScript
- Supabase (Auth, Postgres, RLS)
- OpenAI API (respostas e áudio)
- WhatsApp Business Platform (Cloud API oficial)
- Vercel

## Desenvolvimento local

1. Instale Node.js 20.9+.
2. Copie `.env.example` para `.env.local`.
3. Preencha as variáveis públicas do Supabase.
4. Execute:

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Segurança
- Nunca publique chaves secretas em variáveis `NEXT_PUBLIC_*`.
- `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY` e tokens da Meta devem ficar somente no servidor.
- A camada multiempresa usa as tabelas `elizes_ia_*` no projeto Supabase Meniuza e políticas RLS.
- O protótipo inicial não envia mensagens, não cria agendamentos reais e não chama a OpenAI.

## Estado atual
Primeira interface demonstrativa. Os números, contatos e horários mostrados são dados ilustrativos, não dados operacionais reais.
