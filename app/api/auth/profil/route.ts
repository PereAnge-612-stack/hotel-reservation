import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "hotel-secret-2026");

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Non connecté" }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, secret);
    const userId = payload.id as number;

    const body = await request.json();
    const { nom, password } = body;

    const data: { nom?: string; password?: string } = {};
    if (nom) data.nom = nom;
    if (password) data.password = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: { id: userId },
      data,
    });

    // Régénère le token pour que le nom affiché dans la Navbar soit à jour immédiatement
    const newToken = await new SignJWT({ id: user.id, nom: user.nom, email: user.email, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    const response = NextResponse.json({ success: true, nom: user.nom });
    response.cookies.set("token", newToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}