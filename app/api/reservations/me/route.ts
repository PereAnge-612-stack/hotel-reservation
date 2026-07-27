import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "hotel-secret-2026");

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Non connecté" }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, secret);
    const userId = payload.id as number;

    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: { chambre: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reservations);
  } catch {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }
}