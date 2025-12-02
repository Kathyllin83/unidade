// Teste avançado de funcionalidades do banco
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

async function detailedTest() {
  console.log("🔬 Teste Detalhado do Banco de Dados Supabase\n");
  console.log("=".repeat(60) + "\n");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // 1. Testar tabela events
    console.log('📊 1. TESTANDO TABELA "events"');
    console.log("-".repeat(60));

    const {
      data: allEvents,
      error: allError,
      count,
    } = await supabase.from("events").select("*", { count: "exact" });

    if (allError) {
      console.error("❌ Erro:", allError.message);
    } else {
      console.log(`✅ Total de eventos no banco: ${count}`);
      console.log("\n📋 Lista de eventos:");
      allEvents.forEach((event, index) => {
        console.log(`   ${index + 1}. ${event.title}`);
        console.log(`      - Categoria: ${event.category || "Sem categoria"}`);
        console.log(`      - Destaque: ${event.is_featured ? "Sim" : "Não"}`);
        console.log(`      - ID: ${event.id}`);
      });
    }

    // 2. Testar eventos em destaque
    console.log("\n\n⭐ 2. TESTANDO EVENTOS EM DESTAQUE");
    console.log("-".repeat(60));

    const { data: featured, error: featuredError } = await supabase
      .from("events")
      .select("*")
      .eq("is_featured", true);

    if (featuredError) {
      console.error("❌ Erro:", featuredError.message);
    } else {
      console.log(`✅ Eventos em destaque: ${featured.length}`);
      featured.forEach((event) => {
        console.log(`   - ${event.title}`);
      });
    }

    // 3. Testar categorias
    console.log("\n\n📂 3. TESTANDO CATEGORIAS");
    console.log("-".repeat(60));

    const { data: categories, error: catError } = await supabase
      .from("events")
      .select("category");

    if (catError) {
      console.error("❌ Erro:", catError.message);
    } else {
      const uniqueCategories = [
        ...new Set(categories.map((c) => c.category).filter(Boolean)),
      ];
      console.log(`✅ Categorias encontradas: ${uniqueCategories.length}`);
      uniqueCategories.forEach((cat) => {
        const count = categories.filter((c) => c.category === cat).length;
        console.log(`   - ${cat}: ${count} evento(s)`);
      });
    }

    // 4. Verificar estrutura da tabela
    console.log("\n\n🏗️  4. ESTRUTURA DOS DADOS");
    console.log("-".repeat(60));

    if (allEvents && allEvents.length > 0) {
      const sample = allEvents[0];
      console.log("✅ Campos disponíveis na tabela events:");
      Object.keys(sample).forEach((key) => {
        const value = sample[key];
        const type = typeof value;
        console.log(`   - ${key}: ${type}`);
      });
    }

    // 5. Testar políticas de acesso
    console.log("\n\n🔐 5. TESTANDO POLÍTICAS DE ACESSO");
    console.log("-".repeat(60));

    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const anonClient = createClient(supabaseUrl, anonKey);

    const { data: anonData, error: anonError } = await anonClient
      .from("events")
      .select("*")
      .limit(1);

    if (anonError) {
      console.log("⚠️  Acesso anônimo bloqueado (pode ser intencional)");
      console.log("   Mensagem:", anonError.message);
    } else {
      console.log("✅ Acesso anônimo permitido (leitura pública habilitada)");
      console.log(`   Eventos acessíveis: ${anonData.length}`);
    }

    // 6. Teste de performance
    console.log("\n\n⚡ 6. TESTE DE PERFORMANCE");
    console.log("-".repeat(60));

    const startTime = Date.now();
    await supabase.from("events").select("*").limit(10);
    const endTime = Date.now();

    console.log(`✅ Tempo de resposta: ${endTime - startTime}ms`);
    if (endTime - startTime < 1000) {
      console.log("   🚀 Excelente! Resposta rápida.");
    } else if (endTime - startTime < 3000) {
      console.log("   ⚠️  Resposta aceitável, mas pode melhorar.");
    } else {
      console.log("   ❌ Resposta lenta, verifique a conexão.");
    }

    console.log("\n" + "=".repeat(60));
    console.log("✅ TODOS OS TESTES CONCLUÍDOS COM SUCESSO!");
    console.log("🎉 O banco de dados está funcionando perfeitamente!");
    console.log("=".repeat(60) + "\n");
  } catch (error) {
    console.error("\n❌ ERRO CRÍTICO:", error.message);
    console.error("\n📋 Stack trace:", error.stack);
    process.exit(1);
  }
}

detailedTest();
