// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
console.log("🚀 ~ middleware ~ secret:", secret);
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  async function isTokenValid(token: string | undefined) {
    if (!token) return false;
    try {
      const data = await jwtVerify(token, secret);

      return true;
    } catch (err) {
      console.log("🚀 ~ isTokenValid ~ err:", err);
      return false;
    }
  }

  const isValid = await isTokenValid(token);

  if ((path === "/login" || path === "/sign-up") && isValid) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (path === "/profile" && !isValid) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/sign-up", "/profile"],
};

// =========================multiple admin route =========================================

// // middleware.ts
// import { NextRequest, NextResponse } from 'next/server'
// import { jwtVerify } from 'jose'

// const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl
//   const token = req.cookies.get("token")?.value

//   // Function to verify token and extract role
//   async function getUser(token: string | undefined) {
//     if (!token) return null;
//     try {
//       const { payload } = await jwtVerify(token, secret)
//       return payload; // includes email, role, etc.
//     } catch {
//       return null;
//     }
//   }

//   const user = await getUser(token)

//   // Redirect unauthenticated user from protected routes
//   if ((pathname.startsWith("/profile") || pathname.startsWith("/admin-dashboard")) && !user) {
//     return NextResponse.redirect(new URL("/login", req.url))
//   }

//   // User trying to access admin area
//   if (pathname.startsWith("/admin-dashboard") && user?.role !== "admin") {
//     return NextResponse.redirect(new URL("/not-authorized", req.url))
//   }

//   // Logged-in user trying to visit login
//   if ((pathname === "/login" || pathname === "/sign-up") && user) {
//     return NextResponse.redirect(new URL("/", req.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/profile", "/admin-dashboard", "/login", "/sign-up"],
// }
