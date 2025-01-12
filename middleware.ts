import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
  ]
};

export async function middleware(
  request: NextRequest
): Promise<NextResponse<unknown>> {
  if (request.nextUrl.pathname === "/logout") {
    return logout(request);
  }

  const skipTokenValidation = ["/login", "/register"];

  const response = NextResponse.next();

  if (skipTokenValidation.includes(request.nextUrl.pathname)) {
    return response;
  }

  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const newToken = await checkTokenValid(token.value);

  if (!newToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  response.cookies.set({ name: "token", value: newToken, path: "/" });

  return NextResponse.next();
}

async function checkTokenValid(token: string): Promise<string | false> {
  if (!process.env.NEXT_PUBLIC_AUTH_SERVER_URL) {
    throw new Error("NEXT_PUBLIC_AUTH_SERVER_URL must be set in .env");
  }

  const response = await fetch(
    process.env.NEXT_PUBLIC_AUTH_SERVER_URL + "/validate",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    return false;
  }

  const result = await response.json();
  return result.token;
}

function logout(request: NextRequest): NextResponse {
  const redirect = NextResponse.redirect(new URL("/login", request.url));
  redirect.cookies.delete("token");
  return redirect;
}
