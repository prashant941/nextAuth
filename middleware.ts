// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  async function isTokenValid(token: string | undefined) {
    if (!token) return false;
    try {
      await jwtVerify(token, secret);
      return true;
    } catch (err) {
      return false;
    }
  }

  const isValid = await isTokenValid(token);

  if ((path === "/login" || path === "/sign-up") && isValid) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (path === "/profile" && !isValid) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/sign-up', '/profile'],
}
