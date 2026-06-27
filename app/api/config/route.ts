export const dynamic = "force-dynamic";

const WHITELIST = ["ENABLE_SYM_LIGATURE_FONT"];

export async function GET() {
  const result: Record<string, string> = {};
  for (const key of WHITELIST) {
    result[key] = process.env[key] === "true" ? "true" : "false";
  }
  return Response.json(result);
}
