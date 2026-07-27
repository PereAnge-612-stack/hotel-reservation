import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "hotel-secret-2026");

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ nom: null });
    }

    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({
  id: payload.id,
  nom: payload.nom,
  email: payload.email,
  role: payload.role,
});
  } catch (error) {
    return NextResponse.json({ nom: null });
  }
}