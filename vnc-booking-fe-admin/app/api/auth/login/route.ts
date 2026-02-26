import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const strapiUrl = (
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
    ).replace(/\/$/, "");

    // Authenticate via Strapi local auth
    const res = await fetch(`${strapiUrl}/api/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      const message =
        data?.error?.message || "Credenciais inválidas";
      return NextResponse.json({ error: message }, { status: 401 });
    }

    // Generate our own JWT
    const token = await signToken({
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
    });

    const response = NextResponse.json({
      user: {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
      },
    });

    // Set HttpOnly cookie
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
