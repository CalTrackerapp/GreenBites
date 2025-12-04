import { db } from "../../../src/server/db";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.execute(sql`SELECT NOW()`);
    console.log("DB Connected:", result);

    return Response.json({ status: "success", result });
  } catch (error) {
    console.error("DB Error:", error);
    return Response.json({ status: "error", error: `${error}` });
  }
}

