import { NextRequest, NextResponse } from "next/server";
import { deleteUser, getUser } from "@services/users";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const result = await deleteUser(username);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return NextResponse.json({ error: "User deletion failed" }, { status: 500 });
  }
}

//you can call this via:
// await fetch(`/api/users/${username}`, {
//   method: "DELETE",
// });




export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const user = await getUser(username);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    
    // Check if it's a database connection error
    if (errorMessage.includes("DATABASE_URL") || errorMessage.includes("connection")) {
      return NextResponse.json(
        { 
          error: "Database connection failed",
          details: "Please check that DATABASE_URL is set in your environment variables",
          message: errorMessage
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error", message: errorMessage },
      { status: 500 }
    );
  }
}


//you can call this via:
// const res = await fetch(`/api/users/${username}`);
// const user = await res.json();
