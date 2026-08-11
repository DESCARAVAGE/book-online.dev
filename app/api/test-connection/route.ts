import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/client";

// GET /api/test-connection — même principe que la route /seed du
// tuto Next.js : on la visite dans le navigateur pour vérifier que
// tout est bien branché.
export async function GET() {
  const supabase = await createClient();

  const { data, error, count } = await supabase
    .from("collections")
    .select("*", { count: "exact" });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Connexion Supabase OK",
    collectionsCount: count,
    data,
  });
}