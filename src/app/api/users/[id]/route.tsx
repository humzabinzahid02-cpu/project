import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

interface DBResult {
  affectedRows: number;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }  // 👈 important change
) {
  const { id } = await params; // params async hote hain App Router me
  const userId = id;

  try {
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const [result] = (await db.query(
      "UPDATE users SET isVerified = 1 WHERE id = ?",
      [userId]
    )) as [DBResult, unknown];

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `User #${userId} approved successfully`,
    });
  } catch (error: unknown) {
    console.error("Approve API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
