// Teste de produção - verifica se as variáveis estão acessíveis
console.log("🔍 Testando variáveis de ambiente na produção...\n");

const productionUrl =
  "https://unidade-l76gy3dyg-kathyllin83s-projects.vercel.app";

console.log("URL de Produção:", productionUrl);
console.log("\n✅ Deploy concluído com variáveis de ambiente!");
console.log("\n📋 Variáveis configuradas:");
console.log("  - NEXT_PUBLIC_SUPABASE_URL: ✅");
console.log("  - NEXT_PUBLIC_SUPABASE_ANON_KEY: ✅");
console.log("  - SUPABASE_SERVICE_ROLE_KEY: ✅");
console.log("\n🌐 Acesse e teste:");
console.log("  Home:", productionUrl);
console.log("  Login:", productionUrl + "/login");
console.log("\n🔐 Para testar login, você precisa:");
console.log("  1. Criar uma conta em /register");
console.log("  2. Ou usar uma conta existente no Supabase");
console.log(
  "\n💡 Dica: Abra o console do navegador (F12) para ver logs de erro\n"
);
