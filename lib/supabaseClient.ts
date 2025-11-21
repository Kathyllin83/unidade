// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cuidado aqui: este é um cliente para o LADO DO CLIENTE.
// Para o lado do servidor (como na nossa home page), usaremos um diferente.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
