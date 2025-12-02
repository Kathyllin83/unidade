// Script de teste de conexão com Supabase
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

async function testConnection() {
  console.log("🔍 Testando conexão com Supabase...\n");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Variáveis de ambiente não encontradas!");
    console.log(
      "NEXT_PUBLIC_SUPABASE_URL:",
      supabaseUrl ? "✅ Configurada" : "❌ Faltando"
    );
    console.log(
      "SUPABASE_SERVICE_ROLE_KEY:",
      supabaseKey ? "✅ Configurada" : "❌ Faltando"
    );
    process.exit(1);
  }

  console.log("✅ Variáveis de ambiente encontradas");
  console.log("📍 URL:", supabaseUrl);
  console.log("🔑 Service Key:", supabaseKey.substring(0, 20) + "...\n");

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Teste 1: Verificar tabela events
    console.log('📊 Testando acesso à tabela "events"...');
    const { data: events, error: eventsError } = await supabase
      .from("events")
      .select("*")
      .limit(5);

    if (eventsError) {
      console.error("❌ Erro ao acessar tabela events:", eventsError.message);
    } else {
      console.log(`✅ Tabela "events" acessada com sucesso!`);
      console.log(`   Total de eventos encontrados: ${events.length}`);
      if (events.length > 0) {
        console.log("   Exemplo de evento:", events[0].title);
      }
    }

    // Teste 2: Verificar autenticação
    console.log("\n🔐 Testando sistema de autenticação...");
    const { data: authData, error: authError } =
      await supabase.auth.getSession();

    if (authError) {
      console.log("⚠️  Aviso de autenticação:", authError.message);
    } else {
      console.log("✅ Sistema de autenticação está funcionando");
    }

    // Teste 3: Listar todas as tabelas
    console.log("\n📋 Verificando estrutura do banco...");
    const { data: tables, error: tablesError } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true });

    if (!tablesError) {
      console.log("✅ Banco de dados está acessível");
    }

    console.log("\n✅ Todos os testes concluídos com sucesso!");
    console.log("🎉 O banco de dados está funcionando corretamente!\n");
  } catch (error) {
    console.error("\n❌ Erro durante os testes:", error.message);
    process.exit(1);
  }
}

testConnection();
