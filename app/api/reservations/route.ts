import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "hotel-secret-2026");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, email, telephone, dateArrivee, dateDepart, chambreId } = body;

    // Récupère l'utilisateur connecté (si présent), pour lier la réservation à son compte
    let userId: number | undefined = undefined;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (token) {
      try {
        const { payload } = await jwtVerify(token, secret);
        userId = payload.id as number;
      } catch {
        // token invalide, on continue sans userId (réservation "invité")
      }
    }

    const reservation = await prisma.reservation.create({
      data: {
        nom,
        email,
        telephone,
        dateArrivee: new Date(dateArrivee),
        dateDepart: new Date(dateDepart),
        chambreId,
        userId,
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la réservation." }, { status: 500 });
  }
}