import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@services/users";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await createUser(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("User creation failed:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}