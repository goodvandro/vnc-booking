import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "vnc-admin-secret-change-me";
const COOKIE_NAME = "admin-token";

const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export interface AuthUser {
  id: number;
  username: string;
  email: string;
}

export interface JWTPayload {
  sub: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

export async function signToken(user: AuthUser): Promise<string> {
  return new SignJWT({
    sub: String(user.id),
    email: user.email,
    username: user.username,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedSecret);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function getAuthUser(): Promise<JWTPayload | null> {
  const token = await getAuthToken();
  if (!token) return null;
  return verifyToken(token);
}

export { COOKIE_NAME };
