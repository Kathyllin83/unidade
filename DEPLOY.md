# Checklist de Deploy

## Antes de fazer deploy:

- [ ] Todas as variáveis de ambiente configuradas
- [ ] Build funciona sem erros (`npm run build`)
- [ ] Testes passando (se houver)
- [ ] Imagens otimizadas
- [ ] .gitignore está correto (não commitar .env.local)
- [ ] README.md atualizado

## Variáveis de ambiente necessárias:

```env
NEXT_PUBLIC_SUPABASE_URL=https://kgdkhtrjolrsrgknyntn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_anon_key
SUPABASE_SERVICE_ROLE_KEY=seu_service_role_key
```

## Comandos úteis:

### Vercel:

```bash
vercel login          # Login
vercel                # Deploy preview
vercel --prod         # Deploy produção
vercel env add        # Adicionar variável de ambiente
```

### Servidor próprio:

```bash
npm run build         # Build
npm start             # Iniciar
pm2 start npm --name "unidade" -- start
pm2 logs unidade      # Ver logs
pm2 restart unidade   # Reiniciar
```

## Domínio personalizado:

### Na Vercel:

1. Vá em Settings > Domains
2. Adicione seu domínio
3. Configure o DNS conforme instruções

## Monitoramento:

- Vercel Analytics (grátis)
- Logs via `pm2 logs` (servidor próprio)
- Supabase Dashboard para monitorar banco
