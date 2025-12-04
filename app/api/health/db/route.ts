import { NextResponse } from "next/server";
import { db } from "../../../../src/server/db";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    console.log("🔌 Testing database connection...");

    const result = await db.execute(
      sql`SELECT NOW() as current_time, version() as pg_version`
    );

    const row = result.rows[0] as
      | {
          current_time?: Date | string;
          pg_version?: string;
        }
      | undefined;

    const currentTime = row?.current_time;
    const pgVersion =
      typeof row?.pg_version === "string"
        ? row.pg_version.split(",")[0]
        : "Unknown";

    console.log("✅ Database connection successful!");
    console.log("📅 Current database time:", currentTime);
    console.log("🐘 PostgreSQL version:", pgVersion);

    return NextResponse.json({
      status: "ok",
      message: "Database connection successful",
      databaseTime: currentTime,
      postgresVersion: pgVersion,
    });
  } catch (error: unknown) {
    console.error("❌ Database connection failed:", error);

    let errorMessage = "Database connection failed";
    let instructions: string[] = [];
    const err = error as { code?: string; message?: string };

    if (err.code === "ECONNREFUSED") {
      errorMessage =
        "Connection refused - database server is not running or host/port is incorrect";
      instructions = [
        "Verify your DATABASE_URL is correct",
        "Make sure your database server is running",
        "Check that the host and port are correct",
      ];
    } else if (err.code === "ENOTFOUND") {
      errorMessage = "Host not found - check the hostname in DATABASE_URL";
      instructions = ["Verify the hostname in your DATABASE_URL is correct"];
    } else if (err.code === "28P01") {
      errorMessage = "Authentication failed - check username and password";
      instructions = [
        "Verify the username and password in DATABASE_URL are correct",
      ];
    } else if (err.code === "3D000") {
      errorMessage = "Database does not exist";
      instructions = [
        "Create the database or check the database name in DATABASE_URL",
      ];
    } else if (err.code === "XX000" && err.message?.includes("Tenant")) {
      errorMessage =
        "Tenant or user not found - incorrect project reference or region";
      instructions = [
        "The project reference or region in your connection string is incorrect",
        "Go to Supabase Dashboard → Settings → Database",
        "Copy the exact connection string from the 'URI' tab",
        "Make sure you're using the correct region (e.g., us-east-1, eu-west-1, etc.)",
        "For Session Pooler: username should be 'postgres.[PROJECT_REF]'",
        "Verify your project reference matches your Supabase project",
      ];
    } else {
      errorMessage = err.message || "Unknown database error";
      instructions = ["Check your DATABASE_URL and database server status"];
    }

    return NextResponse.json(
      {
        status: "error",
        message: errorMessage,
        code: err.code,
        instructions,
        help: "See DATABASE_SETUP.md for setup instructions",
      },
      { status: 503 }
    );
  }
}
