import { NextRequest, NextResponse } from "next/server";
import { deleteUser, getUser, updateUser } from "@services/users";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const result = await deleteUser(params.username);
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
  { params }: { params: { username: string } }
) {
  try {
    const user = await getUser(params.username);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


//you can call this via:
// const res = await fetch(`/api/users/${username}`);
// const user = await res.json();


export async function PATCH(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    const body = await req.json();

    const updatedUser = await updateUser(username, body);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
//you can call this via:
// await fetch(`/api/users/${username}`, {
//   method: "PATCH",
//   body: JSON.stringify({ ...partialUserData })
// });