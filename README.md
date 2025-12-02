# 🎓 Unidade - Sistema de Gestão Escolar

Plataforma web para gestão escolar desenvolvida com Next.js 16, React 18, Tailwind CSS e Supabase.

## 🚀 Demo

**Produção:** [https://unidade-bsygg6t0m-kathyllin83s-projects.vercel.app](https://unidade-bsygg6t0m-kathyllin83s-projects.vercel.app)

## ✨ Funcionalidades

- 📅 **Calendário Escolar** - Visualização de eventos e atividades
- 📊 **Notas** - Acompanhamento de desempenho acadêmico
- 📝 **Mural** - Comunicados e avisos importantes
- ⏰ **Faltas** - Controle de presença
- 🔐 **Autenticação** - Login e registro com Supabase
- 🎨 **UI Moderna** - Interface responsiva e intuitiva

## 🛠️ Tecnologias

- **Framework:** Next.js 16.0.1 (App Router)
- **React:** 18.3.1
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS 4
- **Banco de Dados:** Supabase
- **Autenticação:** Supabase Auth
- **Deploy:** Vercel
- **Animações:** Framer Motion
- **Ícones:** Lucide React

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase
- Conta na Vercel (para deploy)

## 🔧 Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/Kathyllin83/unidade.git
cd unidade
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
```

4. **Execute o projeto**

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📦 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Verifica código
```

## 🗂️ Estrutura do Projeto

```
unidade/
├── app/
│   ├── calendario/      # Página de calendário
│   ├── faltas/          # Controle de faltas
│   ├── login/           # Autenticação
│   ├── mural/           # Mural de avisos
│   ├── notas/           # Sistema de notas
│   ├── register/        # Registro de usuários
│   ├── layout.tsx       # Layout global
│   └── page.tsx         # Página inicial
├── components/
│   └── ui/              # Componentes reutilizáveis
├── lib/
│   ├── supabase.ts      # Cliente Supabase
│   └── utils.ts         # Utilitários
├── public/
│   └── img/             # Imagens estáticas
└── .env.local           # Variáveis de ambiente
```

## 🌐 Deploy

### Deploy na Vercel (Recomendado)

1. **Via CLI:**

```bash
npm install -g vercel
vercel login
vercel --prod
```

2. **Via GitHub:**

- Conecte seu repositório na [Vercel](https://vercel.com)
- Configure as variáveis de ambiente
- Deploy automático a cada push

### Variáveis de Ambiente na Vercel

Adicione em Settings > Environment Variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 🔐 Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Configure as tabelas necessárias:
   - `users` - Usuários do sistema
   - `events` - Eventos escolares
   - `posts` - Posts do mural
3. Configure Authentication
4. Copie as credenciais para `.env.local`

## 📱 Páginas

- `/` - Home com eventos em destaque
- `/login` - Autenticação de usuários
- `/register` - Registro de novos usuários
- `/calendario` - Calendário escolar
- `/notas` - Consulta de notas
- `/faltas` - Controle de faltas
- `/mural` - Mural de avisos

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Autor

**Kathyllin83** - [GitHub](https://github.com/Kathyllin83)

## 📞 Suporte

Para dúvidas ou suporte:

- Abra uma [issue](https://github.com/Kathyllin83/unidade/issues)
- Entre em contato via GitHub

---

Feito com ❤️ usando Next.js e Supabase
