import { NextRequest, NextResponse } from "next/server";
import { getAuth, isAdmin } from "@/lib/auth";
import { deleteCv, getCvById } from "@/lib/cv-db";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuth(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing CV ID" }, { status: 400 });
  }

  try {
    const cv = await getCvById(id, auth.sub, isAdmin(auth));
    if (!cv) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 });
    }
    return NextResponse.json({ cv });
  } catch (err) {
    console.error("Failed to fetch CV:", err);
    return NextResponse.json({ error: "Failed to fetch CV" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuth(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing CV ID" }, { status: 400 });
  }

  try {
    const success = await deleteCv(id, auth.sub, isAdmin(auth));
    if (!success) {
      return NextResponse.json({ error: "CV not found or could not be deleted" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete CV:", err);
    return NextResponse.json({ error: "Failed to delete CV" }, { status: 500 });
  }
}
