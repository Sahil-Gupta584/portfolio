import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const booksmallFrontendUrl = process.env.BOOKSMALL_FRONTEND_URL;
  console.log("BOOKSMALL_FRONTEND_URL:", booksmallFrontendUrl);

  // res.headers.set("Access-Control-Allow-Origin", "https://books-mall.vercel.app");
  res.headers.set("Access-Control-Allow-Origin", booksmallFrontendUrl || "");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.headers.set("Access-Control-Allow-Credentials", "true");

  // If it's a preflight request, respond immediately
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: res.headers,
    });
  }

  return res;
}

// Apply only to API routes
export const config = {
  matcher: "/api/:path*",
};
