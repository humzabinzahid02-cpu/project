import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import type { RowDataPacket, FieldPacket } from "mysql2";

export async function GET() {
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query("SELECT * FROM users ORDER BY id DESC");
    return NextResponse.json(rows);
  } catch (error: unknown) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
