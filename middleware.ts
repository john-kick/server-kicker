import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Import the jose library for JWT verification

type TokenData = {
  username: string;
  role: "unverified" | "verified" | "admin";
};

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

  const newToken = await validateToken(token.value);

  if (!newToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const tokenData = await decodeToken(newToken);

  if (!tokenData || !tokenData.role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // const userRole = tokenData.role;
  // const pathname = request.nextUrl.pathname;

  // // Role-based access control logic
  // const roleBasedAccess = {
  //   unverified: ["/dashboard"],
  //   verified: ["/dashboard"],
  //   admin: ["/dashboard", "/profile", "/admin"]
  // };

  // const allowedRoutes = roleBasedAccess[userRole] || [];
  // const isAccessAllowed = allowedRoutes.some((route) =>
  //   pathname.startsWith(route)
  // );

  // if (!isAccessAllowed) {
  //   return NextResponse.redirect(new URL("/unauthorized", request.url)); // Redirect to an unauthorized page
  // }

  // Token is valid and access is allowed, refresh token if necessary
  response.cookies.set({
    name: "token",
    value: newToken,
    path: "/",
    sameSite: "none"
  });

  return response;
}

async function validateToken(token: string): Promise<string | false> {
  if (!process.env.NEXT_PUBLIC_AUTH_SERVER_URL) {
    throw new Error("NEXT_PUBLIC_AUTH_SERVER_URL must be set in .env");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_SERVER_URL}/validate`,
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
  return result.token; // Expect the API response to return the validated token
}

async function decodeToken(token: string): Promise<TokenData | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Use TextEncoder for Edge Runtime compatibility
    if (!secret) {
      throw new Error("JWT_SECRET must be set in .env");
    }

    const { payload } = await jwtVerify(token, secret); // Verify the token and extract payload
    return payload as TokenData;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

function logout(request: NextRequest): NextResponse {
  const redirect = NextResponse.redirect(new URL("/login", request.url));
  redirect.cookies.delete("token");
  return redirect;
}
