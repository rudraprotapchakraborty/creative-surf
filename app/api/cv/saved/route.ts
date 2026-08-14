import { NextRequest, NextResponse } from "next/server";
import { getAuth, isAdmin } from "@/lib/auth";
import { getAllCvs, getUserCvs } from "@/lib/cv-db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const auth = getAuth(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cvs = isAdmin(auth) ? await getAllCvs() : await getUserCvs(auth.sub);
    return NextResponse.json({ cvs });
  } catch (err) {
    console.error("Failed to fetch saved CVs:", err);
    return NextResponse.json({ error: "Failed to fetch saved CVs" }, { status: 500 });
  }
}
