import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "hotel-secret-2026");

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, secret);
    return payload as { id: number; nom: string; email: string };
  } catch {
    return null;
  }
}